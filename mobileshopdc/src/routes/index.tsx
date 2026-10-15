import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Camera, BatteryFull, Signal, MonitorSmartphone, Cpu, Wrench, RefreshCcw, ShieldCheck, BadgeCheck, Star, ArrowRight, Zap, Percent } from "lucide-react";
import { phones, accessoriesList, brands, images } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { PhoneImage } from "@/components/shop/PhoneImage";
import { Countdown, CountUp } from "@/components/sections/Countdown";
import { useGsapReveal, useMagnetic, gsap, reduced } from "@/hooks/use-motion";
import { formatPrice } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PHONEX — The future fits in your hand" },
      { name: "description", content: "Flagship phones from Apple, Samsung, Pixel, OnePlus and Xiaomi with 0% EMI, trade-ins and same-day repairs." },
      { property: "og:title", content: "PHONEX — The future fits in your hand" },
      { property: "og:description", content: "Flagship phones, 0% EMI, trade-ins and same-day repairs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <BrandMarquee />
      <Story />
      <Featured />
      <Bento />
      <Budget />
      <Quiz />
      <Accessories />
      <Services />
      <Stats />
    </>
  );
}

function Hero() {
  const root = useRef<HTMLElement>(null);
  const phone = useRef<HTMLDivElement>(null);
  const cta = useMagnetic<HTMLAnchorElement>();
  useEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      gsap.from(".hw", { yPercent: 110, opacity: 0, stagger: 0.08, duration: 1.1, ease: "expo.out", delay: 0.3 });
      gsap.from(".chip", { scale: 0, opacity: 0, stagger: 0.12, duration: 0.8, ease: "back.out(2)", delay: 1 });
      gsap.from(phone.current, { y: 120, opacity: 0, rotate: 8, duration: 1.4, ease: "expo.out", delay: 0.4 });
      gsap.to(phone.current, { yPercent: 25, rotate: -6, scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
    }, root);
    const move = (e: PointerEvent) => {
      const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
      gsap.to(".tilt-phone", { rotateY: x * 24, rotateX: -y * 16, transformPerspective: 1000, duration: 1 });
    };
    addEventListener("pointermove", move);
    return () => { ctx.revert(); removeEventListener("pointermove", move); };
  }, []);
  const words = ["The", "future", "fits", "in", "your", "hand."];
  const chips = [
    { i: Camera, t: "200MP camera", c: "left-0 top-[18%]" },
    { i: BatteryFull, t: "6000 mAh", c: "right-0 top-[30%]" },
    { i: Signal, t: "5G ready", c: "left-[2%] bottom-[22%]" },
    { i: MonitorSmartphone, t: "120Hz LTPO", c: "right-[4%] bottom-[12%]" },
  ];
  return (
    <section ref={root} className="relative min-h-[100svh] overflow-hidden pt-28">
      <div className="absolute inset-0 bg-aurora animate-pulse-glow" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-2">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground"><span className="h-1.5 w-1.5 rounded-full bg-mint" /> New: Galaxy S25 Ultra & iPhone 16 Pro in stock</p>
          <h1 className="font-display text-[clamp(3rem,8vw,7rem)] font-extrabold leading-[0.92]">
            {words.map((w, i) => (
              <span key={i} className="inline-block overflow-hidden pb-2 align-bottom"><span className={cn("hw inline-block pr-[0.25em]", (w === "future" || w === "hand.") && "text-gradient")}>{w}</span></span>
            ))}
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">Every flagship, every budget. Matched to you in minutes, delivered same day, backed by in-house repair.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link ref={cta} to="/phones" data-cursor="SHOP" className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 font-semibold text-primary-foreground shadow-glow">Shop Phones <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/compare" className="inline-flex items-center rounded-full glass px-7 py-3.5 font-semibold">Compare Models</Link>
          </div>
        </div>
        <div className="relative mx-auto h-[70vh] w-full max-w-md">
          <div ref={phone} className="absolute inset-0">
            <div className="tilt-phone h-full animate-float [transform-style:preserve-3d]">
              <div className="absolute inset-[20%] rounded-full bg-gradient-brand opacity-50 blur-[90px]" aria-hidden />
              <img src={images.front} alt="Flagship phone with glowing display" width={768} height={1280} className="relative h-full w-full object-contain drop-shadow-2xl" />
            </div>
          </div>
          {chips.map(({ i: I, t, c }) => (
            <div key={t} className={cn("chip absolute glass flex items-center gap-2 rounded-full bg-background/40 px-3 py-2 text-sm", c)}><I className="h-4 w-4 text-primary" />{t}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandMarquee() {
  const row = [...brands, "Realme", "Vivo", "Motorola", ...brands, "Realme", "Vivo", "Motorola"];
  return (
    <div className="relative overflow-hidden border-y py-8 [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
      <div className="flex w-max animate-marquee gap-16 hover:[animation-play-state:paused]">
        {row.map((b, i) => <span key={i} className="font-display text-3xl font-bold text-muted-foreground/50 transition hover:text-foreground">{b}</span>)}
      </div>
    </div>
  );
}

const story = [
  { i: Camera, k: "Camera", t: "200MP that sees in the dark.", d: "Pro sensors, optical zoom and AI night modes on every flagship we stock." },
  { i: MonitorSmartphone, k: "Display", t: "Brighter than daylight.", d: "Up to 3000 nits LTPO panels that drop to 1Hz to save power." },
  { i: Cpu, k: "Performance", t: "3nm chips. Zero lag.", d: "A18 Pro, Snapdragon 8 Elite and Tensor G4 — benchmarked in store." },
  { i: BatteryFull, k: "Battery", t: "Two days. Easily.", d: "Silicon-carbon cells up to 6000 mAh with 100W charging." },
  { i: Zap, k: "Design", t: "Titanium. Ceramic. Glass.", d: "Feel it before you buy — every model on display at our stores." },
];

function Story() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (reduced()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current, start: "top top", end: `+=${story.length * 600}`, pin: true, scrub: 1,
          onUpdate: (s) => setActive(Math.min(story.length - 1, Math.floor(s.progress * story.length))),
        },
      });
      tl.to(".story-phone", { rotateY: 180, scale: 1.15, ease: "none" }).to(".story-phone", { rotateY: 360, scale: 1, ease: "none" });
    }, root);
    return () => ctx.revert();
  }, []);
  const S = story[active];
  return (
    <section ref={root} className="relative flex h-screen items-center overflow-hidden">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 md:grid-cols-2">
        <div className="relative mx-auto h-[60vh] w-full max-w-xs [perspective:1200px]">
          <div className="story-phone relative h-full [transform-style:preserve-3d]">
            <img src={images.front} alt="" className="absolute inset-0 h-full w-full object-contain [backface-visibility:hidden]" />
            <img src={images.back} alt="Phone rear camera" className="absolute inset-0 h-full w-full object-contain [backface-visibility:hidden] [transform:rotateY(180deg)]" />
          </div>
          <div className="absolute inset-[25%] -z-10 rounded-full bg-gradient-brand opacity-40 blur-[100px]" />
        </div>
        <div>
          <div className="mb-8 flex gap-2">
            {story.map((s, i) => <span key={s.k} className={cn("h-1 flex-1 rounded-full transition-colors duration-500", i <= active ? "bg-gradient-brand" : "bg-secondary")} />)}
          </div>
          <div key={active} className="animate-in fade-in slide-in-from-bottom-6 duration-700">
            <S.i className="h-10 w-10 text-primary" />
            <p className="mt-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">{S.k}</p>
            <h2 className="mt-2 font-display text-5xl font-bold md:text-6xl">{S.t}</h2>
            <p className="mt-4 max-w-md text-lg text-muted-foreground">{S.d}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Featured() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduced() || innerWidth < 768) return;
    const ctx = gsap.context(() => {
      const dist = () => (track.current!.scrollWidth - innerWidth + 48);
      gsap.to(track.current, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 1, invalidateOnRefresh: true } });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={root} className="overflow-hidden py-24 md:flex md:h-screen md:flex-col md:justify-center md:py-0">
      <div className="mx-auto mb-10 flex w-full max-w-7xl items-end justify-between px-6">
        <h2 className="font-display text-4xl font-bold md:text-6xl">Featured <span className="text-gradient">flagships</span></h2>
        <Link to="/phones" className="text-sm text-muted-foreground hover:text-foreground">View all →</Link>
      </div>
      <div ref={track} className="flex gap-6 overflow-x-auto px-6 md:overflow-visible" data-cursor="DRAG">
        {phones.slice(0, 8).map((p) => <div key={p.id} className="w-[300px] shrink-0"><ProductCard product={p} /></div>)}
      </div>
    </section>
  );
}

function Bento() {
  const ref = useGsapReveal<HTMLElement>();
  const tile = "spotlight glass group relative overflow-hidden rounded-3xl p-6 transition duration-500 hover:-translate-y-1";
  return (
    <section ref={ref} className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid auto-rows-[220px] gap-4 md:grid-cols-4">
        <Link to="/phones" search={{ sort: "new" }} data-reveal className={cn(tile, "md:col-span-2 md:row-span-2")}>
          <p className="text-sm text-muted-foreground">New arrivals</p>
          <h3 className="mt-2 font-display text-4xl font-bold">Galaxy S25 Ultra</h3>
          <p className="text-muted-foreground">Galaxy AI. Titanium. 200MP.</p>
          <img src={images.back} alt="" loading="lazy" className="absolute -bottom-10 right-0 h-[85%] transition duration-700 group-hover:-translate-y-4 group-hover:rotate-[-4deg]" />
        </Link>
        <div data-reveal className={cn(tile, "md:col-span-2")}>
          <p className="flex items-center gap-2 text-sm text-destructive"><Zap className="h-4 w-4" /> Flash deals end in</p>
          <Countdown className="mt-3 flex items-center" />
          <Link to="/deals" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary">Up to 40% off <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></Link>
        </div>
        <Link to="/phones" search={{ sort: "popular" }} data-reveal className={tile}>
          <Star className="h-6 w-6 text-primary transition duration-500 group-hover:rotate-[72deg]" />
          <h3 className="mt-auto pt-20 font-display text-2xl font-bold">Best sellers</h3>
        </Link>
        <Link to="/services" data-reveal className={tile}>
          <RefreshCcw className="h-6 w-6 text-mint transition duration-700 group-hover:rotate-180" />
          <h3 className="pt-16 font-display text-2xl font-bold">Trade-in & save</h3>
          <p className="text-sm text-muted-foreground">Up to ₹45,000 off</p>
        </Link>
        <div data-reveal className={cn(tile, "bg-gradient-brand md:col-span-4 flex items-center justify-between")}>
          <div>
            <Percent className="h-8 w-8 text-primary-foreground" />
            <h3 className="mt-3 font-display text-3xl font-bold text-primary-foreground md:text-5xl">0% EMI on every phone.</h3>
            <p className="text-primary-foreground/80">No-cost EMI up to 24 months with all major cards.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Budget() {
  const tiers = [{ l: "Under 15k", max: 15000 }, { l: "15k–30k", min: 15000, max: 30000 }, { l: "30k–60k", min: 30000, max: 60000 }, { l: "60k+", min: 60000 }];
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="font-display text-4xl font-bold">Shop by budget</h2>
      <div className="mt-8 flex flex-wrap gap-3">
        {tiers.map((t) => (
          <Link key={t.l} to="/phones" search={{ min: t.min, max: t.max }} className="glass rounded-full px-6 py-3 font-display text-lg transition hover:scale-105 hover:bg-gradient-brand hover:text-primary-foreground">{t.l}</Link>
        ))}
      </div>
      <h2 className="mt-16 font-display text-4xl font-bold">Shop by brand</h2>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {brands.map((b) => (
          <Link key={b} to="/phones" search={{ brand: b }} className="spotlight glass grid h-28 place-items-center rounded-3xl font-display text-xl font-bold transition hover:-translate-y-1">{b}</Link>
        ))}
      </div>
    </section>
  );
}

function Quiz() {
  const qs = [
    { q: "What's your budget?", o: ["Under ₹30k", "₹30–70k", "₹70k+"] },
    { q: "What matters most?", o: ["Camera", "Battery", "Gaming"] },
    { q: "Any brand preference?", o: ["Apple", "Android", "No preference"] },
  ];
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState<number[]>([]);
  const pick = (i: number) => { setAns([...ans, i]); setStep(step + 1); };
  const result = (() => {
    if (step < 3) return null;
    const [b, pr, br] = ans;
    let list = phones.filter((p) => { const v = p.salePrice ?? p.price; return b === 0 ? v < 30000 : b === 1 ? v >= 30000 && v < 70000 : v >= 70000; });
    if (br === 0) list = list.filter((p) => p.brand === "Apple").concat(list);
    if (br === 1) list = list.filter((p) => p.brand !== "Apple").concat(list);
    const key = pr === 0 ? "camera" : pr === 1 ? "battery" : "ram";
    return [...list].sort((a, z) => z.numeric[key] - a.numeric[key])[0] ?? phones[0];
  })();
  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <div className="glass relative overflow-hidden rounded-[2rem] p-8 md:p-12">
        <div className="absolute inset-0 bg-aurora opacity-50" aria-hidden />
        <div className="relative">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Find my phone</p>
          {result ? (
            <div className="mt-6 grid items-center gap-8 animate-in fade-in zoom-in-95 duration-700 md:grid-cols-2">
              <PhoneImage product={result} className="h-72" />
              <div>
                <p className="text-muted-foreground">Your perfect match</p>
                <h3 className="font-display text-4xl font-bold">{result.name}</h3>
                <p className="mt-2 text-2xl">{formatPrice(result.salePrice ?? result.price)}</p>
                <div className="mt-6 flex gap-3">
                  <Button asChild className="rounded-full bg-gradient-brand"><Link to="/phones/$slug" params={{ slug: result.slug }}>See it</Link></Button>
                  <Button variant="secondary" className="rounded-full" onClick={() => { setStep(0); setAns([]); }}>Retake</Button>
                </div>
              </div>
            </div>
          ) : (
            <div key={step} className="animate-in fade-in slide-in-from-right-8 duration-500">
              <h3 className="mt-4 font-display text-3xl font-bold md:text-4xl">{qs[step].q}</h3>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {qs[step].o.map((o, i) => <button key={o} onClick={() => pick(i)} className="glass rounded-2xl p-5 text-left font-medium transition hover:bg-primary hover:text-primary-foreground">{o}</button>)}
              </div>
              <p className="mt-6 text-sm text-muted-foreground">Step {step + 1} of 3</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Accessories() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex items-end justify-between">
        <h2 className="font-display text-4xl font-bold">Complete the <span className="text-gradient">setup</span></h2>
        <Link to="/accessories" className="text-sm text-muted-foreground hover:text-foreground">All accessories →</Link>
      </div>
      <div className="group mt-10 flex items-end justify-center gap-3 overflow-x-auto pb-4">
        {accessoriesList.slice(0, 7).map((a) => (
          <Link key={a.id} to="/accessories/$slug" params={{ slug: a.slug }} className="glass w-28 shrink-0 origin-bottom rounded-3xl p-3 text-center transition-all duration-300 hover:w-40 md:w-32">
            <PhoneImage product={a} color={a.colorways[0]} className="aspect-square" />
            <p className="mt-2 truncate text-xs">{a.name}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Services() {
  const items = [
    { i: Wrench, t: "Same-day repair", d: "Screens, batteries and ports fixed in 60 minutes." },
    { i: RefreshCcw, t: "Trade-in", d: "Instant valuation, credited at checkout." },
    { i: ShieldCheck, t: "Screen protection", d: "Lifetime guard replacement with every phone." },
    { i: BadgeCheck, t: "Extended warranty", d: "Add up to 2 extra years of cover." },
  ];
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="font-display text-4xl font-bold">More than a store.</h2>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ i: I, t, d }) => (
          <div key={t} onPointerMove={onMove} className="spotlight glass rounded-3xl p-6">
            <I className="h-8 w-8 text-primary" />
            <h3 className="mt-6 font-display text-xl font-semibold">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  const reviews = [
    { n: "Ananya R.", t: "Traded my old phone and walked out with an S25 Ultra paying half. Unreal service." },
    { n: "Rahul M.", t: "Screen fixed in 40 minutes while I had coffee next door." },
    { n: "Priya S.", t: "The phone finder quiz nailed it. Pixel 9 Pro is perfect for my photos." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {[{ v: 120000, s: "+", l: "Happy customers" }, { v: 48, s: "", l: "Minute avg. repair" }, { v: 14, s: "", l: "Stores" }, { v: 49, s: "/50", l: "Rating ×10" }].map((s) => (
          <div key={s.l}>
            <p className="font-display text-4xl font-extrabold text-gradient md:text-6xl"><CountUp to={s.v} suffix={s.s} /></p>
            <p className="mt-1 text-sm text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>
      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {reviews.map((r) => (
          <figure key={r.n} className="glass rounded-3xl p-6">
            <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}</div>
            <blockquote className="mt-4 text-lg">“{r.t}”</blockquote>
            <figcaption className="mt-4 text-sm text-muted-foreground">{r.n}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
