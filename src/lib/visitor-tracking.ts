import { useSyncExternalStore } from "react";

import type { SiteConfig } from "@/config/site-config";
import type {
  DeviceProfile,
  NetworkInfo,
  TrackingStorageMode,
  VisitorMetrics,
  VisitorTrackingSnapshot,
} from "@/types/tracking";
import {
  lookupNetworkInfo,
  readDeviceProfile,
  readTrackingSource,
} from "@/lib/visitor-diagnostics";

const VISITOR_SESSIONS_KEY = "funnel_visitor_sessions_v1";
const VISITOR_SESSION_ID_KEY = "funnel_visitor_session_id_v1";
const VISITOR_FINGERPRINT_KEY = "funnel_visitor_fingerprint_v1";
const VISITOR_NETWORK_KEY = "funnel_visitor_network_v1";

type StoredSession = {
  sessionId: string;
  fingerprint: string;
  dayKey: string;
  monthKey: string;
  trackedAt: string;
};

type SupabaseConfig = {
  url: string;
  key: string;
};

const defaultDevice = (): DeviceProfile => ({
  sessionId: "session_unknown",
  fingerprint: "fp_unknown",
  kind: "unknown",
  vendor: "Unknown",
  model: "Đang nhận diện",
  modelDisplay: "Đang nhận diện...",
  osName: "Unknown",
  osVersion: "",
  browserName: "Unknown",
  browserVersion: "",
  userAgent: "",
  language: "vi-VN",
  viewport: "0x0",
  memoryGb: null,
  cpuCores: null,
  touchPoints: 0,
});

const defaultNetwork = (): NetworkInfo => ({
  ipAddress: "",
  city: "",
  region: "",
  country: "Việt Nam",
  isp: "",
  asn: "",
  connectionType: "",
  networkFlags: [],
  isFallback: true,
  label: "Mạng băng thông rộng · Việt Nam",
  locationLabel: "Việt Nam",
});

const defaultMetrics = (): VisitorMetrics => ({
  currentSession: 1,
  today: 0,
  month: 0,
  storageMode: "local",
  trackedAt: "",
});

let trackingState: VisitorTrackingSnapshot = {
  ready: false,
  device: defaultDevice(),
  network: defaultNetwork(),
  metrics: defaultMetrics(),
  source: { source: "", medium: "", campaign: "", content: "", ttclid: "" },
};

const listeners = new Set<() => void>();
let initialized = false;

function emit() {
  listeners.forEach((listener) => listener());
}

function updateState(
  patch:
    | Partial<VisitorTrackingSnapshot>
    | ((current: VisitorTrackingSnapshot) => VisitorTrackingSnapshot),
) {
  trackingState =
    typeof patch === "function"
      ? patch(trackingState)
      : { ...trackingState, ...patch };
  emit();
}

function isBrowser() {
  return typeof window !== "undefined";
}

function dayKey() {
  return new Date().toISOString().slice(0, 10);
}

function monthKey() {
  return new Date().toISOString().slice(0, 7);
}

function readLocalSessions(): StoredSession[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(VISITOR_SESSIONS_KEY);
    return raw ? (JSON.parse(raw) as StoredSession[]) : [];
  } catch {
    return [];
  }
}

function writeLocalSessions(value: StoredSession[]) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(VISITOR_SESSIONS_KEY, JSON.stringify(value));
  } catch {
    /* ignore quota */
  }
}

function ensureIdentity() {
  if (!isBrowser())
    return { sessionId: "session_unknown", fingerprint: "fp_unknown" };
  const storedSessionId =
    window.sessionStorage.getItem(VISITOR_SESSION_ID_KEY) || undefined;
  const storedFingerprint =
    window.localStorage.getItem(VISITOR_FINGERPRINT_KEY) || undefined;
  const device = readDeviceProfile({
    sessionId: storedSessionId,
    fingerprint: storedFingerprint,
  });
  try {
    window.sessionStorage.setItem(VISITOR_SESSION_ID_KEY, device.sessionId);
    window.localStorage.setItem(VISITOR_FINGERPRINT_KEY, device.fingerprint);
  } catch {
    /* ignore quota */
  }
  return {
    sessionId: device.sessionId,
    fingerprint: device.fingerprint,
    device,
  };
}

function readSupabaseConfig(config: SiteConfig): SupabaseConfig | null {
  if (
    config.admin.storageMode !== "database" ||
    !config.admin.supabaseUrl ||
    !config.admin.supabaseAnonKey
  ) {
    return null;
  }
  return {
    url: config.admin.supabaseUrl.replace(/\/$/, ""),
    key: config.admin.supabaseAnonKey,
  };
}

function supabaseHeaders(key: string) {
  return {
    "Content-Type": "application/json",
    apikey: key,
    Authorization: "Bearer " + key,
    Prefer: "resolution=merge-duplicates,return=minimal",
  };
}

async function syncSessionToSupabase(
  supabase: SupabaseConfig,
  device: DeviceProfile,
  network: NetworkInfo,
) {
  const payload = [
    {
      session_key: device.sessionId,
      visitor_key: device.fingerprint,
      day_key: dayKey(),
      month_key: monthKey(),
      tracked_at: new Date().toISOString(),
      page_path:
        typeof window !== "undefined"
          ? window.location.pathname + window.location.search
          : "/",
      device_kind: device.kind,
      device_vendor: device.vendor,
      device_model: device.model,
      os_name: device.osName,
      os_version: device.osVersion || null,
      browser_name: device.browserName,
      browser_version: device.browserVersion || null,
      user_agent: device.userAgent,
      language: device.language,
      viewport: device.viewport,
      memory_gb: device.memoryGb,
      cpu_cores: device.cpuCores,
      touch_points: device.touchPoints,
      connection_type: network.connectionType || null,
      ip_address: network.ipAddress || null,
      city: network.city || null,
      region: network.region || null,
      country: network.country || "Việt Nam",
      isp: network.isp || null,
      asn: network.asn || null,
      network_flags: network.networkFlags,
      network_label: network.label,
      location_label: network.locationLabel,
    },
  ];
  const response = await fetch(
    `${supabase.url}/rest/v1/visitor_sessions?on_conflict=session_key`,
    {
      method: "POST",
      headers: supabaseHeaders(supabase.key),
      body: JSON.stringify(payload),
    },
  );
  return response.ok;
}

async function countSupabaseSessions(
  supabase: SupabaseConfig,
  fingerprint: string,
  key: string,
  value: string,
) {
  const response = await fetch(
    `${supabase.url}/rest/v1/visitor_sessions?visitor_key=eq.${encodeURIComponent(fingerprint)}&${key}=eq.${encodeURIComponent(value)}&select=session_key`,
    {
      headers: {
        apikey: supabase.key,
        Authorization: "Bearer " + supabase.key,
      },
    },
  );
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const rows = (await response.json()) as Array<{ session_key?: string }>;
  return rows.length;
}

function persistLocalSession(device: DeviceProfile) {
  const currentDay = dayKey();
  const currentMonth = monthKey();
  const sessions = readLocalSessions().filter(
    (entry) =>
      entry.fingerprint === device.fingerprint ||
      entry.dayKey === currentDay ||
      entry.monthKey === currentMonth,
  );
  if (!sessions.some((entry) => entry.sessionId === device.sessionId)) {
    sessions.push({
      sessionId: device.sessionId,
      fingerprint: device.fingerprint,
      dayKey: currentDay,
      monthKey: currentMonth,
      trackedAt: new Date().toISOString(),
    });
  }
  writeLocalSessions(sessions.slice(-400));
  return {
    today: sessions.filter(
      (entry) =>
        entry.fingerprint === device.fingerprint && entry.dayKey === currentDay,
    ).length,
    month: sessions.filter(
      (entry) =>
        entry.fingerprint === device.fingerprint &&
        entry.monthKey === currentMonth,
    ).length,
  };
}

function readStoredNetwork() {
  if (!isBrowser()) return defaultNetwork();
  try {
    const raw = window.localStorage.getItem(VISITOR_NETWORK_KEY);
    return raw
      ? ({ ...defaultNetwork(), ...JSON.parse(raw) } as NetworkInfo)
      : defaultNetwork();
  } catch {
    return defaultNetwork();
  }
}

function writeStoredNetwork(value: NetworkInfo) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(VISITOR_NETWORK_KEY, JSON.stringify(value));
  } catch {
    /* ignore quota */
  }
}

function normalizeStorageMode(mode: TrackingStorageMode | undefined) {
  return mode === "database" ? "database" : "local";
}

async function hydrateVisitorMetrics(
  config: SiteConfig,
  device: DeviceProfile,
) {
  const localMetrics = persistLocalSession(device);
  const supabase = readSupabaseConfig(config);
  if (!supabase) {
    return {
      currentSession: 1,
      today: localMetrics.today,
      month: localMetrics.month,
      storageMode: "local" as const,
      trackedAt: new Date().toISOString(),
    };
  }
  try {
    const synced = await syncSessionToSupabase(
      supabase,
      device,
      trackingState.network,
    );
    if (!synced) throw new Error("sync failed");
    const [today, month] = await Promise.all([
      countSupabaseSessions(supabase, device.fingerprint, "day_key", dayKey()),
      countSupabaseSessions(
        supabase,
        device.fingerprint,
        "month_key",
        monthKey(),
      ),
    ]);
    return {
      currentSession: 1,
      today,
      month,
      storageMode: "database" as const,
      trackedAt: new Date().toISOString(),
    };
  } catch {
    return {
      currentSession: 1,
      today: localMetrics.today,
      month: localMetrics.month,
      storageMode: "local" as const,
      trackedAt: new Date().toISOString(),
    };
  }
}

export function subscribeVisitorTracking(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getVisitorTrackingSnapshot() {
  return trackingState;
}

export function useVisitorTracking() {
  return useSyncExternalStore(
    subscribeVisitorTracking,
    getVisitorTrackingSnapshot,
    getVisitorTrackingSnapshot,
  );
}

export async function refreshVisitorTracking(config: SiteConfig) {
  const identity = ensureIdentity();
  const device = identity.device || readDeviceProfile(identity);
  updateState((current) => ({
    ...current,
    device,
    source: readTrackingSource(),
    metrics: {
      ...current.metrics,
      storageMode: normalizeStorageMode(
        readSupabaseConfig(config) ? "database" : "local",
      ),
    },
  }));
  const metrics = await hydrateVisitorMetrics(config, device);
  updateState((current) => ({
    ...current,
    device,
    source: readTrackingSource(),
    metrics,
  }));
  const network = await lookupNetworkInfo(
    config.trafficStats.fallbackNetworkLabel,
    config.trafficStats.fallbackLocationLabel,
  );
  writeStoredNetwork(network);
  updateState((current) => ({
    ...current,
    ready: true,
    network,
    metrics: {
      ...current.metrics,
      storageMode: metrics.storageMode,
      trackedAt: metrics.trackedAt,
    },
  }));
  const supabase = readSupabaseConfig(config);
  if (supabase) {
    try {
      await syncSessionToSupabase(supabase, device, network);
    } catch {
      /* best effort */
    }
  }
}

export function initVisitorTracking(config: SiteConfig) {
  if (!isBrowser() || initialized) return () => {};
  initialized = true;
  const identity = ensureIdentity();
  const device = identity.device || readDeviceProfile(identity);
  updateState({
    ready: false,
    device,
    network: readStoredNetwork(),
    metrics: {
      ...defaultMetrics(),
      storageMode: normalizeStorageMode(
        readSupabaseConfig(config) ? "database" : "local",
      ),
    },
    source: readTrackingSource(),
  });
  void refreshVisitorTracking(config);
  return () => {};
}

export function buildTrackingSummary(snapshot: VisitorTrackingSnapshot) {
  return {
    deviceSummary: snapshot.device.modelDisplay,
    networkSummary: [
      snapshot.network.connectionType || "Kết nối ổn định",
      snapshot.network.label,
      snapshot.network.locationLabel,
      snapshot.network.networkFlags.length
        ? `Cảnh báo: ${snapshot.network.networkFlags.join(", ")}`
        : "",
    ]
      .filter(Boolean)
      .join(" · "),
  };
}
