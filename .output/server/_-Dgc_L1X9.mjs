import { n as require_jsx_runtime } from "./_libs/react+tanstack__react-query.mjs";
import { h as useSiteConfig } from "./_ssr/use-site-config-BbUwIRRQ.mjs";
import { g as Link, y as useParams } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as AdminLoginPage } from "./_ssr/AdminLoginPage-ZE4Ka1IE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_-Dgc_L1X9.js
var import_jsx_runtime = require_jsx_runtime();
function CatchAll() {
	const params = useParams({ from: "/$" });
	const { config } = useSiteConfig();
	const slug = (params._splat ?? "").replace(/^\/+|\/+$/g, "");
	const adminPath = config.admin.adminPath.trim().replace(/^\/+|\/+$/g, "");
	if (adminPath && slug === adminPath) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminLoginPage, {});
	const page = config.pages.find((item) => item.enabled && item.path === slug);
	if (page) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold uppercase tracking-widest text-primary",
					children: page.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 text-3xl font-black text-foreground",
					children: page.heading || page.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 leading-relaxed text-muted-foreground",
					children: page.description
				}),
				page.ctaLabel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: page.ctaHref || "/",
					className: "mt-6 inline-flex rounded-lg bg-primary px-5 py-3 font-bold text-primary-foreground",
					children: page.ctaLabel
				})
			]
		})
	});
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
					children: "Không tìm thấy trang"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
						children: "Về trang chủ"
					})
				})
			]
		})
	});
}
//#endregion
export { CatchAll as component };
