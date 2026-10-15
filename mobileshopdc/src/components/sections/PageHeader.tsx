export function PageHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <header className="relative mx-auto max-w-7xl px-6 pb-12 pt-36">
      <div className="absolute inset-0 -z-10 bg-aurora opacity-60" aria-hidden />
      <p className="text-sm uppercase tracking-[0.3em] text-primary animate-in fade-in">{eyebrow}</p>
      <h1 className="mt-3 max-w-4xl font-display text-5xl font-extrabold leading-[0.95] md:text-7xl animate-in fade-in slide-in-from-bottom-6 duration-700">{title}</h1>
      {sub && <p className="mt-5 max-w-xl text-lg text-muted-foreground animate-in fade-in duration-1000">{sub}</p>}
    </header>
  );
}

export const meta = (title: string, description: string) => ({
  meta: [
    { title: `${title} — PHONEX` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} — PHONEX` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});
