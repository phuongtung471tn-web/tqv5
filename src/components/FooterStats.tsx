import { Activity, CalendarDays, Cpu, MapPin, Wifi } from "lucide-react";

import { useVisitorTrackingSnapshot } from "@/lib/visitor-tracking";

interface FooterStatsProps {
  title?: string;
  helperText?: string;
}

export function FooterStats({
  title = "Thống kê truy cập thông minh",
  helperText = "Dữ liệu truy cập được gom từ cùng một kho tracking để đồng bộ giữa Analytics, Mini-CRM và Webhook.",
}: FooterStatsProps) {
  const snapshot = useVisitorTrackingSnapshot();
  const deviceValue = [
    snapshot.device.manufacturer !== "Unknown"
      ? snapshot.device.manufacturer
      : "",
    snapshot.device.model,
    snapshot.device.os,
    snapshot.device.browser,
  ]
    .filter(Boolean)
    .join(" · ");

  const items = [
    {
      icon: Activity,
      label: "Phiên hiện tại",
      value: `1 phiên · Visitor ${snapshot.visitorId.slice(-6)}`,
    },
    {
      icon: CalendarDays,
      label: "Truy cập hôm nay",
      value: snapshot.metrics.sessionCounts.today.toLocaleString("vi-VN"),
    },
    {
      icon: CalendarDays,
      label: "Truy cập tháng này",
      value: snapshot.metrics.sessionCounts.month.toLocaleString("vi-VN"),
    },
    {
      icon: Cpu,
      label: "Thiết bị nhận diện",
      value: deviceValue || "Đang nhận diện thiết bị...",
    },
    {
      icon: Wifi,
      label: "Mạng & khu vực",
      value: snapshot.network.displayLabel || snapshot.network.fallbackLabel,
    },
  ];

  return (
    <aside
      aria-label="Thống kê lưu lượng truy cập"
      className="rounded-2xl bg-card/85 p-4 ring-1 ring-border backdrop-blur sm:p-5"
    >
      <div className="mb-4 flex flex-col gap-1">
        <h3 className="text-base font-extrabold text-foreground sm:text-lg">
          {title}
        </h3>
        <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {helperText}
        </p>
      </div>
      <dl className="grid min-w-0 gap-3 sm:grid-cols-2 2xl:grid-cols-5">
        {items.map((item) => (
          <div
            key={item.label}
            className="min-w-0 rounded-xl bg-background/80 px-3.5 py-3 ring-1 ring-border/70"
          >
            <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <item.icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {item.label}
            </dt>
            <dd
              className="mt-1 min-h-10 break-words text-sm font-bold leading-relaxed text-foreground"
              title={item.value}
            >
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
        <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        {snapshot.network.lookupStatus === "resolved"
          ? `Nhà mạng hiện tại: ${snapshot.network.provider || snapshot.network.connectionLabel}. Khi dịch vụ IP thiếu dữ liệu, hệ thống tự rơi về chuỗi lịch sự thay thế.`
          : "Dịch vụ định vị IP đang dùng cơ chế dự phòng; giao diện vẫn hiển thị chuỗi mạng chuyên nghiệp, không lộ lỗi hệ thống."}
      </p>
    </aside>
  );
}
