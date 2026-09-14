import type { SiteConfig } from "@/config/site-config";

type ContentSectionData = SiteConfig["landing"]["sectionsArray"][number];

export function ContentSection({ section }: { section: ContentSectionData }) {
  return (
    <section
      style={{
        backgroundColor: section.content?.backgroundColor || undefined,
        color: section.content?.textColor || undefined,
      }}
      className="mx-auto w-full max-w-6xl px-4 py-16 sm:py-20"
    >
      {section.content?.imageUrl && (
        <img
          src={section.content.imageUrl}
          alt=""
          className="mb-6 max-h-[28rem] w-full rounded-2xl object-cover"
          loading="lazy"
        />
      )}
      <h2
        style={{ color: section.content?.accentColor || undefined }}
        className="text-2xl font-extrabold sm:text-3xl"
      >
        {section.content?.heading || section.label}
      </h2>
      {section.content?.body && (
        <p className="mt-3 max-w-3xl whitespace-pre-line text-muted-foreground">
          {section.content.body}
        </p>
      )}
      {section.content?.buttonLabel && (
        <a
          href={section.content.buttonHref || "#dang-ky"}
          className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground"
        >
          {section.content.buttonLabel}
        </a>
      )}
    </section>
  );
}
