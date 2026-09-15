import { useEffect, useState } from "react";
import { Activity, CalendarDays, Cpu, MapPin, Wifi } from "lucide-react";
import {
  bumpVisitCounters,
  detectDevice,
  getConnectionType,
  getIpSnapshot,
  isHeadless,
} from "@/lib/behavior";

/**
 * Khối thống kê minh bạch: số truy cập chỉ tính trên thiết bị hiện tại.
 * Không hiển thị IP và không giả lập số người online bằng số ngẫu nhiên.
 */
export function FooterStats() {
  const [visits, setVisits] = useState({ today: 0, month: 0 });
  const [device, setDevice] = useState<ReturnType<typeof detectDevice> | null>(
    null,
  );
  const [connection, setConnection] = useState("");
  const [location, setLocation] = useState("");
  const [network, setNetwork] = useState({
    provider: "",
    flags: [] as string[],
  });
  const [bot, setBot] = useState(false);

  useEffect(() => {
    setVisits(bumpVisitCounters());
    setDevice(detectDevice());
    setConnection(getConnectionType());
    setBot(isHeadless());

    const refreshLocation = () => {
      const snapshot = getIpSnapshot();
      setLocation(snapshot.city);
      setNetwork({
        provider: snapshot.networkProvider,
        flags: snapshot.networkFlags,
      });
    };
    refreshLocation();
    const poll = window.setInterval(refreshLocation, 1500);
    return () => {
      window.clearInterval(poll);
    };
  }, []);

  const deviceValue = device
    ? [device.model, device.os, device.browser].filter(Boolean).join(" · ")
    : "Đang nhận diện...";
  const connectionValue =
    [
      connection || "Loại kết nối không cung cấp",
      network.provider && `Nhà mạng: ${network.provider}`,
      location && `Khu vực: ${location}`,
      network.flags.length > 0 && `Cảnh báo: ${network.flags.join(", ")}`,
      bot && "Trình duyệt tự động",
    ]
      .filter(Boolean)
      .join(" · ") || "Chưa xác định";

  const items = [
    { icon: Activity, label: "Phiên hiện tại", value: "1 phiên" },
    {
      icon: CalendarDays,
      label: "Truy cập hôm nay trên thiết bị",
      value: visits.today.toLocaleString("vi-VN"),
    },
    {
      icon: CalendarDays,
      label: "Truy cập tháng này trên thiết bị",
      value: visits.month.toLocaleString("vi-VN"),
    },
    { icon: Cpu, label: "Thiết bị nhận diện", value: deviceValue },
    { icon: Wifi, label: "Kết nối & khu vực", value: connectionValue },
  ];

  return (
    <aside
      aria-label="Thống kê lưu lượng truy cập"
      className="rounded-2xl bg-card/80 p-4 ring-1 ring-border backdrop-blur"
    >
      <dl className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {items.map((it) => (
          <div
            key={it.label}
            className="min-w-0 rounded-xl bg-background/70 px-3.5 py-3 ring-1 ring-border/70"
          >
            <dt className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <it.icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {it.label}
            </dt>
            <dd
              className="mt-1 min-h-10 break-words text-sm font-bold text-foreground"
              title={it.value}
            >
              {it.value}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
        <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
        Dữ liệu truy cập được lưu cục bộ trên thiết bị này; khu vực chỉ hiển thị
        khi dịch vụ định vị IP phản hồi.
      </p>
    </aside>
  );
}
