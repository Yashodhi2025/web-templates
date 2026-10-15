import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader, meta } from "@/components/sections/PageHeader";
import { CountUp } from "@/components/sections/Countdown";
import { useGsapReveal } from "@/hooks/use-motion";
import { brands, phones } from "@/data/products";
import { formatPrice } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services")({
  head: () => meta("Repair & Trade-in", "Same-day phone repairs and instant trade-in valuations."),
  component: Services,
});

const issues = [{ i: "Cracked screen", p: 6999, t: "60 min" }, { i: "Battery replacement", p: 2999, t: "45 min" }, { i: "Charging port", p: 1999, t: "40 min" }, { i: "Camera", p: 3999, t: "90 min" }, { i: "Water damage", p: 4999, t: "24 hrs" }];

function Services() {
  const ref = useGsapReveal<HTMLDivElement>();
  const [step, setStep] = useState(0);
  const [b, setB] = useState("");
  const [m, setM] = useState("");
  const [issue, setIssue] = useState<(typeof issues)[number] | null>(null);
  const [age, setAge] = useState(2);
  const [model, setModel] = useState(0);
  const trade = Math.round(((phones[model].salePrice ?? phones[model].price) * 0.75) / (1 + age * 0.45));
  const opt = "glass rounded-2xl p-4 text-left transition hover:bg-accent";

  return (
    <>
      <PageHeader eyebrow="Services" title="Fixed today. Upgraded tomorrow." sub="Certified technicians, genuine parts, 6-month warranty on every repair." />
      <div ref={ref} className="mx-auto max-w-7xl space-y-24 px-6">
        <section className="grid gap-8 lg:grid-cols-2">
          <div className="glass rounded-3xl p-6">
            <h2 className="font-display text-3xl font-bold">Book a repair</h2>
            <p className="mt-1 text-sm text-muted-foreground">Step {Math.min(step + 1, 3)} of 3</p>
            <div key={step} className="mt-6 animate-in fade-in slide-in-from-right-6 duration-500">
              {step === 0 && <div className="grid grid-cols-2 gap-2">{brands.map((x) => <button key={x} className={opt} onClick={() => { setB(x); setStep(1); }}>{x}</button>)}</div>}
              {step === 1 && <div className="grid gap-2">{phones.filter((p) => p.brand === b).map((p) => <button key={p.id} className={opt} onClick={() => { setM(p.name); setStep(2); }}>{p.name}</button>)}<Button variant="ghost" onClick={() => setStep(0)}>Back</Button></div>}
              {step === 2 && <div className="grid gap-2">{issues.map((x) => <button key={x.i} className={cn(opt, issue?.i === x.i && "ring-2 ring-primary")} onClick={() => { setIssue(x); setStep(3); }}>{x.i}</button>)}</div>}
              {step === 3 && issue && (
                <div>
                  <p className="text-muted-foreground">{m} · {issue.i}</p>
                  <p className="mt-2 font-display text-4xl font-bold">{formatPrice(issue.p)}</p>
                  <p className="text-sm text-mint">Ready in about {issue.t}</p>
                  <div className="mt-6 flex gap-2"><Button className="rounded-full bg-gradient-brand" onClick={() => { toast.success("Repair booked — we'll call to confirm"); setStep(0); }}>Confirm booking</Button><Button variant="ghost" onClick={() => setStep(0)}>Start over</Button></div>
                </div>
              )}
            </div>
          </div>
          <div className="glass rounded-3xl p-6">
            <h2 className="font-display text-3xl font-bold">Trade-in estimator</h2>
            <div className="mt-6 flex flex-wrap gap-2">{phones.slice(0, 8).map((p, i) => <button key={p.id} onClick={() => setModel(i)} className={cn("rounded-full border px-3 py-1 text-xs", i === model && "border-primary bg-primary text-primary-foreground")}>{p.name}</button>)}</div>
            <p className="mt-6 text-sm">Age: {age} year{age === 1 ? "" : "s"}</p>
            <Slider className="mt-2" min={0} max={5} step={1} value={[age]} onValueChange={(v) => setAge(v[0])} />
            <p className="mt-8 text-sm text-muted-foreground">Estimated value</p>
            <p className="font-display text-6xl font-extrabold text-gradient">₹<CountUp key={trade} to={trade} /></p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-4xl font-bold">How trade-in works</h2>
          <ol className="relative mt-10 space-y-10 border-l-2 border-primary/40 pl-8">
            {["Get an instant quote online or in store", "We inspect your phone in 10 minutes", "Value is deducted from your new phone", "We wipe your data securely and recycle responsibly"].map((s, i) => (
              <li key={s} data-reveal className="relative"><span className="absolute -left-[42px] grid h-5 w-5 place-items-center rounded-full bg-gradient-brand text-[10px] font-bold text-primary-foreground">{i + 1}</span><p className="font-display text-xl">{s}</p></li>
            ))}
          </ol>
        </section>

        <section className="max-w-3xl">
          <h2 className="font-display text-4xl font-bold">FAQ</h2>
          <Accordion type="single" collapsible className="mt-6">
            {[["Do you use genuine parts?", "Yes — OEM or certified-equivalent parts, always disclosed upfront."], ["Is my data safe?", "We never need your passcode for hardware repairs, and you can watch the repair live."], ["What if the repair fails?", "Every repair has a 6-month warranty. We'll redo it free."]].map(([q, a]) => (
              <AccordionItem key={q} value={q}><AccordionTrigger>{q}</AccordionTrigger><AccordionContent className="text-muted-foreground">{a}</AccordionContent></AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </>
  );
}
