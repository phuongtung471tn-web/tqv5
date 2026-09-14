/**
 * HYBRID STORAGE ADAPTER
 * ----------------------
 * - LOCAL MODE (mặc định): đọc/ghi cấu hình qua localStorage, không cần DB.
 * - DATABASE MODE: đồng bộ qua Supabase REST (khi Admin cấu hình URL + anon key).
 *
 * Toàn bộ hệ thống chỉ gọi qua adapter này nên có thể đổi backend mà không sửa UI.
 */
import { DEFAULT_CONFIG, type SiteConfig, type StorageMode } from "@/config/site-config";

const CONFIG_KEY = "funnel_site_config_v1";
const LEADS_KEY = "funnel_leads_v1";
const ANALYTICS_KEY = "funnel_analytics_v1";
const BACKUP_KEY = "funnel_backup_snapshots_v1";
export const LEAD_CREATED_EVENT = "funnel:lead-created";
export const ANALYTICS_UPDATED_EVENT = "funnel:analytics-updated";
const CLOUD_CONFIG_TABLE = "funnel_configs";

/** Deep-merge dữ liệu đã lưu lên mặc định để config luôn đủ trường khi nâng cấp. */
function mergeConfig(base: SiteConfig, override: Partial<SiteConfig> | null): SiteConfig {
  if (!override) return structuredClone(base);
  const compatibleOverride = structuredClone(override) as Partial<SiteConfig> & {
    landing?: Partial<SiteConfig["landing"]> & { sections?: SiteConfig["landing"]["sectionsArray"] };
  };
  if (compatibleOverride.landing?.sections && !compatibleOverride.landing.sectionsArray) {
    compatibleOverride.landing.sectionsArray = compatibleOverride.landing.sections.map((section, order) => ({
      ...section,
      type: section.type || section.id,
      order,
    }));
    delete compatibleOverride.landing.sections;
  }
  const merge = (baseValue: unknown, overrideValue: unknown): unknown => {
    if (overrideValue && typeof overrideValue === "object" && !Array.isArray(overrideValue) && baseValue && typeof baseValue === "object" && !Array.isArray(baseValue)) {
      const result: Record<string, unknown> = { ...(baseValue as Record<string, unknown>) };
      for (const [key, value] of Object.entries(overrideValue as Record<string, unknown>)) {
        result[key] = merge(result[key], value);
      }
      return result;
    }
    return overrideValue === undefined ? baseValue : overrideValue;
  };
  return merge(structuredClone(base), compatibleOverride) as SiteConfig;
}

function isBrowser() {
  return typeof window !== "undefined";
}

export function loadConfig(): SiteConfig {
  if (!isBrowser()) return structuredClone(DEFAULT_CONFIG);
  try {
    const raw = window.localStorage.getItem(CONFIG_KEY);
    return mergeConfig(DEFAULT_CONFIG, raw ? (JSON.parse(raw) as Partial<SiteConfig>) : null);
  } catch {
    return structuredClone(DEFAULT_CONFIG);
  }
}

/** Nạp cấu hình landing từ Supabase khi Database Mode được bật. */
export async function loadCloudConfig(config: SiteConfig): Promise<SiteConfig | null> {
  if (!isBrowser() || config.admin.storageMode !== "database" || !config.admin.supabaseUrl || !config.admin.supabaseAnonKey) {
    return null;
  }
  try {
    const response = await fetch(
      `${config.admin.supabaseUrl.replace(/\/$/, "")}/rest/v1/${CLOUD_CONFIG_TABLE}?id=eq.1&select=data`,
      { headers: { apikey: config.admin.supabaseAnonKey, Authorization: `Bearer ${config.admin.supabaseAnonKey}` } },
    );
    if (!response.ok) return null;
    const rows = (await response.json()) as { data?: Partial<SiteConfig> }[];
    return rows[0]?.data ? mergeConfig(DEFAULT_CONFIG, rows[0].data) : null;
  } catch {
    return null;
  }
}

export function saveConfig(config: SiteConfig): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  // Auto backup snapshot (giữ tối đa 10 bản gần nhất)
  try {
    const snaps = JSON.parse(window.localStorage.getItem(BACKUP_KEY) || "[]") as unknown[];
    snaps.unshift({ at: new Date().toISOString(), config });
    window.localStorage.setItem(BACKUP_KEY, JSON.stringify(snaps.slice(0, 10)));
  } catch {
    /* ignore */
  }
  // DATABASE MODE: đẩy lên Supabase nếu được cấu hình.
  if (config.admin.storageMode === "database" && config.admin.supabaseUrl && config.admin.supabaseAnonKey) {
    void syncConfigToSupabase(config);
  }
}

export function resetConfig(): SiteConfig {
  if (isBrowser()) window.localStorage.removeItem(CONFIG_KEY);
  return structuredClone(DEFAULT_CONFIG);
}

export function exportConfigFile(config: SiteConfig): void {
  if (!isBrowser()) return;
  const content = `// AUTO-GENERATED — dán đè vào src/config/site-config.ts (phần DEFAULT_CONFIG)\nexport const DEFAULT_CONFIG = ${JSON.stringify(
    config,
    null,
    2,
  )};\n`;
  const blob = new Blob([content], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "site-config.export.js";
  a.click();
  URL.revokeObjectURL(url);
}

/* ----------------------------- LEADS (Mini-CRM) ---------------------------- */

export interface LeadRecord {
  id: string;
  at: string;
  name: string;
  phone: string;
  email?: string;
  city?: string;
  major?: string;
  aiScore?: number;
  aiRank?: string;
  utmSource?: string;
  variant?: string;
  /** Nơi bản ghi được lưu: máy khách hay đám mây. */
  storage?: StorageMode;
}

export function loadLeads(): LeadRecord[] {
  if (!isBrowser()) return [];
  try {
    return JSON.parse(window.localStorage.getItem(LEADS_KEY) || "[]") as LeadRecord[];
  } catch {
    return [];
  }
}

/** Trùng lặp: cùng số điện thoại đã gửi trong 24 giờ gần nhất. */
export function isDuplicateLead(phone: string): boolean {
  const cutoff = Date.now() - 24 * 60 * 60 * 1000;
  return loadLeads().some((l) => l.phone === phone && new Date(l.at).getTime() > cutoff);
}

export function clearLeads(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(LEADS_KEY);
}

/**
 * Lưu lead vào kho đang hoạt động. Luôn ghi bản sao ở máy để Mini-CRM hiển thị
 * ngay; ở Database Mode sẽ đẩy thêm lên bảng `leads` của Supabase.
 */
export async function saveLead(lead: LeadRecord, config?: SiteConfig): Promise<LeadRecord> {
  const mode: StorageMode =
    config?.admin.storageMode === "database" && config.admin.supabaseUrl && config.admin.supabaseAnonKey
      ? "database"
      : "local";
  const record: LeadRecord = { ...lead, storage: mode };
  if (mode === "database" && config) {
    const ok = await pushLeadToSupabase(record, config.admin.supabaseUrl, config.admin.supabaseAnonKey);
    if (!ok) record.storage = "local";
  }
  if (isBrowser()) {
    const leads = loadLeads();
    leads.unshift(record);
    window.localStorage.setItem(LEADS_KEY, JSON.stringify(leads.slice(0, 500)));
    window.dispatchEvent(new CustomEvent<LeadRecord>(LEAD_CREATED_EVENT, { detail: record }));
  }
  return record;
}

async function pushLeadToSupabase(lead: LeadRecord, url: string, key: string): Promise<boolean> {
  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify([
        {
          name: lead.name,
          phone: lead.phone,
          email: lead.email ?? null,
          city: lead.city ?? null,
          major: lead.major ?? null,
          ai_score: lead.aiScore ?? null,
          ai_rank: lead.aiRank ?? null,
          utm_source: lead.utmSource ?? null,
          variant: lead.variant ?? null,
          created_at: lead.at,
        },
      ]),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export function exportLeadsCsv(leads: LeadRecord[]): void {
  if (!isBrowser()) return;
  const headers = ["at", "name", "phone", "email", "city", "major", "aiScore", "aiRank", "utmSource", "variant"];
  const rows = leads.map((l) =>
    headers.map((h) => `"${String((l as unknown as Record<string, unknown>)[h] ?? "").replace(/"/g, '""')}"`).join(","),
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

/* ------------------------------- ANALYTICS -------------------------------- */

export interface AnalyticsState {
  visits: number;
  leads: number;
  bySource: Record<string, number>;
  bySourceStats: Record<string, { visits: number; leads: number }>;
  byVariant: Record<string, { visits: number; leads: number }>;
}

function emptyAnalytics(): AnalyticsState {
  return { visits: 0, leads: 0, bySource: {}, bySourceStats: {}, byVariant: {} };
}

function cleanSource(source: string): string {
  const value = source.trim().slice(0, 100);
  return value || "direct";
}

function normalizeAnalytics(value: Partial<AnalyticsState> | null): AnalyticsState {
  const result = emptyAnalytics();
  result.visits = Number.isFinite(value?.visits) ? Math.max(0, Number(value?.visits)) : 0;
  result.leads = Number.isFinite(value?.leads) ? Math.max(0, Number(value?.leads)) : 0;
  for (const [source, count] of Object.entries(value?.bySource || {})) {
    if (Number.isFinite(count)) result.bySource[cleanSource(source)] = Math.max(0, Number(count));
  }
  for (const [source, stats] of Object.entries(value?.bySourceStats || {})) {
    if (!stats) continue;
    result.bySourceStats[cleanSource(source)] = {
      visits: Number.isFinite(stats.visits) ? Math.max(0, Number(stats.visits)) : 0,
      leads: Number.isFinite(stats.leads) ? Math.max(0, Number(stats.leads)) : 0,
    };
  }
  for (const [source, visits] of Object.entries(result.bySource)) {
    result.bySourceStats[source] = result.bySourceStats[source] || { visits, leads: 0 };
  }
  for (const [variant, stats] of Object.entries(value?.byVariant || {})) {
    if (!stats) continue;
    result.byVariant[variant] = {
      visits: Number.isFinite(stats.visits) ? Math.max(0, Number(stats.visits)) : 0,
      leads: Number.isFinite(stats.leads) ? Math.max(0, Number(stats.leads)) : 0,
    };
  }
  return result;
}

export function loadAnalytics(): AnalyticsState {
  if (!isBrowser()) return emptyAnalytics();
  try {
    return normalizeAnalytics(JSON.parse(window.localStorage.getItem(ANALYTICS_KEY) || "{}") as Partial<AnalyticsState>);
  } catch {
    return emptyAnalytics();
  }
}

function saveAnalytics(state: AnalyticsState): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(ANALYTICS_KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent<AnalyticsState>(ANALYTICS_UPDATED_EVENT, { detail: state }));
}

export function trackVisit(source: string, variant?: string): void {
  const a = loadAnalytics();
  a.visits += 1;
  const normalizedSource = cleanSource(source);
  a.bySource[normalizedSource] = (a.bySource[normalizedSource] || 0) + 1;
  a.bySourceStats[normalizedSource] = a.bySourceStats[normalizedSource] || { visits: 0, leads: 0 };
  a.bySourceStats[normalizedSource].visits += 1;
  if (variant) {
    a.byVariant[variant] = a.byVariant[variant] || { visits: 0, leads: 0 };
    a.byVariant[variant].visits += 1;
  }
  saveAnalytics(a);
}

export function trackConversion(source: string, variant?: string): void {
  const a = loadAnalytics();
  a.leads += 1;
  const normalizedSource = cleanSource(source);
  a.bySource[normalizedSource] = a.bySource[normalizedSource] || 0;
  a.bySourceStats[normalizedSource] = a.bySourceStats[normalizedSource] || { visits: 0, leads: 0 };
  a.bySourceStats[normalizedSource].leads += 1;
  if (variant) {
    a.byVariant[variant] = a.byVariant[variant] || { visits: 0, leads: 0 };
    a.byVariant[variant].leads += 1;
  }
  saveAnalytics(a);
}

export function clearAnalytics(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(ANALYTICS_KEY);
  window.dispatchEvent(new CustomEvent<AnalyticsState>(ANALYTICS_UPDATED_EVENT, { detail: emptyAnalytics() }));
}

/* ------------------------------- SUPABASE --------------------------------- */

/** Ghi config vào bảng `site_config` (id=1) qua Supabase REST. Best-effort. */
async function syncConfigToSupabase(config: SiteConfig): Promise<void> {
  try {
    const { supabaseUrl, supabaseAnonKey } = config.admin;
    await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/${CLOUD_CONFIG_TABLE}?on_conflict=id`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates",
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify([{ id: 1, data: config, updated_at: new Date().toISOString() }]),
    });
  } catch (err) {
    console.log("[v0] Supabase sync failed:", (err as Error).message);
  }
}

export async function testSupabaseConnection(url: string, key: string): Promise<boolean> {
  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
    });
    return res.ok || res.status === 404; // 404 = reachable but no root resource
  } catch {
    return false;
  }
}
