import type {
  DeviceKind,
  DeviceProfile,
  NetworkInfo,
  TrackingSource,
} from "@/types/tracking";

const DEFAULT_NETWORK_LABEL = "Mạng băng thông rộng · Việt Nam";
const DEFAULT_LOCATION_LABEL = "Việt Nam";

const isBrowser = () => typeof window !== "undefined";

const APPLE_MODEL_MAP: Array<{ size: number; label: string }> = [
  { size: 932, label: "iPhone 15/16 Pro Max" },
  { size: 926, label: "iPhone 12/13/14 Pro Max" },
  { size: 896, label: "iPhone XR/11/XS Max" },
  { size: 852, label: "iPhone 14/15/16 Pro" },
  { size: 844, label: "iPhone 12/13/14" },
  { size: 812, label: "iPhone X/XS/11 Pro" },
];

function readNavigator() {
  return navigator as Navigator & {
    deviceMemory?: number;
    maxTouchPoints?: number;
    hardwareConcurrency?: number;
    userAgentData?: {
      mobile?: boolean;
      platform?: string;
      brands?: Array<{ brand: string; version: string }>;
    };
    connection?: { effectiveType?: string };
  };
}

function sanitizeToken(value: string) {
  return value.replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeAndroidModel(rawModel: string) {
  const value = sanitizeToken(rawModel.replace(/Build\/.*/i, ""));
  if (!value) return { vendor: "Android", model: "Thiết bị Android" };
  const compact = value.replace(/\s+/g, "");
  if (/^SM[-\s]/i.test(value))
    return { vendor: "Samsung", model: `Samsung Galaxy ${value}` };
  if (/^Pixel/i.test(value)) return { vendor: "Google", model: value };
  if (/^(MIX|MI|Redmi|POCO)/i.test(value))
    return { vendor: "Xiaomi", model: value };
  if (/^(CPH|PJF|PFT|PEM|PJA|RMX)/i.test(compact))
    return { vendor: "OPPO/realme", model: value };
  if (/^(V\d{4}|Vivo)/i.test(value)) return { vendor: "vivo", model: value };
  if (/^(ANA|ELS|JAD|LYA|NOH|TAS|MAR|BLA|VOG)/i.test(compact))
    return { vendor: "HUAWEI", model: value };
  const [firstWord] = value.split(" ");
  return { vendor: firstWord || "Android", model: value };
}

function buildAppleModel() {
  if (!isBrowser()) return "iPhone";
  const size = Math.max(window.screen.width, window.screen.height);
  const matched = APPLE_MODEL_MAP.find((item) => size >= item.size);
  return matched?.label || "iPhone SE/8/mini";
}

function inferDeviceKind(userAgent: string): DeviceKind {
  if (/HeadlessChrome|Puppeteer|Playwright|PhantomJS/i.test(userAgent))
    return "bot";
  if (/iPad|Tablet|Nexus 7|Nexus 10|SM-T|Tab/i.test(userAgent)) return "tablet";
  if (/Mobi|iPhone|Android/i.test(userAgent)) return "mobile";
  if (userAgent) return "desktop";
  return "unknown";
}

function parseOs(userAgent: string) {
  const rules = [
    [/Windows NT 11\.0/i, ["Windows", "11"]],
    [/Windows NT 10\.0/i, ["Windows", "10"]],
    [/Windows NT 6\.3/i, ["Windows", "8.1"]],
    [/Windows NT 6\.2/i, ["Windows", "8"]],
    [/Windows NT 6\.1/i, ["Windows", "7"]],
    [/Android[\s/]+([\d.]+)/i, ["Android", "$1"]],
    [/iPhone OS ([\d_]+)/i, ["iOS", "$1"]],
    [/CPU OS ([\d_]+)/i, ["iPadOS", "$1"]],
    [/Mac OS X ([\d_]+)/i, ["macOS", "$1"]],
  ] as const;
  for (const [pattern, [name, version]] of rules) {
    const match = userAgent.match(pattern);
    if (match)
      return {
        name,
        version:
          version === "$1"
            ? (match[1] || "").replaceAll("_", ".")
            : version.replaceAll("_", "."),
      };
  }
  if (/Linux/i.test(userAgent)) return { name: "Linux", version: "" };
  return { name: "Unknown", version: "" };
}

function parseBrowser(userAgent: string) {
  const browserRules = [
    [/Edg\/([\d.]+)/i, "Edge"],
    [/OPR\/([\d.]+)/i, "Opera"],
    [/CriOS\/([\d.]+)/i, "Chrome iOS"],
    [/Chrome\/([\d.]+)/i, "Chrome"],
    [/Firefox\/([\d.]+)/i, "Firefox"],
    [/Version\/([\d.]+).*Safari/i, "Safari"],
  ] as const;
  for (const [pattern, name] of browserRules) {
    const match = userAgent.match(pattern);
    if (match) return { name, version: match[1] || "" };
  }
  if (/FBAN|FBAV/i.test(userAgent))
    return { name: "Facebook In-App", version: "" };
  if (/TikTok|BytedanceWebview/i.test(userAgent))
    return { name: "TikTok In-App", version: "" };
  if (/Zalo/i.test(userAgent)) return { name: "Zalo In-App", version: "" };
  return { name: "Khác", version: "" };
}

function parseHardware(userAgent: string, osName: string) {
  if (/iPhone/i.test(userAgent))
    return {
      vendor: "Apple",
      model: buildAppleModel(),
    };
  if (/iPad/i.test(userAgent))
    return {
      vendor: "Apple",
      model: "iPad",
    };
  const androidMatch = userAgent.match(/Android[\s\d.]*;\s*([^;)]+)/i);
  if (androidMatch?.[1]) return normalizeAndroidModel(androidMatch[1]);
  if (osName === "Windows") return { vendor: "Microsoft", model: "PC Windows" };
  if (osName === "macOS") return { vendor: "Apple", model: "Mac" };
  return { vendor: osName || "Unknown", model: osName || "Unknown" };
}

function stringHash(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return `fp_${Math.abs(hash).toString(36)}`;
}

function createSessionId() {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return `vs_${crypto.randomUUID()}`;
  }
  const entropy = [
    Date.now().toString(36),
    typeof performance !== "undefined"
      ? Math.round(performance.now() * 1000).toString(36)
      : "0",
  ].join("_");
  return `vs_${stringHash(entropy)}_${entropy}`;
}

export function readEffectiveConnectionType() {
  if (!isBrowser()) return "";
  return readNavigator().connection?.effectiveType?.toUpperCase() || "";
}

export function readTrackingSource(): TrackingSource {
  if (!isBrowser())
    return { source: "", medium: "", campaign: "", content: "", ttclid: "" };
  let stored: Record<string, string> = {};
  try {
    stored = JSON.parse(
      window.localStorage.getItem("lp_utm") || "{}",
    ) as Record<string, string>;
  } catch {
    stored = {};
  }
  const params = new URLSearchParams(window.location.search);
  const source = {
    source: params.get("utm_source") || stored["utm_source"] || "",
    medium: params.get("utm_medium") || stored["utm_medium"] || "",
    campaign: params.get("utm_campaign") || stored["utm_campaign"] || "",
    content: params.get("utm_content") || stored["utm_content"] || "",
    ttclid: params.get("ttclid") || stored["ttclid"] || "",
  };
  if (params.toString()) {
    try {
      window.localStorage.setItem(
        "lp_utm",
        JSON.stringify({
          utm_source: source.source,
          utm_medium: source.medium,
          utm_campaign: source.campaign,
          utm_content: source.content,
          ttclid: source.ttclid,
        }),
      );
    } catch {
      /* ignore quota */
    }
  }
  return source;
}

export function readDeviceProfile(seed?: {
  fingerprint?: string;
  sessionId?: string;
}): DeviceProfile {
  const fallback: DeviceProfile = {
    sessionId: seed?.sessionId || "session_unknown",
    fingerprint: seed?.fingerprint || "fp_unknown",
    kind: "unknown",
    vendor: "Unknown",
    model: "Unknown",
    modelDisplay: "Unknown · Unknown · Unknown",
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
  };
  if (!isBrowser()) return fallback;
  const nav = readNavigator();
  const userAgent = navigator.userAgent || "";
  const os = parseOs(userAgent);
  const browser = parseBrowser(userAgent);
  const hardware = parseHardware(userAgent, os.name);
  const kind = inferDeviceKind(userAgent);
  const fingerprintBase = [
    userAgent,
    navigator.language,
    `${window.screen.width}x${window.screen.height}`,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    nav.userAgentData?.platform || navigator.platform,
    String(nav.maxTouchPoints || 0),
    String(nav.hardwareConcurrency || 0),
  ].join("|");
  const fingerprint = seed?.fingerprint || stringHash(fingerprintBase);
  const sessionId = seed?.sessionId || createSessionId();
  const osDisplay = [os.name, os.version].filter(Boolean).join(" ");
  const browserDisplay = [browser.name, browser.version]
    .filter(Boolean)
    .join(" ");
  return {
    sessionId,
    fingerprint,
    kind,
    vendor: hardware.vendor,
    model: hardware.model,
    modelDisplay: [hardware.model, osDisplay, browserDisplay]
      .filter(Boolean)
      .join(" · "),
    osName: os.name,
    osVersion: os.version,
    browserName: browser.name,
    browserVersion: browser.version,
    userAgent,
    language: navigator.language || "vi-VN",
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    memoryGb: typeof nav.deviceMemory === "number" ? nav.deviceMemory : null,
    cpuCores:
      typeof nav.hardwareConcurrency === "number"
        ? nav.hardwareConcurrency
        : null,
    touchPoints: nav.maxTouchPoints || 0,
  };
}

function pickProvider(...values: Array<string | undefined>) {
  const value = values
    .map((item) => (item || "").trim())
    .find((item) => item.length > 0);
  if (!value) return "";
  const normalized = value
    .replace(/\s+/g, " ")
    .replace(/^AS\d+\s+/i, "")
    .trim();
  if (/viettel/i.test(normalized)) return "Viettel";
  if (/vnpt/i.test(normalized)) return "VNPT";
  if (/fpt/i.test(normalized)) return "FPT";
  if (/mobifone/i.test(normalized)) return "MobiFone";
  if (/vinaphone/i.test(normalized)) return "VinaPhone";
  return normalized;
}

function buildNetworkLabels(network: {
  city?: string;
  region?: string;
  country?: string;
  isp?: string;
}) {
  const locationLabel =
    [network.city, network.region, network.country]
      .filter(Boolean)
      .join(", ") || DEFAULT_LOCATION_LABEL;
  const provider = network.isp || "Mạng băng thông rộng";
  return {
    label: `${provider} · ${network.country || "Việt Nam"}`,
    locationLabel,
  };
}

export async function lookupNetworkInfo(
  fallbackNetworkLabel = DEFAULT_NETWORK_LABEL,
  fallbackLocationLabel = DEFAULT_LOCATION_LABEL,
): Promise<NetworkInfo> {
  const base: NetworkInfo = {
    ipAddress: "",
    city: "",
    region: "",
    country: "Việt Nam",
    isp: "",
    asn: "",
    connectionType: readEffectiveConnectionType(),
    networkFlags: [],
    isFallback: true,
    label: fallbackNetworkLabel,
    locationLabel: fallbackLocationLabel,
  };
  if (!isBrowser()) return base;
  const responses = [
    async () => {
      const response = await fetch("https://ipwho.is/", { cache: "no-store" });
      const payload = (await response.json()) as {
        ip?: string;
        city?: string;
        region?: string;
        country?: string;
        connection?: { isp?: string; org?: string; asn?: string };
        security?: {
          vpn?: boolean;
          proxy?: boolean;
          tor?: boolean;
          hosting?: boolean;
        };
      };
      return {
        ipAddress: payload.ip || "",
        city: payload.city || "",
        region: payload.region || "",
        country: payload.country || "Việt Nam",
        isp: pickProvider(payload.connection?.isp, payload.connection?.org),
        asn: payload.connection?.asn || "",
        networkFlags: [
          payload.security?.vpn && "VPN",
          payload.security?.proxy && "Proxy",
          payload.security?.tor && "Tor",
          payload.security?.hosting && "Hosting",
        ].filter((flag): flag is string => Boolean(flag)),
      };
    },
    async () => {
      const response = await fetch("https://ipapi.co/json/", {
        headers: { Accept: "application/json" },
        cache: "no-store",
      });
      const payload = (await response.json()) as {
        ip?: string;
        city?: string;
        region?: string;
        country_name?: string;
        org?: string;
        asn?: string;
      };
      return {
        ipAddress: payload.ip || "",
        city: payload.city || "",
        region: payload.region || "",
        country: payload.country_name || "Việt Nam",
        isp: pickProvider(payload.org),
        asn: payload.asn || "",
        networkFlags: [],
      };
    },
  ];
  for (const fetcher of responses) {
    try {
      const payload = await fetcher();
      const labels = buildNetworkLabels(payload);
      if (payload.ipAddress || payload.city || payload.isp) {
        return {
          ...base,
          ...payload,
          ...labels,
          isFallback: false,
          connectionType: readEffectiveConnectionType(),
        };
      }
    } catch {
      /* try next source */
    }
  }
  return base;
}
