import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, meta } from "@/components/sections/PageHeader";
import { CountUp } from "@/components/sections/Countdown";
import { useGsapReveal } from "@/hooks/use-motion";

export const Route = createFileRoute("/about")({
  head: () => meta("About Us", "The story behind PHONEX — a phone store built around matching people to the right device."),
  component: About,
});

function About() {
  const ref = useGsapReveal<HTMLDivElement>();
  const timeline = [["2016", "First 200 sq ft store opens"], ["2019", "In-house repair lab launched"], ["2022", "Trade-in program crosses 50,000 phones"], ["2026", "14 stores and same-day delivery"]];
  return (
    <>
      <PageHeader eyebrow="About" title="We match people to phones." sub="Not upsell. Match. Every recommendation starts with how you actually use your phone." />
      <div ref={ref} className="mx-auto max-w-7xl space-y-24 px-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {[[120000, "+", "Customers"], [14, "", "Stores"], [60000, "+", "Trade-ins"], [10, " yrs", "In business"]].map(([v, s, l]) => (
            <div key={l as string} data-reveal><p className="font-display text-5xl font-extrabold text-gradient"><CountUp to={v as number} suffix={s as string} /></p><p className="text-sm text-muted-foreground">{l}</p></div>
          ))}
        </div>
        <ol className="relative space-y-12 border-l-2 border-primary/40 pl-8">
          {timeline.map(([y, t]) => <li key={y} data-reveal><p className="font-display text-4xl font-bold text-gradient">{y}</p><p className="text-lg">{t}</p></li>)}
        </ol>
        <div className="grid gap-4 md:grid-cols-3">
          {[["Honest advice", "We'll tell you when the cheaper phone is the better phone."], ["Fix, don't replace", "Repair first. Recycle always."], ["Fast, always", "Same-day delivery and repairs while you wait."]].map(([t, d]) => (
            <div key={t} data-reveal className="glass rounded-3xl p-8"><h3 className="font-display text-2xl font-bold">{t}</h3><p className="mt-2 text-muted-foreground">{d}</p></div>
          ))}
        </div>
      </div>
    </>
  );
}
