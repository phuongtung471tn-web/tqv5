globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/.htaccess": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"b5b-YLBhnsRYR6S6n+WiA1SQLiwt1Zk\"",
		"mtime": "2026-09-14T21:34:42.939Z",
		"size": 2907,
		"path": "../public/.htaccess"
	},
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-09-14T21:34:42.939Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-14T21:34:42.939Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/sitemap.xml": {
		"type": "application/xml",
		"etag": "\"eb-Zl0a7o2MBrn3bOnHPBC1zKyGBik\"",
		"mtime": "2026-09-14T21:34:42.939Z",
		"size": 235,
		"path": "../public/sitemap.xml"
	},
	"/assets/AdminLoginPage-nlFgc5kN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8b6-1bVHK6RrIfTn8DWLNCTaZs0e/kA\"",
		"mtime": "2026-09-14T21:34:42.225Z",
		"size": 2230,
		"path": "../public/assets/AdminLoginPage-nlFgc5kN.js"
	},
	"/assets/_-Cqt3mGbZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a8-aqxPg5W128hHTqKiuK8TgFyF/AI\"",
		"mtime": "2026-09-14T21:34:42.225Z",
		"size": 1704,
		"path": "../public/assets/_-Cqt3mGbZ.js"
	},
	"/assets/admin-Bcl3QdvC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"50-jXJXjVSFf9APSMya+GUByW2OqDk\"",
		"mtime": "2026-09-14T21:34:42.225Z",
		"size": 80,
		"path": "../public/assets/admin-Bcl3QdvC.js"
	},
	"/assets/createLucideIcon-BPfP2LnL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"75e7-ErKb/5fnyvmbLXUiEH5RBgqYs0A\"",
		"mtime": "2026-09-14T21:34:42.225Z",
		"size": 30183,
		"path": "../public/assets/createLucideIcon-BPfP2LnL.js"
	},
	"/assets/expert-1-CcX0y7YN.webp": {
		"type": "image/webp",
		"etag": "\"4e66-azYlRFr8uhHtsCzRdIAZMfeXlwQ\"",
		"mtime": "2026-09-14T21:34:42.225Z",
		"size": 20070,
		"path": "../public/assets/expert-1-CcX0y7YN.webp"
	},
	"/assets/expert-2-WVJni1up.webp": {
		"type": "image/webp",
		"etag": "\"4c02-i3IyvaGuNuXwPm3g2n9ZLOvusFA\"",
		"mtime": "2026-09-14T21:34:42.225Z",
		"size": 19458,
		"path": "../public/assets/expert-2-WVJni1up.webp"
	},
	"/assets/expert-3-AK2LvN4J.webp": {
		"type": "image/webp",
		"etag": "\"5f4e-Eqe28tVw7G7O0xNJ2HnPbVGgdQU\"",
		"mtime": "2026-09-14T21:34:42.225Z",
		"size": 24398,
		"path": "../public/assets/expert-3-AK2LvN4J.webp"
	},
	"/assets/gallery-airport-BNYTV757.webp": {
		"type": "image/webp",
		"etag": "\"277b0-d4CzNc8Fz6iajVkqSk+l0ObjzMI\"",
		"mtime": "2026-09-14T21:34:42.225Z",
		"size": 161712,
		"path": "../public/assets/gallery-airport-BNYTV757.webp"
	},
	"/assets/gallery-campus-Ccbnr8PW.webp": {
		"type": "image/webp",
		"etag": "\"264a0-59aOj6L82cQVeJLC2PuaG5RRNb8\"",
		"mtime": "2026-09-14T21:34:42.226Z",
		"size": 156832,
		"path": "../public/assets/gallery-campus-Ccbnr8PW.webp"
	},
	"/assets/gallery-dorm-room-CN0jv29K.webp": {
		"type": "image/webp",
		"etag": "\"e5a4-oXAGlIQ2gEaidziQHCKkxBTtjiw\"",
		"mtime": "2026-09-14T21:34:42.226Z",
		"size": 58788,
		"path": "../public/assets/gallery-dorm-room-CN0jv29K.webp"
	},
	"/assets/gallery-visa-C2KfDTnt.webp": {
		"type": "image/webp",
		"etag": "\"e3a6-FGjPJcD5qml/QDhBn3h6xdWM9Bg\"",
		"mtime": "2026-09-14T21:34:42.226Z",
		"size": 58278,
		"path": "../public/assets/gallery-visa-C2KfDTnt.webp"
	},
	"/assets/hero-student-RoGGUFG7.webp": {
		"type": "image/webp",
		"etag": "\"22fc8-bnPWmJ5brukLYufWfSzNFGmqb7k\"",
		"mtime": "2026-09-14T21:34:42.226Z",
		"size": 143304,
		"path": "../public/assets/hero-student-RoGGUFG7.webp"
	},
	"/assets/index-CCFuArpW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"689a6-qAGlwZb+U0swsJX5Kj2dPQwszjQ\"",
		"mtime": "2026-09-14T21:34:42.224Z",
		"size": 428454,
		"path": "../public/assets/index-CCFuArpW.js"
	},
	"/assets/invariant-Cn8tWQnF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f50-/4J8y1bjoSPLM7a9GfmsUUix1Pc\"",
		"mtime": "2026-09-14T21:34:42.225Z",
		"size": 3920,
		"path": "../public/assets/invariant-Cn8tWQnF.js"
	},
	"/assets/link-bUFddHOF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5dc6-ffdUlPx8+0K0l7pWiJoImtCRCrM\"",
		"mtime": "2026-09-14T21:34:42.225Z",
		"size": 24006,
		"path": "../public/assets/link-bUFddHOF.js"
	},
	"/assets/routes-nt_67Lgg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14201-FdXAThIsb26n1WjGPo6K61arkH8\"",
		"mtime": "2026-09-14T21:34:42.225Z",
		"size": 82433,
		"path": "../public/assets/routes-nt_67Lgg.js"
	},
	"/assets/styles-DxKbK7lP.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"16c97-81ChilNKjsu1Vo7GPM/BmahtrWg\"",
		"mtime": "2026-09-14T21:34:42.227Z",
		"size": 93335,
		"path": "../public/assets/styles-DxKbK7lP.css"
	},
	"/assets/use-admin-B9C19UWV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"63c-HPvbeVyqh2j3G+YGAHRyHYbm5Q8\"",
		"mtime": "2026-09-14T21:34:42.225Z",
		"size": 1596,
		"path": "../public/assets/use-admin-B9C19UWV.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_hnWzit = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_hnWzit
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
