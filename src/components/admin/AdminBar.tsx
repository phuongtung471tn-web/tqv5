import {
  Bell,
  BarChart3,
  FileText,
  SplitSquareHorizontal,
  Mail,
  Link2,
  BookOpen,
  ClipboardList,
  Globe,
  CloudUpload,
  Database,
  Search,
  KeyRound,
  Save,
  Package,
  Upload,
  Eye,
  EyeOff,
  RotateCcw,
  LogOut,
  Pencil,
  Smartphone,
  Tablet,
  Monitor,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useAdmin, type AdminModalKey } from "@/lib/use-admin";
import { useSiteConfig } from "@/lib/use-site-config";
import { isDevicePreview } from "./DeviceFrame";

interface Tool {
  key: AdminModalKey;
  label: string;
  icon: LucideIcon;
}

const TOOLS: Tool[] = [
  { key: "editor", label: "Sửa Giao Diện", icon: Pencil },
  { key: "fomo", label: "FOMO Popups", icon: Bell },
  { key: "analytics", label: "Analytics", icon: BarChart3 },
  { key: "pages", label: "Đa Trang", icon: FileText },
  { key: "abtest", label: "A/B Testing", icon: SplitSquareHorizontal },
  { key: "email", label: "Auto Email", icon: Mail },
  { key: "webhook", label: "Webhook Hub", icon: Link2 },
  { key: "guide", label: "Hướng Dẫn & Health", icon: BookOpen },
  { key: "leads", label: "Quản Lý Lead", icon: ClipboardList },
  { key: "webmaster", label: "Webmaster & Scripts", icon: Globe },
  { key: "cron", label: "Cloud Cron & Backup", icon: CloudUpload },
  { key: "storage", label: "Storage Mode", icon: Database },
  { key: "seo", label: "SEO Google", icon: Search },
  { key: "adminlink", label: "Đổi Link Admin", icon: KeyRound },
];

const DEVICES = [
  { key: "mobile" as const, label: "Mobile 375", icon: Smartphone },
  { key: "tablet" as const, label: "Tablet 768", icon: Tablet },
  { key: "desktop" as const, label: "Desktop 100%", icon: Monitor },
];

export function AdminBar() {
  const {
    authed,
    openModal,
    logout,
    device,
    setDevice,
    deviceSizes,
    setDeviceSize,
    resetDeviceSizes,
    previewEnabled,
    setPreviewEnabled,
  } = useAdmin();
  const { save, reset, exportFile, importConfig, dirty } = useSiteConfig();
  const [hidden, setHidden] = useState(true);
  const [compactPreview, setCompactPreview] = useState(false);
  const configInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setHidden(isDevicePreview()), []);
  useEffect(() => {
    setCompactPreview(previewEnabled);
  }, [previewEnabled]);

  function handleImportConfig(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const ok = importConfig(String(reader.result));
      window.alert(
        ok
          ? "Đã nhập và lưu cấu hình thành công."
          : "File cấu hình không hợp lệ hoặc thiếu trường bắt buộc.",
      );
    };
    reader.onerror = () => window.alert("Không thể đọc file cấu hình.");
    reader.readAsText(file);
  }

  if (hidden || !authed) return null;

  return (
    <div className="sticky top-0 z-[90] border-b border-white/10 bg-neutral-950 text-white">
      <div className="flex flex-wrap items-center gap-1.5 px-2 py-2">
        <span className="shrink-0 rounded-md bg-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide">
          Admin
        </span>
        <button
          onClick={() => setCompactPreview((value) => !value)}
          className="rounded-md bg-white/10 px-2.5 py-1.5 text-[11px] font-semibold text-white/80 transition-colors hover:bg-white/20"
        >
          {compactPreview ? "Mở rộng" : "Thu gọn"}
        </button>
        <button
          onClick={() => setPreviewEnabled(!previewEnabled)}
          aria-pressed={previewEnabled}
          title={
            previewEnabled
              ? "Tắt khung xem trước, sửa trực tiếp trên trang thật"
              : "Bật lại khung xem trước theo thiết bị"
          }
          className={`flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-bold transition-colors ${
            previewEnabled
              ? "bg-white text-neutral-900"
              : "bg-white/10 text-white/70 hover:bg-white/20"
          }`}
        >
          {previewEnabled ? (
            <Eye className="h-3.5 w-3.5" />
          ) : (
            <EyeOff className="h-3.5 w-3.5" />
          )}
          Xem trước: {previewEnabled ? "BẬT" : "TẮT"}
        </button>
        {DEVICES.map((item) => {
          const Icon = item.icon;
          const active = device === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setDevice(item.key)}
              disabled={!previewEnabled}
              aria-pressed={active}
              className={`flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-bold transition-colors disabled:opacity-40 ${
                active
                  ? "bg-white text-neutral-900"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {item.label}
            </button>
          );
        })}
        <button
          onClick={() => openModal("editor")}
          className="rounded-md bg-white/10 px-2.5 py-1.5 text-[11px] font-bold text-white/80 transition-colors hover:bg-white/20"
        >
          Sửa nhanh
        </button>
        <button
          onClick={save}
          className={`rounded-md px-2.5 py-1.5 text-[11px] font-bold transition-colors ${
            dirty ? "bg-emerald-500 text-white" : "bg-white/10 text-white/70"
          }`}
        >
          Lưu{dirty ? " *" : ""}
        </button>
        <button
          onClick={logout}
          className="ml-auto rounded-md bg-red-500/20 px-2.5 py-1.5 text-[11px] font-bold text-red-300 transition-colors hover:bg-red-500/30"
        >
          Đăng xuất
        </button>
      </div>

      {!compactPreview && (
        <>
          <div className="flex items-center gap-1 overflow-x-auto border-t border-white/10 px-2 py-1.5 scrollbar-none">
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.key}
                  onClick={() => openModal(tool.key)}
                  title={tool.label}
                  className="flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1.5 text-[11px] font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="whitespace-nowrap">{tool.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto border-t border-white/10 px-2 py-1.5">
            <span className="shrink-0 text-[10px] font-semibold uppercase tracking-wide text-white/40">
              Kích thước preview
            </span>
            <label className="flex shrink-0 items-center gap-1 text-[10px] text-white/60">
              Rộng
              <input
                aria-label="Chiều rộng khung xem thử"
                type="number"
                min="280"
                max="1920"
                value={deviceSizes[device].width}
                onChange={(event) =>
                  setDeviceSize(device, {
                    ...deviceSizes[device],
                    width: Math.max(280, Number(event.target.value) || 280),
                  })
                }
                className="w-16 rounded border border-white/20 bg-white/10 px-1.5 py-1 text-center text-[11px] text-white"
              />
              Cao
              <input
                aria-label="Chiều cao khung xem thử"
                type="number"
                min="400"
                max="1600"
                value={deviceSizes[device].height}
                onChange={(event) =>
                  setDeviceSize(device, {
                    ...deviceSizes[device],
                    height: Math.max(400, Number(event.target.value) || 400),
                  })
                }
                className="w-16 rounded border border-white/20 bg-white/10 px-1.5 py-1 text-center text-[11px] text-white"
              />
            </label>
            <button
              onClick={resetDeviceSizes}
              className="shrink-0 rounded-md bg-white/10 px-2 py-1.5 text-[11px] font-semibold text-white/70 hover:bg-white/20 hover:text-white"
              title="Khôi phục kích thước mặc định"
            >
              Mặc định
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 border-t border-white/10 px-2 py-1.5">
            <button
              onClick={exportFile}
              className="flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white/80 transition-colors hover:bg-white/20"
            >
              <Package className="h-3.5 w-3.5" />
              XUẤT CONFIG
            </button>
            <input
              ref={configInputRef}
              type="file"
              accept="application/json,.json,.js"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) handleImportConfig(file);
                event.target.value = "";
              }}
            />
            <button
              onClick={() => configInputRef.current?.click()}
              className="flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white/80 transition-colors hover:bg-white/20"
            >
              <Upload className="h-3.5 w-3.5" />
              NHẬP CONFIG
            </button>
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Khôi phục cấu hình gốc? Mọi thay đổi đã lưu sẽ mất.",
                  )
                ) {
                  reset();
                }
              }}
              className="flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white/80 transition-colors hover:bg-white/20"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              RESET
            </button>
          </div>
        </>
      )}
    </div>
  );
}
