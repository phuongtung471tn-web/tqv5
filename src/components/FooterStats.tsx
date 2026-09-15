import { useMemo } from "react";
import { Activity, CalendarDays, Cpu, MapPin, Wifi } from "lucide-react";
import { useSiteConfig } from "@/lib/use-site-config";
import { useVisitorTracking } from "@/lib/visitor-tracking";

/**
 * Khối thống kê minh bạch: số truy cập chỉ tính trên thiết bị hiện tại.
 * Không hiển thị IP và không giả lập số người online bằng số ngẫu nhiên.
 */
export function FooterStats() {
  const { config } = useSiteConfig();
  const snapshot = useVisitorTracking();
  const showAttribution = config.trafficStats.showAttribution;
  const isCompact = config.trafficStats.variant === "compact";

  const items = useMemo(
    () => [
      {
        icon: Activity,
        label: "Phiên hiện tại",
        value: `${snapshot.metrics.currentSession} phiên`,
      },
      {
        icon: CalendarDays,
        label: "Truy cập hôm nay",
        value: snapshot.metrics.today.toLocaleString("vi-VN"),
      },
      {
        icon: CalendarDays,
        label: "Truy cập tháng này",
        value: snapshot.metrics.month.toLocaleString("vi-VN"),
      },
      {
        icon: Cpu,
        label: "Thiết bị nhận diện",
        value: snapshot.device.modelDisplay || "Đang nhận diện...",
      },
      {
        icon: Wifi,
        label: "Kết nối & khu vực",
        value: [
          snapshot.network.connectionType || "Loại kết nối không cung cấp",
          snapshot.network.label,
          snapshot.network.locationLabel,
          snapshot.network.networkFlags.length > 0
            ? `Cảnh báo: ${snapshot.network.networkFlags.join(", ")}`
            : "",
          snapshot.device.kind === "bot" ? "Trình duyệt tự động" : "",
        ]
          .filter(Boolean)
          .join(" · "),
      },
      ...(showAttribution
        ? [
            {
              icon: MapPin,
              label: "Nguồn truy cập",
              value: [
                snapshot.source.source || "direct",
                snapshot.source.medium || "organic",
                snapshot.source.campaign || "—",
              ].join(" · "),
            },
          ]
        : []),
    ],
    [showAttribution, snapshot],
  );

  const note = snapshot.network.isFallback
    ? `Đang dùng chuỗi dự phòng: ${config.trafficStats.fallbackNetworkLabel}.`
    : `Dữ liệu truy cập đang đồng bộ qua ${snapshot.metrics.storageMode === "database" ? "Supabase Cloud" : "bộ nhớ cục bộ"} cho thiết bị này.`;

  return (
    <aside
      aria-label="Thống kê lưu lượng truy cập"
      className="overflow-hidden rounded-2xl bg-card/80 p-4 ring-1 ring-border backdrop-blur sm:p-5"
    >
      <dl
        className={`grid min-w-0 gap-3 ${isCompact ? "sm:grid-cols-2 xl:grid-cols-3" : "sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6"}`}
      >
        {items.map((it) => (
          <div
            key={it.label}
            className="min-w-0 rounded-xl bg-background/70 px-3.5 py-3 ring-1 ring-border/70"
          >
            <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <it.icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">{it.label}</span>
            </dt>
            <dd
              className="mt-1 min-h-10 break-words text-sm font-bold leading-5 text-foreground"
              title={it.value}
            >
              {it.value}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 flex items-start gap-1.5 text-[11px] text-muted-foreground">
        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        <span className="min-w-0 break-words">{note}</span>
      </p>
    </aside>
  );
}
