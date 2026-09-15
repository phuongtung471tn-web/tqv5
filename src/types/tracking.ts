export type TrackingStorageMode = "local" | "database";

export type DeviceKind = "mobile" | "tablet" | "desktop" | "bot" | "unknown";

export interface DeviceProfile {
  sessionId: string;
  fingerprint: string;
  kind: DeviceKind;
  vendor: string;
  model: string;
  modelDisplay: string;
  osName: string;
  osVersion: string;
  browserName: string;
  browserVersion: string;
  userAgent: string;
  language: string;
  viewport: string;
  memoryGb: number | null;
  cpuCores: number | null;
  touchPoints: number;
}

export interface NetworkInfo {
  ipAddress: string;
  city: string;
  region: string;
  country: string;
  isp: string;
  asn: string;
  connectionType: string;
  networkFlags: string[];
  isFallback: boolean;
  label: string;
  locationLabel: string;
}

export interface TrackingSource {
  source: string;
  medium: string;
  campaign: string;
  content: string;
  ttclid: string;
}

export interface VisitorMetrics {
  currentSession: number;
  today: number;
  month: number;
  storageMode: TrackingStorageMode;
  trackedAt: string;
}

export interface VisitorTrackingSnapshot {
  ready: boolean;
  device: DeviceProfile;
  network: NetworkInfo;
  metrics: VisitorMetrics;
  source: TrackingSource;
}
