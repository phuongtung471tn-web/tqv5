import { createFileRoute, Link, useParams } from "@tanstack/react-router";

import { useSiteConfig } from "@/lib/use-site-config";
import { AdminLoginPage } from "@/components/admin/AdminLoginPage";

export const Route = createFileRoute("/$")({
  component: CatchAll,
});

function CatchAll() {
  const params = useParams({ from: "/$" });
  const { config } = useSiteConfig();
  const slug = (params._splat ?? "").replace(/^\/+|\/+$/g, "");
  const adminPath = config.admin.adminPath.trim().replace(/^\/+|\/+$/g, "");

  if (adminPath && slug === adminPath) return <AdminLoginPage />;

  const page = config.pages.find((item) => item.enabled && item.path === slug);
  if (page) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-xl rounded-2xl border border-border bg-card p-8 text-center shadow-[var(--shadow-card)]">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">{page.title}</p>
          <h1 className="mt-3 text-3xl font-black text-foreground">{page.heading || page.title}</h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">{page.description}</p>
          {page.ctaLabel && (
            <a href={page.ctaHref || "/"} className="mt-6 inline-flex rounded-lg bg-primary px-5 py-3 font-bold text-primary-foreground">
              {page.ctaLabel}
            </a>
          )}
        </div>
      </main>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Không tìm thấy trang</h2>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
