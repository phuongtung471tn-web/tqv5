import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { a as clearAnalytics, d as saveLead, f as testSupabaseConnection, h as useSiteConfig, i as SiteConfigProvider, l as loadAnalytics, m as trackVisit, n as DEFAULT_CONFIG, o as clearLeads, s as exportLeadsCsv, t as ANALYTICS_UPDATED_EVENT, u as loadLeads } from "./use-site-config-BbUwIRRQ.mjs";
import { n as useAdmin, t as AdminProvider } from "./use-admin-BM5hUDJ4.mjs";
import { b as useRouter, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Clock, C as KeyRound, D as Download, E as FileText, F as Bell, I as Activity, M as ChartColumn, N as BrainCircuit, O as Database, P as BookOpen, S as Link2, T as Globe, _ as Monitor, a as Tablet, b as LogOut, c as Search, d as RectangleEllipsis, f as Plus, g as Package, h as Palette, i as Tag, j as ClipboardList, k as CloudUpload, l as Save, m as Pencil, n as Trash2, o as SquareSplitHorizontal, p as Phone, r as Target, s as Smartphone, t as X, u as RotateCcw, w as GraduationCap, y as Mail } from "../_libs/lucide-react.mjs";
import { a as resetVariant, c as testWebhookEndpoint, d as utmSource, i as getVariant, r as fireTestEvent, s as sendTestEmail, t as checkEmailConfig } from "./ab-BCHQbx_f.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CQQRpFt7.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DxKbK7lP.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
/** Cờ cho biết trang đang chạy bên trong khung xem thử (ẩn thanh Admin). */
function isDevicePreview() {
	if (typeof window === "undefined") return false;
	return new URLSearchParams(window.location.search).has("device_preview");
}
/**
* Khung xem trước theo kích thước thiết bị. Dùng iframe để các breakpoint
* responsive thật sự áp dụng đúng với bề rộng 375px / 768px.
*/
function DeviceFrame({ children }) {
	const { authed, device, deviceSizes } = useAdmin();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [inPreview, setInPreview] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => setInPreview(isDevicePreview()), []);
	const size = deviceSizes[device];
	if (!authed || inPreview) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex justify-center bg-neutral-200 py-6 dark:bg-neutral-800",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
			title: `Xem thử ${device}`,
			src: `${pathname}?device_preview=1`,
			style: {
				width: size.width,
				height: size.height,
				maxWidth: "100%"
			},
			className: "rounded-2xl border-[10px] border-neutral-900 bg-background shadow-2xl"
		})
	});
}
var TOOLS = [
	{
		key: "editor",
		label: "Sửa Giao Diện",
		icon: Pencil
	},
	{
		key: "fomo",
		label: "FOMO Popups",
		icon: Bell
	},
	{
		key: "analytics",
		label: "Analytics",
		icon: ChartColumn
	},
	{
		key: "pages",
		label: "Đa Trang",
		icon: FileText
	},
	{
		key: "abtest",
		label: "A/B Testing",
		icon: SquareSplitHorizontal
	},
	{
		key: "email",
		label: "Auto Email",
		icon: Mail
	},
	{
		key: "webhook",
		label: "Webhook Hub",
		icon: Link2
	},
	{
		key: "sections",
		label: "Thêm Khối",
		icon: Plus
	},
	{
		key: "theme",
		label: "Style & Theme",
		icon: Palette
	},
	{
		key: "guide",
		label: "Hướng Dẫn & Health",
		icon: BookOpen
	},
	{
		key: "leads",
		label: "Quản Lý Lead",
		icon: ClipboardList
	},
	{
		key: "webmaster",
		label: "Webmaster & Scripts",
		icon: Globe
	},
	{
		key: "pixel",
		label: "Pixel & Ads",
		icon: Activity
	},
	{
		key: "utm",
		label: "UTM Hub",
		icon: Target
	},
	{
		key: "cron",
		label: "Cloud Cron & Backup",
		icon: CloudUpload
	},
	{
		key: "storage",
		label: "Storage Mode",
		icon: Database
	},
	{
		key: "seo",
		label: "SEO Google",
		icon: Search
	},
	{
		key: "form",
		label: "Form & Webhook",
		icon: RectangleEllipsis
	},
	{
		key: "ai",
		label: "AI Sales Advisor",
		icon: BrainCircuit
	},
	{
		key: "contact",
		label: "Hotline & Zalo",
		icon: Phone
	},
	{
		key: "countdown",
		label: "Countdown",
		icon: Clock
	},
	{
		key: "adminlink",
		label: "Đổi Link Admin",
		icon: KeyRound
	},
	{
		key: "tracking",
		label: "Tracking",
		icon: Tag
	}
];
var DEVICES = [
	{
		key: "mobile",
		label: "Mobile 375",
		icon: Smartphone
	},
	{
		key: "tablet",
		label: "Tablet 768",
		icon: Tablet
	},
	{
		key: "desktop",
		label: "Desktop 100%",
		icon: Monitor
	}
];
function AdminBar() {
	const { authed, openModal, logout, device, setDevice, deviceSizes, setDeviceSize, resetDeviceSizes } = useAdmin();
	const { save, reset, exportFile, dirty } = useSiteConfig();
	const [hidden, setHidden] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => setHidden(isDevicePreview()), []);
	if (hidden) return null;
	if (!authed) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "sticky top-0 z-[90] border-b border-white/10 bg-neutral-950 text-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 px-2 py-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "shrink-0 rounded-md bg-white/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide",
					children: "Admin"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-1 gap-1 overflow-x-auto scrollbar-none",
					children: TOOLS.map((t) => {
						const Icon = t.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => openModal(t.key),
							title: t.label,
							className: "flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1.5 text-[11px] font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "whitespace-nowrap",
								children: t.label
							})]
						}, t.key);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5 overflow-x-auto border-t border-white/10 px-2 py-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 text-[10px] font-semibold uppercase tracking-wide text-white/40",
						children: "Xem thử"
					}),
					DEVICES.map((d) => {
						const Icon = d.icon;
						const active = device === d.key;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setDevice(d.key),
							"aria-pressed": active,
							className: `flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-bold transition-colors ${active ? "bg-white text-neutral-900" : "bg-white/10 text-white/70 hover:bg-white/20"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-3.5 w-3.5" }), d.label]
						}, d.key);
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ml-auto flex shrink-0 items-center gap-1 text-[10px] text-white/60",
						children: [
							"Rộng",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								"aria-label": "Chiều rộng khung xem thử",
								type: "number",
								min: "280",
								max: "1920",
								value: deviceSizes[device].width,
								onChange: (event) => setDeviceSize(device, {
									...deviceSizes[device],
									width: Math.max(280, Number(event.target.value) || 280)
								}),
								className: "w-16 rounded border border-white/20 bg-white/10 px-1.5 py-1 text-center text-[11px] text-white"
							}),
							"Cao",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								"aria-label": "Chiều cao khung xem thử",
								type: "number",
								min: "400",
								max: "1600",
								value: deviceSizes[device].height,
								onChange: (event) => setDeviceSize(device, {
									...deviceSizes[device],
									height: Math.max(400, Number(event.target.value) || 400)
								}),
								className: "w-16 rounded border border-white/20 bg-white/10 px-1.5 py-1 text-center text-[11px] text-white"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: resetDeviceSizes,
						className: "shrink-0 rounded-md bg-white/10 px-2 py-1.5 text-[11px] font-semibold text-white/70 hover:bg-white/20 hover:text-white",
						title: "Khôi phục kích thước mặc định",
						children: "Mặc định"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1.5 border-t border-white/10 px-2 py-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: save,
						className: `flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[11px] font-bold transition-colors ${dirty ? "bg-emerald-500 text-white" : "bg-white/10 text-white/70"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-3.5 w-3.5" }),
							"LƯU",
							dirty ? " *" : ""
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: exportFile,
						className: "flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white/80 transition-colors hover:bg-white/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-3.5 w-3.5" }), "XUẤT CONFIG"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							if (window.confirm("Khôi phục cấu hình gốc? Mọi thay đổi đã lưu sẽ mất.")) reset();
						},
						className: "flex items-center gap-1.5 rounded-md bg-white/10 px-3 py-1.5 text-[11px] font-bold text-white/80 transition-colors hover:bg-white/20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "h-3.5 w-3.5" }), "RESET"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: logout,
						className: "ml-auto flex items-center gap-1.5 rounded-md bg-red-500/20 px-3 py-1.5 text-[11px] font-bold text-red-300 transition-colors hover:bg-red-500/30",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), "Đăng Xuất"]
					})
				]
			})
		]
	});
}
/** Khung modal chung — full-screen trên mobile, canh giữa trên desktop. */
function AdminModal({ title, subtitle, onClose, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `fixed inset-0 z-[95] flex bg-black/60 ${title === "Sửa Giao Diện" ? "justify-end" : "items-end justify-center p-0 sm:items-center sm:p-4"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `flex max-h-[92vh] w-full flex-col bg-white text-neutral-900 shadow-2xl dark:bg-neutral-900 dark:text-neutral-100 ${title === "Sửa Giao Diện" ? "h-full max-h-full max-w-xl border-l border-neutral-200 dark:border-white/10" : "rounded-t-2xl sm:max-w-2xl sm:rounded-2xl"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3 border-b border-neutral-200 px-4 py-3 dark:border-white/10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-bold",
					children: title
				}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-xs text-neutral-500",
					children: subtitle
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					"aria-label": "Đóng",
					className: "rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-white/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto px-4 py-4",
				children
			})]
		})
	});
}
function Field({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "mb-3 block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-1 block text-xs font-semibold text-neutral-700 dark:text-neutral-300",
				children: label
			}),
			children,
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-1 block text-[11px] text-neutral-400",
				children: hint
			})
		]
	});
}
var inputCls = "w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-900 dark:border-white/15 dark:bg-neutral-800 dark:focus:border-white/40";
function TextInput(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		...props,
		className: inputCls
	});
}
function TextArea(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		...props,
		className: `${inputCls} min-h-[90px] font-mono text-xs`
	});
}
function Toggle({ checked, onChange, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "mb-3 flex items-center justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-semibold text-neutral-700 dark:text-neutral-300",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			role: "switch",
			"aria-checked": checked,
			onClick: () => onChange(!checked),
			className: `relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-emerald-500" : "bg-neutral-300 dark:bg-neutral-700"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${checked ? "translate-x-[22px]" : "translate-x-0.5"}` })
		})]
	});
}
function Stat({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-neutral-200 p-3 dark:border-white/10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `text-2xl font-black tabular-nums ${tone ?? ""}`,
			children: value
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-0.5 text-[11px] font-medium text-neutral-500",
			children: label
		})]
	});
}
function AdminModals() {
	const { activeModal, closeModal } = useAdmin();
	if (!activeModal) return null;
	const Body = REGISTRY[activeModal];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { onClose: closeModal });
}
function FomoModal({ onClose }) {
	const { config, update } = useSiteConfig();
	const f = config.fomo;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminModal, {
		title: "Thông Báo FOMO",
		subtitle: "Popup 'khách vừa đăng ký' kích thích tâm lý đám đông",
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
				checked: f.enabled,
				onChange: (v) => update((d) => d.fomo.enabled = v),
				label: "Bật thông báo FOMO"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Nguồn dữ liệu",
				hint: "Khuyến nghị dùng lead thật để tránh hiển thị thông tin gây hiểu nhầm.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: ["recentLeads", "sample"].map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => update((d) => d.fomo.source = source),
						className: `flex-1 rounded-lg border px-3 py-2 text-xs font-semibold ${f.source === source ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300"}`,
						children: source === "recentLeads" ? "Lead thật" : "Mẫu minh họa"
					}, source))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
				checked: f.respectReducedMotion,
				onChange: (v) => update((d) => d.fomo.respectReducedMotion = v),
				label: "Tắt chuyển động khi người dùng yêu cầu giảm motion"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Mẫu nội dung",
				hint: "Dùng {name}, {city}, {mins}",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: f.template,
					onChange: (e) => update((d) => d.fomo.template = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Danh sách tên khách (mỗi dòng 1 tên)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: f.names.join("\n"),
					onChange: (e) => update((d) => d.fomo.names = e.target.value.split("\n").filter(Boolean))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Danh sách tỉnh/thành (mỗi dòng 1 địa danh)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: f.cities.join("\n"),
					onChange: (e) => update((d) => d.fomo.cities = e.target.value.split("\n").filter(Boolean))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Trễ tối thiểu (s)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							type: "number",
							value: f.minDelaySec,
							onChange: (e) => update((d) => d.fomo.minDelaySec = +e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Trễ tối đa (s)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							type: "number",
							value: f.maxDelaySec,
							onChange: (e) => update((d) => d.fomo.maxDelaySec = +e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Hiển thị (s)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							type: "number",
							value: f.displaySec,
							onChange: (e) => update((d) => d.fomo.displaySec = +e.target.value)
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Vị trí",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: ["left", "right"].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => update((d) => d.fomo.position = p),
						className: `flex-1 rounded-lg border px-3 py-2 text-sm font-semibold ${f.position === p ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300"}`,
						children: p === "left" ? "Góc trái" : "Góc phải"
					}, p))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveHint, {})
		]
	});
}
function FormModal({ onClose }) {
	const { config, update } = useSiteConfig();
	const form = config.form;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminModal, {
		title: "Form & Webhook",
		subtitle: "Tùy chỉnh nội dung form và kết nối gửi lead",
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Tiêu đề form",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: form.headline,
					onChange: (e) => update((d) => d.form.headline = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Chữ trên nút CTA",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: form.ctaLabel,
					onChange: (e) => update((d) => d.form.ctaLabel = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Webhook URL (Make/Zapier)",
				hint: "Giữ nguyên URL đang chạy để không đứt kết nối",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: form.webhookUrl,
					onChange: (e) => update((d) => d.form.webhookUrl = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Redirect sau khi gửi (tùy chọn)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: form.redirectUrl,
					onChange: (e) => update((d) => d.form.redirectUrl = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Giới hạn số lần gửi",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						type: "number",
						value: form.rateLimitCount,
						onChange: (e) => update((d) => d.form.rateLimitCount = +e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Trong khoảng (phút)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						type: "number",
						value: form.rateLimitWindowMin,
						onChange: (e) => update((d) => d.form.rateLimitWindowMin = +e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs font-semibold text-neutral-700",
				children: "Nhãn & placeholder các trường"
			}),
			form.fields.map((field, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 grid grid-cols-2 gap-2 rounded-lg border border-neutral-200 p-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: field.label,
					onChange: (e) => update((d) => d.form.fields[i].label = e.target.value),
					placeholder: "Label"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: field.placeholder,
					onChange: (e) => update((d) => d.form.fields[i].placeholder = e.target.value),
					placeholder: "Placeholder"
				})]
			}, field.name)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[11px] text-neutral-400",
				children: "Dropdown 63 tỉnh/thành (phân theo Miền) và danh sách ngành được giữ nguyên trong form."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveHint, {})
		]
	});
}
function ThemeModal({ onClose }) {
	const { config, update } = useSiteConfig();
	const t = config.theme;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminModal, {
		title: "Style & Theme",
		subtitle: "Màu sắc & font hiển thị",
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Màu chính (primary)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "color",
							value: t.primary,
							onChange: (e) => update((d) => d.theme.primary = e.target.value),
							className: "h-9 w-12 rounded border border-neutral-300"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							value: t.primary,
							onChange: (e) => update((d) => d.theme.primary = e.target.value)
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Màu nhấn (gold)",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "color",
							value: t.gold,
							onChange: (e) => update((d) => d.theme.gold = e.target.value),
							className: "h-9 w-12 rounded border border-neutral-300"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							value: t.gold,
							onChange: (e) => update((d) => d.theme.gold = e.target.value)
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Font tiêu đề",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: t.fontHeading,
					onChange: (e) => update((d) => d.theme.fontHeading = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Font nội dung",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: t.fontBody,
					onChange: (e) => update((d) => d.theme.fontBody = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveHint, {})
		]
	});
}
function CountdownModal({ onClose }) {
	const { config, update } = useSiteConfig();
	const c = config.countdown;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminModal, {
		title: "Đồng Hồ Đếm Ngược",
		subtitle: "Tạo cảm giác khan hiếm & khẩn cấp",
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
				checked: c.enabled,
				onChange: (v) => update((d) => d.countdown.enabled = v),
				label: "Bật countdown"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Số suất còn lại",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					type: "number",
					value: c.slotsLeft,
					onChange: (e) => update((d) => d.countdown.slotsLeft = +e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Dòng chữ mô tả",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: c.headline,
					onChange: (e) => update((d) => d.countdown.headline = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Mốc kết thúc",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: ["endOfMonth", "fixed"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => update((d) => d.countdown.endMode = m),
						className: `flex-1 rounded-lg border px-3 py-2 text-sm font-semibold ${c.endMode === m ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300"}`,
						children: m === "endOfMonth" ? "Cuối tháng" : "Ngày cố định"
					}, m))
				})
			}),
			c.endMode === "fixed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Ngày kết thúc",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					type: "datetime-local",
					value: c.endDate,
					onChange: (e) => update((d) => d.countdown.endDate = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveHint, {})
		]
	});
}
function ContactModal({ onClose }) {
	const { config, update } = useSiteConfig();
	const c = config.floatingContact;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminModal, {
		title: "Hotline & Zalo",
		subtitle: "Nút liên hệ nổi + thanh CTA mobile",
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
				checked: c.enabled,
				onChange: (v) => update((d) => d.floatingContact.enabled = v),
				label: "Bật nút liên hệ nổi"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Số hotline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: c.hotline,
					onChange: (e) => update((d) => d.floatingContact.hotline = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Link Zalo",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: c.zalo,
					onChange: (e) => update((d) => d.floatingContact.zalo = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Link Messenger (tùy chọn)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: c.messenger,
					onChange: (e) => update((d) => d.floatingContact.messenger = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveHint, {})
		]
	});
}
function PixelModal({ onClose }) {
	const { config, update } = useSiteConfig();
	const t = config.tracking;
	const [logs, setLogs] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminModal, {
		title: "Pixel & Sự Kiện Ads",
		subtitle: "Facebook, TikTok, GA4, GTM",
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Facebook Pixel ID",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: t.facebookPixelId,
					onChange: (e) => update((d) => d.tracking.facebookPixelId = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "TikTok Pixel ID",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: t.tiktokPixelId,
					onChange: (e) => update((d) => d.tracking.tiktokPixelId = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "GA4 Measurement ID",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: t.ga4Id,
					onChange: (e) => update((d) => d.tracking.ga4Id = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Google Tag Manager ID",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: t.gtmId,
					onChange: (e) => update((d) => d.tracking.gtmId = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs font-semibold text-neutral-700",
				children: "Bật/tắt sự kiện chuyển đổi"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
				checked: t.events.pageView,
				onChange: (v) => update((d) => d.tracking.events.pageView = v),
				label: "PageView"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
				checked: t.events.formStart,
				onChange: (v) => update((d) => d.tracking.events.formStart = v),
				label: "Form Start"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
				checked: t.events.lead,
				onChange: (v) => update((d) => d.tracking.events.lead = v),
				label: "Lead"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
				checked: t.events.completeRegistration,
				onChange: (v) => update((d) => d.tracking.events.completeRegistration = v),
				label: "CompleteRegistration"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-xl border border-neutral-200 p-3 dark:border-white/10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setLogs(fireTestEvent()),
						className: "w-full rounded-lg bg-neutral-900 py-2.5 text-sm font-bold text-white dark:bg-white dark:text-neutral-900",
						children: "Kiểm tra / Bắn sự kiện thử"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-[11px] text-neutral-400",
						children: "Lưu cấu hình và tải lại trang trước khi kiểm tra để mã pixel được chèn."
					}),
					logs && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-1.5",
						children: logs.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-start gap-2 text-[11px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: l.ok ? "text-emerald-500" : "text-red-500",
								children: l.ok ? "●" : "○"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: l.channel }),
								" — ",
								l.detail
							] })]
						}, l.channel))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveHint, {})
		]
	});
}
function WebmasterModal({ onClose }) {
	const { config, update } = useSiteConfig();
	const t = config.tracking;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminModal, {
		title: "Webmaster & Custom Scripts",
		subtitle: "Xác minh Google + chèn mã tùy chỉnh",
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Google Search Console verification",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: t.googleVerification,
					onChange: (e) => update((d) => d.tracking.googleVerification = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Custom Script — Head",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: t.customHead,
					onChange: (e) => update((d) => d.tracking.customHead = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Custom Script — Body",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: t.customBody,
					onChange: (e) => update((d) => d.tracking.customBody = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Custom Script — Footer",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: t.customFooter,
					onChange: (e) => update((d) => d.tracking.customFooter = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveHint, {})
		]
	});
}
function SeoModal({ onClose }) {
	const { config, update } = useSiteConfig();
	const s = config.seo;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminModal, {
		title: "SEO Google",
		subtitle: "Meta tags & schema",
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Meta Title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: s.title,
					onChange: (e) => update((d) => d.seo.title = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Meta Description",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: s.description,
					onChange: (e) => update((d) => d.seo.description = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Keywords",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: s.keywords,
					onChange: (e) => update((d) => d.seo.keywords = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "OG Image URL",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: s.ogImage,
					onChange: (e) => update((d) => d.seo.ogImage = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Schema Type",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: s.schemaType,
					onChange: (e) => update((d) => d.seo.schemaType = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveHint, {})
		]
	});
}
function AiModal({ onClose }) {
	const { config, update } = useSiteConfig();
	const a = config.aiAdvisor;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminModal, {
		title: "AI Sales Advisor",
		subtitle: "Ma trận chấm điểm & phân hạng lead",
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
				checked: a.enabled,
				onChange: (v) => update((d) => d.aiAdvisor.enabled = v),
				label: "Bật gợi ý AI Sales"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Regex nhận diện thiết bị VIP",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: a.vipDeviceRegex,
					onChange: (e) => update((d) => d.aiAdvisor.vipDeviceRegex = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Tỉnh trọng điểm (phân tách bằng |)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: a.keyRegions,
					onChange: (e) => update((d) => d.aiAdvisor.keyRegions = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Điền nhanh (<s) = bot",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							type: "number",
							value: a.fastFillThresholdSec,
							onChange: (e) => update((d) => d.aiAdvisor.fastFillThresholdSec = +e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "VIP: xem web (s)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							type: "number",
							value: a.vipTimeOnPageSec,
							onChange: (e) => update((d) => d.aiAdvisor.vipTimeOnPageSec = +e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "VIP: cuộn (%)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							type: "number",
							value: a.vipScrollPercent,
							onChange: (e) => update((d) => d.aiAdvisor.vipScrollPercent = +e.target.value)
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveHint, {})
		]
	});
}
function EmailModal({ onClose }) {
	const { config, update } = useSiteConfig();
	const e = config.emailAutomation;
	const [testState, setTestState] = (0, import_react.useState)("idle");
	const [testMessage, setTestMessage] = (0, import_react.useState)("");
	const [testTo, setTestTo] = (0, import_react.useState)("");
	const validFrom = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.fromEmail);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminModal, {
		title: "Tự Động Hóa Email",
		subtitle: "Gửi email cảm ơn ngay khi có lead",
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
				checked: e.enabled,
				onChange: (v) => update((d) => d.emailAutomation.enabled = v),
				label: "Bật auto email"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Nhà cung cấp",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: ["resend", "gmail"].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => update((d) => d.emailAutomation.provider = p),
						className: `flex-1 rounded-lg border px-3 py-2 text-sm font-semibold uppercase ${e.provider === p ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300"}`,
						children: p === "gmail" ? "Gmail OAuth2" : "Resend"
					}, p))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Email gửi đi (From)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: e.fromEmail,
					onChange: (ev) => update((d) => d.emailAutomation.fromEmail = ev.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `mb-3 text-xs ${validFrom ? "text-emerald-600" : "text-amber-600"}`,
				children: validFrom ? "Địa chỉ From hợp lệ." : "Cần nhập email From hợp lệ."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Email nhận test",
				hint: "Chỉ dùng để gửi email kiểm tra, không lưu secret.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					type: "email",
					value: testTo,
					onChange: (event) => setTestTo(event.target.value),
					placeholder: "ban@example.com"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Tiêu đề",
				hint: "Dùng {name} {phone} {city} {ai_score}",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: e.subject,
					onChange: (ev) => update((d) => d.emailAutomation.subject = ev.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Nội dung",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: e.body,
					onChange: (ev) => update((d) => d.emailAutomation.body = ev.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 rounded-lg bg-sky-50 px-3 py-2 text-[11px] leading-relaxed text-sky-800",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Resend:" }),
					" tạo API key tại resend.com/api-keys, xác thực domain rồi đặt ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "RESEND_API_KEY" }),
					" trên server.",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Gmail:" }),
					" tạo OAuth Client trong Google Cloud, bật Gmail API và lấy refresh token; đặt ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "GMAIL_CLIENT_ID" }),
					", ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "GMAIL_CLIENT_SECRET" }),
					", ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "GMAIL_REFRESH_TOKEN" }),
					" trên server. Runtime Cloudflare dùng Gmail API OAuth2, không dùng SMTP TCP trực tiếp."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: !validFrom || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(testTo) || testState === "testing",
				onClick: () => {
					setTestState("testing");
					checkEmailConfig().then((result) => {
						if (!(e.provider === "gmail" ? result.gmailConfigured : result.resendConfigured)) throw new Error(e.provider === "gmail" ? "Thiếu GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET hoặc GMAIL_REFRESH_TOKEN." : "Thiếu RESEND_API_KEY.");
						return sendTestEmail({ data: {
							provider: e.provider,
							to: testTo,
							from: e.fromEmail,
							subject: "Email test từ Funnel Builder",
							text: "Đây là email kiểm tra cấu hình tự động hóa email."
						} });
					}).then((result) => {
						setTestState(result.sent ? "ok" : "error");
						setTestMessage(result.sent ? "Đã gửi email test thành công." : `Gửi email test thất bại: ${result.reason}`);
					}).catch((error) => {
						setTestState("error");
						setTestMessage(error instanceof Error ? error.message : "Không gọi được email server.");
					});
				},
				className: "w-full rounded-lg border border-neutral-300 py-2.5 text-xs font-bold disabled:opacity-40",
				children: testState === "testing" ? "Đang kiểm tra..." : "Kiểm tra cấu hình email"
			}),
			testState !== "idle" && testState !== "testing" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `mt-2 text-xs font-semibold ${testState === "ok" ? "text-emerald-600" : "text-red-600"}`,
				children: testMessage
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveHint, {})
		]
	});
}
function WebhookModal({ onClose }) {
	const { config, update } = useSiteConfig();
	const list = config.webhooks;
	const [testingId, setTestingId] = (0, import_react.useState)(null);
	const [results, setResults] = (0, import_react.useState)({});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminModal, {
		title: "Cổng Webhook & Đa Kênh",
		subtitle: "Gửi lead tới nhiều nơi cùng lúc",
		onClose,
		children: [
			list.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-xs text-neutral-400",
				children: "Chưa có endpoint nào. Thêm mới bên dưới."
			}),
			list.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 rounded-lg border border-neutral-200 p-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								value: w.label,
								placeholder: "Tên",
								onChange: (e) => update((d) => d.webhooks[i].label = e.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: w.type,
								onChange: (e) => update((d) => d.webhooks[i].type = e.target.value),
								className: "rounded-lg border border-neutral-300 px-2 py-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "make",
										children: "Make/Zapier"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "telegram",
										children: "Telegram"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "sheets",
										children: "Google Sheets"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "supabase",
										children: "Supabase"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "custom",
										children: "Custom"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => update((d) => d.webhooks.splice(i, 1)),
								className: "rounded-md p-2 text-red-500 hover:bg-red-50",
								"aria-label": "Xóa",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: w.url,
						placeholder: "https://...",
						onChange: (e) => update((d) => d.webhooks[i].url = e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
							checked: w.enabled,
							onChange: (v) => update((d) => d.webhooks[i].enabled = v),
							label: "Kích hoạt"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: !w.url.trim() || testingId === w.id,
						onClick: () => {
							setTestingId(w.id);
							testWebhookEndpoint(w, config).then((result) => setResults((current) => ({
								...current,
								[w.id]: result
							}))).finally(() => setTestingId(null));
						},
						className: "mt-2 w-full rounded-lg border border-neutral-300 py-2 text-xs font-bold disabled:opacity-40",
						children: testingId === w.id ? "Đang gửi test..." : "Gửi test endpoint"
					}),
					results[w.id] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `mt-1 text-[11px] font-semibold ${results[w.id].ok ? "text-emerald-600" : "text-red-600"}`,
						children: results[w.id].ok ? `OK sau ${results[w.id].attempts} lần thử` : `Lỗi: ${results[w.id].detail}`
					})
				]
			}, w.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: () => update((d) => d.webhooks.push({
					id: `wh_${Date.now()}`,
					label: "Endpoint mới",
					url: "",
					enabled: true,
					type: "make"
				})),
				className: "flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-neutral-300 py-2.5 text-sm font-semibold text-neutral-600",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4" }), " Thêm Webhook"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveHint, {})
		]
	});
}
function AnalyticsModal({ onClose }) {
	const [a, setA] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const refresh = () => setA(loadAnalytics());
		refresh();
		window.addEventListener(ANALYTICS_UPDATED_EVENT, refresh);
		return () => window.removeEventListener(ANALYTICS_UPDATED_EVENT, refresh);
	}, []);
	const cr = a && a.visits > 0 ? (a.leads / a.visits * 100).toFixed(1) : "0.0";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminModal, {
		title: "Thống Kê & Analytics",
		subtitle: "Số liệu thời gian thực (local)",
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						if (window.confirm("Xóa toàn bộ số liệu Analytics trên thiết bị này?")) clearAnalytics();
					},
					className: "rounded-lg border border-red-200 px-3 py-1.5 text-[11px] font-bold text-red-600",
					children: "Xóa số liệu test"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Lượt truy cập",
						value: a?.visits ?? 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Lượt đăng ký",
						value: a?.leads ?? 0,
						tone: "text-emerald-600"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Tỷ lệ CR",
						value: `${cr}%`,
						tone: "text-red-600"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 mt-4 text-xs font-semibold text-neutral-700",
				children: "Nguồn traffic (UTM)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-1",
				children: a && Object.keys(a.bySourceStats).length > 0 ? Object.entries(a.bySourceStats).map(([s, stats]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between rounded-lg bg-neutral-100 px-3 py-1.5 text-xs dark:bg-white/5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: s
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums",
						children: [
							stats.visits,
							" visits · ",
							stats.leads,
							" leads · ",
							stats.visits ? (stats.leads / stats.visits * 100).toFixed(1) : "0.0",
							"% CR"
						]
					})]
				}, s)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-neutral-400",
					children: "Chưa có dữ liệu."
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 mt-4 text-xs font-semibold text-neutral-700",
				children: "So sánh A/B"
			}),
			a && Object.keys(a.byVariant).length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2",
				children: Object.entries(a.byVariant).map(([v, s]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-neutral-200 p-2 text-xs dark:border-white/10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-bold",
							children: v
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Visits: ", s.visits] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Leads: ", s.leads] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							"CR: ",
							s.visits ? (s.leads / s.visits * 100).toFixed(1) : "0",
							"%"
						] })
					]
				}, v))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-neutral-400",
				children: "A/B chưa có dữ liệu. Hãy bật A/B Testing, lưu cấu hình, mở landing ở tab mới rồi tải lại Analytics."
			})
		]
	});
}
function LeadsModal({ onClose }) {
	const { config } = useSiteConfig();
	const [leads, setLeads] = (0, import_react.useState)([]);
	const [q, setQ] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => setLeads(loadLeads()), []);
	const cloud = config.admin.storageMode === "database" && !!config.admin.supabaseUrl;
	const key = q.trim().toLowerCase();
	const filtered = key ? leads.filter((l) => [
		l.name,
		l.phone,
		l.city,
		l.major,
		l.utmSource
	].some((v) => (v || "").toLowerCase().includes(key))) : leads;
	const addTestLead = async () => {
		const n = leads.length + 1;
		await saveLead({
			id: `ld_test_${Date.now()}`,
			at: (/* @__PURE__ */ new Date()).toISOString(),
			name: `Lead thử nghiệm ${n}`,
			phone: `09${String(Date.now()).slice(-8)}`,
			city: "Hà Nội",
			major: "Công nghệ ô tô điện",
			aiScore: 72,
			aiRank: "WARM",
			utmSource: "test"
		}, config);
		setLeads(loadLeads());
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminModal, {
		title: "Quản Lý Lead (Mini-CRM)",
		subtitle: `${leads.length} lead đã ghi nhận`,
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${cloud ? "bg-sky-100 text-sky-700" : "bg-neutral-200 text-neutral-700"}`,
						children: cloud ? "Supabase Cloud" : "LocalStorage"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => exportLeadsCsv(filtered),
						disabled: filtered.length === 0,
						className: "flex items-center gap-1.5 rounded-lg bg-neutral-900 px-3 py-2 text-xs font-bold text-white disabled:opacity-40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-3.5 w-3.5" }), " Xuất CSV/Excel"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: addTestLead,
						className: "rounded-lg border border-neutral-300 px-3 py-2 text-xs font-bold text-neutral-700",
						children: "+ Lead thử"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							if (window.confirm("Xoá toàn bộ lead đã lưu trên máy này?")) {
								clearLeads();
								setLeads([]);
							}
						},
						disabled: leads.length === 0,
						className: "ml-auto rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600 disabled:opacity-40",
						children: "Xoá tất cả"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Tìm theo tên, SĐT, tỉnh, ngành..."
			}),
			filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-neutral-400",
				children: leads.length === 0 ? "Chưa có lead nào. Lead sẽ xuất hiện tại đây sau khi khách gửi form." : "Không tìm thấy lead phù hợp."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 overflow-x-auto rounded-xl border border-neutral-200 dark:border-white/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[560px] text-left text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-neutral-100 text-[10px] uppercase tracking-wide text-neutral-500 dark:bg-white/5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2",
								children: "Họ tên"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2",
								children: "Điện thoại"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2",
								children: "Tỉnh/Thành"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2",
								children: "Ngành"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2",
								children: "Thời gian"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2",
								children: "Nguồn"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-3 py-2",
								children: "Lưu tại"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: filtered.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-neutral-200 dark:border-white/10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
								className: "px-3 py-2 font-semibold",
								children: [l.name, l.aiRank && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1.5 rounded bg-amber-100 px-1.5 text-[10px] font-bold text-amber-700",
									children: l.aiRank
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2 tabular-nums",
								children: l.phone
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2",
								children: l.city || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2",
								children: l.major || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2 text-neutral-500",
								children: new Date(l.at).toLocaleString("vi-VN")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2 text-neutral-500",
								children: l.utmSource || "direct"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-3 py-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `rounded-full px-2 py-0.5 text-[10px] font-bold ${l.storage === "database" ? "bg-sky-100 text-sky-700" : "bg-neutral-200 text-neutral-700"}`,
									children: l.storage === "database" ? "Cloud" : "Local"
								})
							})
						]
					}, l.id)) })]
				})
			})
		]
	});
}
function StorageModal({ onClose }) {
	const { config, update } = useSiteConfig();
	const a = config.admin;
	const [testing, setTesting] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminModal, {
		title: "Storage Mode",
		subtitle: "Local (mặc định) hoặc Supabase Cloud",
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Chế độ lưu trữ",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: ["local", "database"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => update((d) => d.admin.storageMode = m),
						className: `flex-1 rounded-lg border px-3 py-2 text-sm font-semibold ${a.storageMode === m ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300"}`,
						children: m === "local" ? "Local (localStorage)" : "Database (Supabase)"
					}, m))
				})
			}),
			a.storageMode === "database" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Supabase URL",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: a.supabaseUrl,
						onChange: (e) => update((d) => d.admin.supabaseUrl = e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Supabase Anon Key",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: a.supabaseAnonKey,
						onChange: (e) => update((d) => d.admin.supabaseAnonKey = e.target.value)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: async () => {
						setTesting(null);
						setTesting(await testSupabaseConnection(a.supabaseUrl, a.supabaseAnonKey));
					},
					className: "mb-3 rounded-lg bg-neutral-900 px-3 py-2 text-xs font-bold text-white",
					children: "Kiểm tra kết nối"
				}),
				testing !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: `text-xs font-semibold ${testing ? "text-emerald-600" : "text-red-600"}`,
					children: testing ? "Kết nối thành công." : "Không kết nối được. Kiểm tra lại URL/Key."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveHint, {})
		]
	});
}
function AdminLinkModal({ onClose }) {
	const { config, update, save } = useSiteConfig();
	const a = config.admin;
	const [confirm, setConfirm] = (0, import_react.useState)(a.password);
	const [msg, setMsg] = (0, import_react.useState)(null);
	const path = a.adminPath.trim().replace(/^\/+|\/+$/g, "");
	function handleSave() {
		if (!/^[a-z0-9-]{3,40}$/i.test(path)) {
			setMsg({
				ok: false,
				text: "Đường dẫn chỉ gồm chữ, số và dấu gạch ngang (3-40 ký tự)."
			});
			return;
		}
		if (a.password.length < 4) {
			setMsg({
				ok: false,
				text: "Mật khẩu cần tối thiểu 4 ký tự."
			});
			return;
		}
		if (a.password !== confirm) {
			setMsg({
				ok: false,
				text: "Hai ô mật khẩu chưa khớp nhau."
			});
			return;
		}
		update((d) => d.admin.adminPath = path);
		save();
		setMsg({
			ok: true,
			text: `Đã lưu. Đăng nhập tại /${path} với mật khẩu mới.`
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminModal, {
		title: "Đổi Link & Mật Khẩu Admin",
		subtitle: "Bảo mật trang quản trị",
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Đường dẫn admin",
				hint: `Truy cập tại /${path || "..."}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: a.adminPath,
					onChange: (e) => {
						setMsg(null);
						update((d) => d.admin.adminPath = e.target.value);
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Mật khẩu quản trị",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					type: "text",
					value: a.password,
					onChange: (e) => {
						setMsg(null);
						update((d) => d.admin.password = e.target.value);
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Nhập lại mật khẩu",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					type: "text",
					value: confirm,
					onChange: (e) => {
						setMsg(null);
						setConfirm(e.target.value);
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleSave,
					className: "flex-1 rounded-lg bg-emerald-500 py-2.5 text-sm font-bold text-white",
					children: "LƯU & ÁP DỤNG"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => window.open(`/${path}`, "_blank", "noopener"),
					className: "flex-1 rounded-lg border border-neutral-300 py-2.5 text-sm font-bold dark:border-white/20",
					children: "Kiểm tra link"
				})]
			}),
			msg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: `mt-3 text-xs font-semibold ${msg.ok ? "text-emerald-600" : "text-red-500"}`,
				children: msg.text
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-[11px] text-neutral-400",
				children: "Lưu ý: đây là mật khẩu phía client cho tiện chỉnh sửa nhanh. Với dữ liệu nhạy cảm hãy dùng Supabase Row Level Security."
			})
		]
	});
}
function AbTestModal({ onClose }) {
	const { config, update } = useSiteConfig();
	const ab = config.abTest;
	const currentVariant = getVariant(ab.enabled, ab.split);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminModal, {
		title: "A/B Split Testing",
		subtitle: "Phân phối traffic giữa 2 biến thể",
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
				checked: ab.enabled,
				onChange: (v) => update((d) => d.abTest.enabled = v),
				label: "Bật A/B testing"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: `% traffic vào Variant B: ${ab.split}%`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "range",
					min: 0,
					max: 100,
					value: ab.split,
					onChange: (e) => update((d) => d.abTest.split = +e.target.value),
					className: "w-full"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 rounded-lg bg-neutral-100 px-3 py-2 text-xs dark:bg-white/5",
				children: [
					"Thiết bị này đang ở ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["Variant ", ab.enabled ? currentVariant : "A (A/B đang tắt)"] }),
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Nhãn Variant A",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: ab.variantALabel,
						onChange: (e) => update((d) => d.abTest.variantALabel = e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Nhãn Variant B",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: ab.variantBLabel,
						onChange: (e) => update((d) => d.abTest.variantBLabel = e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Headline Variant A",
				hint: "Để trống để dùng headline gốc",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: ab.variantAHeadline,
					onChange: (e) => update((d) => d.abTest.variantAHeadline = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Headline Variant B",
				hint: "Để trống để dùng headline gốc",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: ab.variantBHeadline,
					onChange: (e) => update((d) => d.abTest.variantBHeadline = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "CTA Variant A",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: ab.variantACta,
						onChange: (e) => update((d) => d.abTest.variantACta = e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "CTA Variant B",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: ab.variantBCta,
						onChange: (e) => update((d) => d.abTest.variantBCta = e.target.value)
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => {
					resetVariant(ab.split);
					window.sessionStorage.removeItem(`funnel_visit_counted_v2_ab_${ab.split}`);
					window.alert("Đã reset phân bổ A/B trên thiết bị này. Mở lại landing để được chia lại nhóm.");
				},
				className: "mt-2 w-full rounded-lg border border-amber-300 px-3 py-2 text-xs font-bold text-amber-700",
				children: "Reset phân bổ A/B trên thiết bị này"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveHint, {})
		]
	});
}
function CronModal({ onClose }) {
	const { config, update } = useSiteConfig();
	const a = config.admin;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminModal, {
		title: "Cloud Cron & Backup",
		subtitle: "Gửi backup .json định kỳ qua email",
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Email nhận backup",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: a.backupEmail,
					onChange: (e) => update((d) => d.admin.backupEmail = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Lịch chạy",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: [
						"off",
						"daily",
						"weekly"
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => update((d) => d.admin.cronSchedule = s),
						className: `flex-1 rounded-lg border px-3 py-2 text-sm font-semibold ${a.cronSchedule === s ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300"}`,
						children: s === "off" ? "Tắt" : s === "daily" ? "Hàng ngày" : "Hàng tuần"
					}, s))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-neutral-400",
				children: "Cron chạy phía Supabase Edge Function / cron-job.org khi ở Database Mode. Ở Local Mode, mỗi lần LƯU sẽ tạo snapshot backup tự động (giữ 10 bản gần nhất)."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveHint, {})
		]
	});
}
function InfoModal({ onClose, title, subtitle, points }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminModal, {
		title,
		subtitle,
		onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-2",
			children: points.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex gap-2 rounded-lg bg-neutral-100 px-3 py-2 text-xs text-neutral-700 dark:bg-white/5 dark:text-neutral-200",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-emerald-500",
					children: "✓"
				}), p]
			}, p))
		})
	});
}
function LandingEditorModal({ onClose }) {
	const { config, update, save, resetLanding } = useSiteConfig();
	const content = config.landing;
	const importRef = (0, import_react.useRef)(null);
	const logoInputRef = (0, import_react.useRef)(null);
	const [logoError, setLogoError] = (0, import_react.useState)("");
	const [templateType, setTemplateType] = (0, import_react.useState)("promo");
	const updateLines = (key, value) => update((draft) => {
		draft.landing[key] = value.split("\n").map((line) => line.trim()).filter(Boolean);
	});
	const updateJson = (key, value) => {
		try {
			const parsed = JSON.parse(value);
			update((draft) => {
				draft.landing[key] = parsed;
			});
		} catch {}
	};
	function exportLanding() {
		const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const anchor = document.createElement("a");
		anchor.href = url;
		anchor.download = "landing-page-config.json";
		anchor.click();
		URL.revokeObjectURL(url);
	}
	function importLanding(file) {
		const reader = new FileReader();
		reader.onload = () => {
			try {
				const imported = JSON.parse(String(reader.result));
				const hasString = (value) => typeof value === "string";
				const hasStringArray = (value) => Array.isArray(value) && value.every(hasString);
				const hasObjectArray = (value) => Array.isArray(value) && value.every((item) => item !== null && typeof item === "object");
				if (!imported || typeof imported !== "object" || !hasString(imported.brandName) || !hasString(imported.heroTitle) || !hasStringArray(imported.heroTrustItems) || !hasObjectArray(imported.sectionsArray) || !hasObjectArray(imported.stats) || !hasObjectArray(imported.benefits) || !hasObjectArray(imported.faqs)) throw new Error("invalid landing config");
				update((draft) => {
					draft.landing = {
						...structuredClone(draft.landing),
						...imported
					};
				});
			} catch {
				window.alert("File landing config không hợp lệ.");
			}
		};
		reader.readAsText(file);
	}
	function uploadLogo(file) {
		setLogoError("");
		if (!/^image\/(png|jpeg|webp|svg\+xml)$/.test(file.type)) {
			setLogoError("Logo cần là PNG, JPG, WebP hoặc SVG.");
			return;
		}
		if (file.size > 2097152) {
			setLogoError("Logo không được vượt quá 2MB.");
			return;
		}
		const reader = new FileReader();
		reader.onload = () => {
			if (typeof reader.result !== "string") return;
			update((draft) => {
				draft.landing.logoUrl = reader.result;
				draft.landing.showLogo = true;
			});
		};
		reader.onerror = () => setLogoError("Không thể đọc file logo.");
		reader.readAsDataURL(file);
	}
	function updateSections(nextSections) {
		update((draft) => {
			draft.landing.sectionsArray = nextSections.map((section, order) => ({
				...section,
				order
			}));
		});
	}
	function moveSection(index, direction) {
		const next = [...content.sectionsArray];
		const target = index + direction;
		if (target < 0 || target >= next.length) return;
		[next[index], next[target]] = [next[target], next[index]];
		updateSections(next);
	}
	function duplicateSection(index) {
		const source = content.sectionsArray[index];
		if (!source) return;
		const copy = {
			id: `custom-${crypto.randomUUID?.() || Date.now()}`,
			type: "custom",
			label: `${source.label} (bản sao)`,
			enabled: true,
			order: index + 1,
			content: {
				heading: source.label,
				body: `Nội dung bản sao của section ${source.label}. Chỉnh sửa nội dung tại đây.`,
				imageUrl: "",
				buttonLabel: "",
				buttonHref: "#dang-ky",
				backgroundColor: "",
				textColor: "",
				accentColor: ""
			}
		};
		updateSections([
			...content.sectionsArray.slice(0, index + 1),
			copy,
			...content.sectionsArray.slice(index + 1)
		]);
	}
	function addSection() {
		const missing = DEFAULT_CONFIG.landing.sectionsArray.find((defaultSection) => !content.sectionsArray.some((section) => section.id === defaultSection.id));
		if (missing) {
			updateSections([...content.sectionsArray, structuredClone(missing)]);
			return;
		}
		const templates = {
			promo: {
				label: "Khối quảng bá",
				heading: "Tiêu đề khối quảng bá",
				body: "Mô tả ngắn cho ưu đãi hoặc chương trình.",
				buttonLabel: "Tìm hiểu thêm"
			},
			pricing: {
				label: "Bảng quyền lợi",
				heading: "Quyền lợi chương trình",
				body: "Liệt kê học phí, học bổng và các quyền lợi nổi bật.",
				buttonLabel: "Nhận tư vấn"
			},
			guarantee: {
				label: "Cam kết",
				heading: "Cam kết đồng hành",
				body: "Nội dung cam kết, điều kiện và thông tin minh bạch.",
				buttonLabel: "Xem chi tiết"
			},
			cta: {
				label: "CTA",
				heading: "Sẵn sàng bắt đầu?",
				body: "Để lại thông tin để nhận tư vấn phù hợp.",
				buttonLabel: "Đăng ký ngay"
			}
		};
		const template = templates[templateType] ?? templates["promo"];
		updateSections([...content.sectionsArray, {
			id: `custom-${Date.now()}`,
			type: "custom",
			label: template.label,
			enabled: true,
			order: content.sectionsArray.length,
			content: {
				heading: template.heading,
				body: template.body,
				imageUrl: "",
				buttonLabel: template.buttonLabel,
				buttonHref: "#dang-ky",
				backgroundColor: "",
				textColor: "",
				accentColor: ""
			}
		}]);
	}
	function updateSectionContent(id, patch) {
		update((draft) => {
			const section = draft.landing.sectionsArray.find((item) => item.id === id);
			if (!section) return;
			section.content = {
				heading: section.label,
				body: "",
				imageUrl: "",
				buttonLabel: "",
				buttonHref: "#dang-ky",
				backgroundColor: "",
				textColor: "",
				accentColor: "",
				...section.content,
				...patch
			};
			if (patch.heading) section.label = patch.heading;
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminModal, {
		title: "Sửa Giao Diện",
		subtitle: "Nội dung và hình ảnh landing page được lưu vào cấu hình",
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: exportLanding,
						className: "rounded-lg bg-neutral-900 px-2 py-2 text-xs font-bold text-white",
						children: "Xuất JSON"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => importRef.current?.click(),
						className: "rounded-lg border border-neutral-300 px-2 py-2 text-xs font-bold",
						children: "Nhập JSON"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							if (window.confirm("Khôi phục landing mặc định?")) resetLanding();
						},
						className: "rounded-lg border border-amber-300 px-2 py-2 text-xs font-bold text-amber-700",
						children: "Khôi phục"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => save(),
						className: "rounded-lg bg-emerald-600 px-2 py-2 text-xs font-bold text-white",
						children: "Lưu ngay"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: importRef,
						type: "file",
						accept: "application/json,.json",
						className: "hidden",
						onChange: (e) => {
							const file = e.target.files?.[0];
							if (file) importLanding(file);
							e.target.value = "";
						}
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 rounded-xl border border-neutral-200 p-3 dark:border-white/10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs font-bold",
						children: "Thứ tự & trạng thái section"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-1.5",
						children: content.sectionsArray.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 rounded-lg bg-neutral-50 p-1.5 text-xs dark:bg-white/5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "min-w-0 flex-1 truncate",
									children: item.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => updateSections(content.sectionsArray.map((section) => section.id === item.id ? {
										...section,
										enabled: !section.enabled
									} : section)),
									className: `rounded px-2 py-1 ${item.enabled ? "bg-emerald-100 text-emerald-700" : "bg-neutral-200 text-neutral-500"}`,
									children: item.enabled ? "Bật" : "Tắt"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => moveSection(index, -1),
									disabled: index === 0,
									className: "rounded border px-2 py-1 disabled:opacity-30",
									"aria-label": "Đưa lên",
									children: "↑"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => moveSection(index, 1),
									disabled: index === content.sectionsArray.length - 1,
									className: "rounded border px-2 py-1 disabled:opacity-30",
									"aria-label": "Đưa xuống",
									children: "↓"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => duplicateSection(index),
									className: "rounded border px-2 py-1",
									"aria-label": "Nhân bản",
									children: "+"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => updateSections(content.sectionsArray.filter((section) => section.id !== item.id)),
									className: "rounded border border-red-200 px-2 py-1 text-red-600",
									"aria-label": "Xóa",
									children: "×"
								})
							]
						}, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 grid grid-cols-[1fr_auto] gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: templateType,
							onChange: (event) => setTemplateType(event.target.value),
							className: "rounded-lg border border-neutral-300 bg-white px-2 py-2 text-xs dark:bg-neutral-800",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "promo",
									children: "Khối quảng bá"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "pricing",
									children: "Pricing / Quyền lợi"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "guarantee",
									children: "Guarantee / Cam kết"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "cta",
									children: "CTA"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: addSection,
							className: "rounded-lg bg-neutral-900 px-3 py-2 text-xs font-semibold text-white",
							children: "+ Thêm"
						})]
					})
				]
			}),
			content.sectionsArray.filter((item) => item.type === "custom").map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 rounded-xl border border-neutral-200 p-3 dark:border-white/10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs font-bold",
						children: item.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Tiêu đề",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							value: item.content?.heading || "",
							onChange: (e) => updateSectionContent(item.id, { heading: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Nội dung",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
							value: item.content?.body || "",
							onChange: (e) => updateSectionContent(item.id, { body: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "URL hình ảnh",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							type: "url",
							value: item.content?.imageUrl || "",
							onChange: (e) => updateSectionContent(item.id, { imageUrl: e.target.value })
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Nhãn nút",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								value: item.content?.buttonLabel || "",
								onChange: (e) => updateSectionContent(item.id, { buttonLabel: e.target.value })
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Link nút",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
								value: item.content?.buttonHref || "#dang-ky",
								onChange: (e) => updateSectionContent(item.id, { buttonHref: e.target.value })
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Nền",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									type: "color",
									value: item.content?.backgroundColor || "#ffffff",
									onChange: (e) => updateSectionContent(item.id, { backgroundColor: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Màu chữ",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									type: "color",
									value: item.content?.textColor || "#171717",
									onChange: (e) => updateSectionContent(item.id, { textColor: e.target.value })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Màu tiêu đề",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
									type: "color",
									value: item.content?.accentColor || "#c0392b",
									onChange: (e) => updateSectionContent(item.id, { accentColor: e.target.value })
								})
							})
						]
					})
				]
			}, item.id)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Tên thương hiệu",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: content.brandName,
					onChange: (e) => update((d) => d.landing.brandName = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 rounded-xl border border-neutral-200 p-3 dark:border-white/10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold",
							children: "Logo trên header"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-[11px] text-neutral-400",
							children: "Tự co giãn đẹp trên mobile, tablet và desktop."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
							checked: content.showLogo,
							onChange: (value) => update((d) => d.landing.showLogo = value),
							label: ""
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-neutral-100 ring-1 ring-neutral-200 dark:bg-white/10 dark:ring-white/10",
							children: content.logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: content.logoUrl,
								alt: "Preview logo",
								className: "h-full w-full object-contain"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "h-7 w-7 text-neutral-500" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => logoInputRef.current?.click(),
										className: "rounded-lg bg-neutral-900 px-3 py-2 text-xs font-bold text-white",
										children: "Tải logo lên"
									}), content.logoUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => update((d) => d.landing.logoUrl = ""),
										className: "rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-600",
										children: "Xóa logo"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: logoInputRef,
									type: "file",
									accept: "image/png,image/jpeg,image/webp,image/svg+xml",
									className: "hidden",
									onChange: (event) => {
										const file = event.target.files?.[0];
										if (file) uploadLogo(file);
										event.target.value = "";
									}
								}),
								logoError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-semibold text-red-600",
									children: logoError
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Hoặc dùng Logo URL",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
							type: "url",
							value: content.logoUrl.startsWith("data:") ? "" : content.logoUrl,
							onChange: (e) => update((d) => d.landing.logoUrl = e.target.value),
							placeholder: "https://.../logo.png"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Hero: nhãn trên đầu",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: content.heroEyebrow,
					onChange: (e) => update((d) => d.landing.heroEyebrow = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Hero: tiêu đề",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: content.heroTitle,
					onChange: (e) => update((d) => d.landing.heroTitle = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Hero: phần nhấn mạnh",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: content.heroHighlight,
					onChange: (e) => update((d) => d.landing.heroHighlight = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Hero: mô tả",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: content.heroDescription,
					onChange: (e) => update((d) => d.landing.heroDescription = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Hero: URL hình ảnh (để trống dùng ảnh mặc định)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					type: "url",
					value: content.heroImageUrl,
					onChange: (e) => update((d) => d.landing.heroImageUrl = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Hero: các điểm tin tưởng (mỗi dòng một mục)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: content.heroTrustItems.join("\n"),
					onChange: (e) => updateLines("heroTrustItems", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Nhãn CTA hero",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: content.heroCtaLabel,
					onChange: (e) => update((d) => d.landing.heroCtaLabel = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2 sm:grid-cols-2",
				children: [
					"painHeading",
					"benefitsHeading",
					"majorsHeading",
					"expertsHeading",
					"galleryHeading",
					"testimonialsHeading",
					"stepsHeading",
					"faqHeading",
					"finalCtaHeading"
				].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: key,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
						value: content[key],
						onChange: (e) => update((d) => d.landing[key] = e.target.value)
					})
				}, key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Pain points (mỗi dòng một mục)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: content.pains.join("\n"),
					onChange: (e) => updateLines("pains", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Mô tả các ngành (JSON array 8 phần tử)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: JSON.stringify(content.majorDescriptions, null, 2),
					onChange: (e) => updateJson("majorDescriptions", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Tên ngành (JSON array)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: JSON.stringify(content.majorNames, null, 2),
					onChange: (e) => updateJson("majorNames", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Icon ngành (JSON array)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: JSON.stringify(content.majorIcons, null, 2),
					onChange: (e) => updateJson("majorIcons", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Caption gallery (mỗi dòng một mục)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: content.galleryCaptions.join("\n"),
					onChange: (e) => updateLines("galleryCaptions", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "URL ảnh gallery (JSON array)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: JSON.stringify(content.galleryImageUrls, null, 2),
					onChange: (e) => updateJson("galleryImageUrls", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "URL ảnh chuyên gia (JSON array)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: JSON.stringify(content.expertImageUrls, null, 2),
					onChange: (e) => updateJson("expertImageUrls", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Chuyên gia (JSON array gồm name, role, bio, experience)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: JSON.stringify(content.experts, null, 2),
					onChange: (e) => updateJson("experts", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Stats (JSON array gồm value, label)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: JSON.stringify(content.stats, null, 2),
					onChange: (e) => updateJson("stats", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Benefits (JSON array gồm stat, title, text)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: JSON.stringify(content.benefits, null, 2),
					onChange: (e) => updateJson("benefits", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Testimonials (JSON array gồm name, meta, text)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: JSON.stringify(content.testimonials, null, 2),
					onChange: (e) => updateJson("testimonials", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Steps (JSON array gồm number, title, description)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: JSON.stringify(content.steps, null, 2),
					onChange: (e) => updateJson("steps", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "FAQ (JSON array gồm slug, question, answer)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: JSON.stringify(content.faqs, null, 2),
					onChange: (e) => updateJson("faqs", e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Mô tả CTA cuối trang",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: content.finalCtaDescription,
					onChange: (e) => update((d) => d.landing.finalCtaDescription = e.target.value)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveHint, {})
		]
	});
}
function PagesModal({ onClose }) {
	const { config, update } = useSiteConfig();
	const [selectedId, setSelectedId] = (0, import_react.useState)(config.pages[0]?.id || "");
	const selected = config.pages.find((page) => page.id === selectedId) || config.pages[0];
	if (!selected) return null;
	const normalizedSelectedPath = selected?.path.trim().replace(/^\/+|\/+$/g, "").toLowerCase() || "";
	const pathConflict = Boolean(normalizedSelectedPath && config.pages.some((page) => page.id !== selected.id && page.path === normalizedSelectedPath));
	function updatePage(id, patch) {
		update((draft) => {
			const page = draft.pages.find((item) => item.id === id);
			if (page) Object.assign(page, patch);
		});
	}
	function addPage(kind) {
		const id = `page_${Date.now()}`;
		const path = kind === "thankYou" ? `cam-on-${Date.now()}` : `trang-${Date.now()}`;
		update((draft) => {
			draft.pages.push({
				id,
				title: kind === "thankYou" ? "Trang cảm ơn mới" : "Trang mới",
				path,
				kind,
				enabled: true,
				showInMenu: kind === "custom",
				menuOrder: draft.pages.length,
				heading: kind === "thankYou" ? "Cảm ơn bạn!" : "Tiêu đề trang mới",
				description: "Nội dung trang được chỉnh sửa trong Admin.",
				ctaLabel: "Về trang chủ",
				ctaHref: "/"
			});
		});
		setSelectedId(id);
	}
	function removePage(id) {
		if (id === "home") return;
		update((draft) => {
			draft.pages = draft.pages.filter((page) => page.id !== id);
		});
		if (selectedId === id) setSelectedId("home");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminModal, {
		title: "Quản Lý Đa Trang & Menu",
		subtitle: "Tạo trang phụ, Thank You page và menu điều hướng hoạt động thật",
		onClose,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => addPage("custom"),
					className: "flex-1 rounded-lg bg-neutral-900 px-3 py-2 text-xs font-bold text-white",
					children: "+ Trang mới"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => addPage("thankYou"),
					className: "flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-xs font-bold",
					children: "+ Thank You"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 flex gap-1 overflow-x-auto border-b border-neutral-200 pb-2",
				children: config.pages.map((page) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setSelectedId(page.id),
					className: `shrink-0 rounded-lg px-3 py-2 text-xs font-semibold ${page.id === selected.id ? "bg-neutral-900 text-white" : "bg-neutral-100"}`,
					children: page.title
				}, page.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Tên trang",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: selected.title,
					onChange: (e) => updatePage(selected.id, { title: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Đường dẫn",
				hint: selected.path ? `Truy cập: /${selected.path}` : "Trang chủ dùng /",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					disabled: selected.kind === "landing",
					value: selected.path,
					onChange: (e) => {
						const path = e.target.value.replace(/^\/+|[^a-z0-9-]/gi, "").toLowerCase();
						if (!path || !config.pages.some((page) => page.id !== selected.id && page.path === path)) updatePage(selected.id, { path });
					}
				})
			}),
			pathConflict && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-xs font-semibold text-red-600",
				children: "Đường dẫn này đã được dùng bởi một trang khác."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Tiêu đề hiển thị",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: selected.heading,
					onChange: (e) => updatePage(selected.id, { heading: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Mô tả",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextArea, {
					value: selected.description,
					onChange: (e) => updatePage(selected.id, { description: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Nút CTA",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: selected.ctaLabel,
					onChange: (e) => updatePage(selected.id, { ctaLabel: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Link CTA",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					value: selected.ctaHref,
					onChange: (e) => updatePage(selected.id, { ctaHref: e.target.value })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
				checked: selected.enabled,
				onChange: (value) => updatePage(selected.id, { enabled: value }),
				label: "Trang đang hoạt động"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
				checked: selected.showInMenu,
				onChange: (value) => updatePage(selected.id, { showInMenu: value }),
				label: "Hiển thị trong menu"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Thứ tự menu",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextInput, {
					type: "number",
					value: selected.menuOrder,
					onChange: (e) => updatePage(selected.id, { menuOrder: Number(e.target.value) || 0 })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				disabled: selected.id === "home" || pathConflict,
				onClick: () => removePage(selected.id),
				className: "w-full rounded-lg border border-red-200 py-2 text-xs font-bold text-red-600 disabled:opacity-40",
				children: "Xóa trang này"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveHint, {})
		]
	});
}
function GuideModal({ onClose }) {
	const { config } = useSiteConfig();
	const checks = [
		{
			label: "Webhook đã cấu hình",
			ok: config.form.webhookUrl.includes("http") && !config.form.webhookUrl.includes("REPLACE")
		},
		{
			label: "TikTok Pixel",
			ok: !!config.tracking.tiktokPixelId
		},
		{
			label: "SEO title & description",
			ok: !!config.seo.title && !!config.seo.description
		},
		{
			label: "Hotline/Zalo",
			ok: !!config.floatingContact.hotline
		},
		{
			label: "Storage mode",
			ok: config.admin.storageMode === "local" || !!config.admin.supabaseUrl
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminModal, {
		title: "Hướng Dẫn & Health Check",
		subtitle: "Chẩn đoán nhanh trạng thái hệ thống",
		onClose,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 space-y-1.5",
			children: checks.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between rounded-lg border border-neutral-200 px-3 py-2 text-xs dark:border-white/10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: c.ok ? "font-bold text-emerald-600" : "font-bold text-amber-600",
					children: c.ok ? "OK" : "Cần cấu hình"
				})]
			}, c.label))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
			className: "list-decimal space-y-1.5 pl-5 text-xs text-neutral-600 dark:text-neutral-300",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Đăng nhập admin, chỉnh sửa các thẻ công cụ trên thanh trên cùng." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Bấm LƯU để áp dụng (localStorage) hoặc XUẤT CONFIG để tải file dán vào mã nguồn." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Kết nối Supabase trong Storage Mode để đồng bộ đa thiết bị & lưu lead cloud." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Kiểm tra form gửi về Make.com và Pixel bắn sự kiện trước khi chạy Ads." })
			]
		})]
	});
}
var REGISTRY = {
	editor: LandingEditorModal,
	fomo: FomoModal,
	analytics: AnalyticsModal,
	pages: PagesModal,
	abtest: AbTestModal,
	email: EmailModal,
	webhook: WebhookModal,
	sections: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoModal, {
		...p,
		title: "Thêm Khối Giao Diện",
		subtitle: "Thư viện section chuyển đổi cao",
		points: [
			"Các khối có sẵn: Hero, Countdown, Pricing, Grid Icons, Testimonials, FAQ, Video, Guarantee.",
			"Bật/tắt Countdown & Floating Contact bằng thẻ tương ứng.",
			"Thêm section mới bằng cách tạo component trong src/components và chèn vào index.tsx."
		]
	}),
	theme: ThemeModal,
	guide: GuideModal,
	leads: LeadsModal,
	webmaster: WebmasterModal,
	pixel: PixelModal,
	utm: (p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoModal, {
		...p,
		title: "UTM Intelligence Hub",
		subtitle: "Gắn nhãn nguồn traffic cho AI Sales",
		points: [
			"Thêm ?utm_source=..&utm_medium=..&utm_campaign=.. vào link quảng cáo.",
			"Hệ thống tự đọc UTM, gộp vào biến traffic_ads_source gửi webhook.",
			"AI Sales Advisor dùng nguồn UTM để chọn kịch bản tư vấn phù hợp."
		]
	}),
	cron: CronModal,
	storage: StorageModal,
	seo: SeoModal,
	form: FormModal,
	ai: AiModal,
	contact: ContactModal,
	countdown: CountdownModal,
	adminlink: AdminLinkModal,
	tracking: PixelModal,
	preview: () => null
};
function SaveHint() {
	const { save, dirty } = useSiteConfig();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "sticky bottom-0 -mx-4 mt-4 border-t border-neutral-200 bg-white px-4 pb-1 pt-3 dark:border-white/10 dark:bg-neutral-900",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			onClick: save,
			className: `w-full rounded-lg py-2.5 text-sm font-bold ${dirty ? "bg-emerald-500 text-white" : "bg-neutral-200 text-neutral-500 dark:bg-white/10"}`,
			children: dirty ? "LƯU THAY ĐỔI" : "Đã lưu"
		})
	});
}
/** Chèn một thẻ <script> nội tuyến một lần duy nhất. */
function injectInline(id, code, target = "head") {
	if (!code.trim() || document.getElementById(id)) return;
	const s = document.createElement("script");
	s.id = id;
	s.type = "text/javascript";
	s.text = code;
	(target === "head" ? document.head : document.body).appendChild(s);
}
function injectSrc(id, src) {
	if (document.getElementById(id)) return;
	const s = document.createElement("script");
	s.id = id;
	s.async = true;
	s.src = src;
	document.head.appendChild(s);
}
function injectRaw(id, html, target) {
	if (!html.trim() || document.getElementById(id)) return;
	const holder = document.createElement("div");
	holder.id = id;
	holder.style.display = "none";
	holder.innerHTML = html;
	holder.querySelectorAll("script").forEach((old) => {
		const s = document.createElement("script");
		if (old.src) s.src = old.src;
		else s.text = old.textContent || "";
		document.head.appendChild(s);
		old.remove();
	});
	(target === "head" ? document.head : document.body).appendChild(holder);
}
function setMeta(name, content) {
	if (!content) return;
	let el = document.querySelector(`meta[name="${name}"]`);
	if (!el) {
		el = document.createElement("meta");
		el.name = name;
		document.head.appendChild(el);
	}
	el.content = content;
}
/**
* Áp dụng cấu hình động lên trang thật: Pixel/GA4/GTM, mã xác thực
* webmaster, custom scripts, màu & font theme, chia biến thể A/B và
* ghi nhận lượt truy cập cho Analytics.
*/
function RuntimeConfig() {
	const { config } = useSiteConfig();
	const t = config.tracking;
	(0, import_react.useEffect)(() => {
		if (t.facebookPixelId) injectInline("fb-pixel", `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${t.facebookPixelId}');${t.events.pageView ? "fbq('track','PageView');" : ""}`);
		if (t.tiktokPixelId) injectInline("tiktok-pixel", `!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};ttq.load('${t.tiktokPixelId}');${t.events.pageView ? "ttq.page();" : ""}}(window,document,'ttq');`);
		if (t.ga4Id) {
			injectSrc("ga4-src", `https://www.googletagmanager.com/gtag/js?id=${t.ga4Id}`);
			injectInline("ga4-init", `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${t.ga4Id}');`);
		}
		if (t.gtmId) injectInline("gtm-init", `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${t.gtmId}');`);
		setMeta("google-site-verification", t.googleVerification);
		injectRaw("custom-head", t.customHead, "head");
		injectRaw("custom-body", t.customBody, "body");
		injectRaw("custom-footer", t.customFooter, "body");
	}, [
		t.facebookPixelId,
		t.tiktokPixelId,
		t.ga4Id,
		t.gtmId,
		t.googleVerification,
		t.customHead,
		t.customBody,
		t.customFooter,
		t.events.pageView
	]);
	(0, import_react.useEffect)(() => {
		const root = document.documentElement;
		if (config.theme.primary) root.style.setProperty("--primary", config.theme.primary);
		if (config.theme.gold) root.style.setProperty("--gold", config.theme.gold);
		if (config.theme.fontBody) root.style.setProperty("--font-sans", `"${config.theme.fontBody}", system-ui, sans-serif`);
	}, [
		config.theme.primary,
		config.theme.gold,
		config.theme.fontBody
	]);
	(0, import_react.useEffect)(() => {
		const experimentKey = `funnel_visit_counted_v2_${config.abTest.enabled ? "ab" : "plain"}_${config.abTest.split}`;
		try {
			if (sessionStorage.getItem(experimentKey) === "1") return;
		} catch {}
		const variant = getVariant(config.abTest.enabled, config.abTest.split);
		trackVisit(utmSource(), config.abTest.enabled ? variant : void 0);
		try {
			sessionStorage.setItem(experimentKey, "1");
		} catch {}
	}, [config.abTest.enabled, config.abTest.split]);
	return null;
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$3 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				name: "author",
				content: "Trung tâm Hướng nghiệp & Phát triển Sự nghiệp Quốc tế"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:locale",
				content: "vi_VN"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800;900&display=swap"
			}
		],
		scripts: [
			{ children: `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
/* fbq('init', 'YOUR_PIXEL_ID'); fbq('track', 'PageView'); */
` },
			{ children: `
!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=d.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=d.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
ttq.load('DAILRC3C77U3EDHHCGUG'); ttq.page();
}(window,document,'ttq');
` },
			{ children: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
/* gtag('config', 'AW-XXXXXXXXX'); */
` }
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$3.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteConfigProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RuntimeConfig, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminBar, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeviceFrame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminModals, {})
		] }) })
	});
}
var $$splitComponentImporter$2 = () => import("./routes-CgVqkfpg.mjs");
var TITLE = "Du Học Nghề Trung Quốc 0Đ | Vừa Học Vừa Làm Lương 15-30 Triệu";
var DESC = "Du học nghề Trung Quốc học phí 0Đ: học 20% lý thuyết - 80% thực hành, lương cứng 15-30 triệu/tháng, bằng Cao đẳng chính quy quốc tế. Đăng ký nhận lộ trình miễn phí.";
var FAQ_JSONLD = JSON.stringify({
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: [
		{
			slug: "hoc_phi",
			q: "Du học nghề Trung Quốc học phí 0Đ có thật không?",
			a: "Có. Học phí được doanh nghiệp Trung Quốc tài trợ theo chương trình liên kết đào tạo nhân lực. Học viên chỉ cần chuẩn bị chi phí hồ sơ, vé máy bay và sinh hoạt ban đầu; phần này được tư vấn minh bạch trước khi đăng ký."
		},
		{
			slug: "tieng_trung",
			q: "Điều kiện tham gia gồm những gì?",
			a: "Tốt nghiệp THPT (hoặc tương đương), độ tuổi 18-28, sức khỏe tốt. Không cần chứng minh tài chính và không yêu cầu biết tiếng Hán trước — học viên được đào tạo tiếng Hán nền tảng trước khi bay."
		},
		{
			slug: "luong_thuc_tap",
			q: "Vừa học vừa làm thì lương bao nhiêu và có đủ sống không?",
			a: "Thu nhập thực tập tại doanh nghiệp đối tác thường 15-30 triệu đồng/tháng tùy ngành và ca làm. Mức này đủ trang trải sinh hoạt, ký túc xá và còn dư gửi về gia đình."
		},
		{
			slug: "bang_cap",
			q: "Bằng tốt nghiệp có được công nhận không?",
			a: "Học viên nhận bằng Cao đẳng chính quy của trường tại Trung Quốc, được công nhận quốc tế, có thể ở lại làm việc, học liên thông lên Đại học hoặc về Việt Nam làm cho doanh nghiệp FDI."
		},
		{
			slug: "thoi_gian",
			q: "Thời gian nhập học và quy trình mất bao lâu?",
			a: "Có hai kỳ nhập học mỗi năm: tháng 3 và tháng 9. Từ lúc đăng ký tới khi bay thường 3-5 tháng, gồm xét hồ sơ, học tiếng Hán và làm thủ tục visa."
		},
		{
			slug: "nganh_hoc",
			q: "Ngành nào đang cần nhiều nhân lực nhất?",
			a: "Công nghệ ô tô điện, công nghệ drone (UAV), IoT và logistics là các ngành tuyển nhiều nhất, đồng thời có mức lương thực tập cao nhất trong 8 ngành của chương trình."
		}
	].map((f) => ({
		"@type": "Question",
		name: f.q,
		acceptedAnswer: {
			"@type": "Answer",
			text: f.a
		}
	}))
});
var Route$2 = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: TITLE },
			{
				name: "description",
				content: DESC
			},
			{
				property: "og:title",
				content: TITLE
			},
			{
				property: "og:description",
				content: DESC
			},
			{
				name: "twitter:title",
				content: TITLE
			},
			{
				name: "twitter:description",
				content: DESC
			}
		],
		scripts: [{
			type: "application/ld+json",
			children: FAQ_JSONLD
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("../_-Dgc_L1X9.mjs");
var Route$1 = createFileRoute("/$")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./admin-HXEhvanJ.mjs");
var Route = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$2.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$3
	}),
	SplatRoute: Route$1.update({
		id: "/$",
		path: "/$",
		getParentRoute: () => Route$3
	}),
	AdminRoute: Route.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => Route$3
	})
};
var routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
