import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Star, Clock } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CountUp, Reveal, SplitText, Tilt, useGsap } from "@/components/animations/primitives";
import { menu } from "@/data/menu";
import { locations, testimonials, type Location } from "@/data/content";
import { flyToCart, useCart } from "@/lib/cart";
import { money } from "@/lib/brand";
import mojito from "@/assets/drink-mojito.jpg";
import berry from "@/assets/drink-berry.jpg";
import orange from "@/assets/drink-orange.jpg";
import sides from "@/assets/sides.jpg";
import kitchen from "@/assets/kitchen.jpg";
import smoky from "@/assets/burger-smoky.jpg";
import chicken from "@/assets/burger-chicken.jpg";
import truffle from "@/assets/burger-truffle.jpg";
import veg from "@/assets/burger-veg.jpg";

/* ---------------- Drinks ---------------- */
const drinks = [
  { id: "classic-mojito", img: mojito, tone: "text-lime", ring: "shadow-lime", bg: "bg-lime", name: "Classic Lime", sub: "Mint · lime · soda" },
  { id: "berry-mojito", img: berry, tone: "text-berry", ring: "", bg: "bg-berry", name: "Wild Berry", sub: "Raspberry · blackberry" },
  { id: "blood-orange", img: orange, tone: "text-sauce", ring: "shadow-glow", bg: "bg-sauce", name: "Blood Orange", sub: "House cordial · fizz" },
];

export function Drinks() {
  const add = useCart((s) => s.add);
  return (
    <section aria-labelledby="drinks-h" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SplitText id="drinks-h" text="Ice cold. Muddled to order." className="display-xl max-w-3xl text-6xl md:text-8xl" />
          <p className="max-w-xs text-cream/70">Fresh mint, real fruit, cane sugar. Never from a gun, never from a mix.</p>
        </div>
        <Reveal className="grid gap-6 md:grid-cols-3">
          {drinks.map((d) => {
            const item = menu.find((m) => m.id === d.id)!;
            return (
              <Tilt key={d.id} data-cursor="ADD" className="reveal">
                <article className={`group relative overflow-hidden rounded-3xl glass ${d.ring}`}>
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img src={d.img} alt={`${d.name} drink`} loading="lazy" width={1024} height={1024} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    {/* bubbles */}
                    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-full">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <span key={i} className="absolute bottom-0 h-2 w-2 animate-bubble rounded-full border border-cream/60" style={{ left: `${8 + i * 9}%`, animationDelay: `${i * 0.4}s`, animationDuration: `${3 + (i % 4)}s` }} />
                      ))}
                    </div>
                    {/* liquid wave on hover */}
                    <div aria-hidden className={`absolute inset-x-0 bottom-0 h-0 overflow-hidden opacity-80 transition-all duration-700 group-hover:h-[40%] ${d.bg}`}>
                      <svg className="absolute -top-4 left-0 h-6 w-[200%] animate-wave" viewBox="0 0 1200 40" preserveAspectRatio="none">
                        <path d="M0 20 Q150 0 300 20 T600 20 T900 20 T1200 20 V40 H0Z" className="fill-current" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-5">
                    <div>
                      <h3 className={`font-display text-2xl font-bold ${d.tone}`}>{d.name}</h3>
                      <p className="text-sm text-muted-foreground">{d.sub}</p>
                    </div>
                    <button aria-label={`Add ${item.name}`} onClick={(e) => { flyToCart(e.currentTarget, d.img); add({ id: item.id, name: item.name, price: item.price, image: d.img }); toast.success(`${item.name} added`); }}
                      className="rounded-full glass px-4 py-2 font-semibold transition hover:bg-cream hover:text-charcoal">{money(item.price)}</button>
                  </div>
                </article>
              </Tilt>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Combos & Deal of the Day ---------------- */
function useCountdown() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const end = new Date(now); end.setHours(23, 59, 59, 999);
      setLeft(end.getTime() - now.getTime());
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  if (left === null) return ["--", "--", "--"];
  const s = Math.floor(left / 1000);
  return [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60].map((n) => String(n).padStart(2, "0"));
}

const combos = [
  { name: "The Solo", desc: "Any burger + fries + soft drink", price: 18.9, was: 23.3, img: smoky },
  { name: "Date Night", desc: "2 burgers, loaded fries, 2 mojitos", price: 42, was: 52.6, img: truffle },
  { name: "Squad Box", desc: "4 burgers, 2 fries, 4 drinks, 4 cookies", price: 79, was: 98.4, img: chicken },
];

export function Combos() {
  const [h, m, s] = useCountdown();
  const add = useCart((st) => st.add);
  const spot = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <section aria-labelledby="combo-h" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative mb-10 overflow-hidden rounded-[2rem] bg-gradient-sauce p-8 md:p-14">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-charcoal/70">Deal of the day</p>
              <h2 id="combo-h" className="display-xl mt-2 text-5xl text-charcoal md:text-7xl">Truffle Boss + Fries + Mojito</h2>
              <p className="mt-3 text-lg text-charcoal/80">Only <b>{money(22)}</b> <s className="opacity-60">{money(29.9)}</s> — today only.</p>
            </div>
            <div className="flex gap-3" aria-label="Time left">
              {[h, m, s].map((v, i) => (
                <div key={i} className="grid w-20 place-items-center rounded-2xl bg-charcoal py-4 text-cream md:w-24">
                  <span className="font-display text-4xl font-bold tabular-nums md:text-5xl">{v}</span>
                  <span className="text-xs uppercase tracking-widest text-cream/60">{["hrs", "min", "sec"][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Reveal className="grid gap-6 md:grid-cols-3">
          {combos.map((c) => (
            <article key={c.name} onPointerMove={spot} className="reveal shine group relative overflow-hidden rounded-3xl glass p-6 [background-image:radial-gradient(400px_circle_at_var(--x,50%)_var(--y,50%),color-mix(in_oklab,var(--sauce)_22%,transparent),transparent_60%)]">
              <img src={c.img} alt="" loading="lazy" className="mb-5 aspect-video w-full rounded-2xl object-cover" />
              <h3 className="font-display text-3xl font-bold">{c.name}</h3>
              <p className="mt-1 text-muted-foreground">{c.desc}</p>
              <div className="mt-6 flex items-end justify-between">
                <div><span className="font-display text-4xl font-bold">{money(c.price)}</span> <s className="text-muted-foreground">{money(c.was)}</s></div>
                <Button variant="cream" onClick={(e) => { flyToCart(e.currentTarget, c.img); add({ id: c.name, name: `${c.name} Combo`, price: c.price, image: c.img }); toast.success(`${c.name} combo added`); }}>Add</Button>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Stats ---------------- */
export function Stats() {
  const stats = [
    { n: 1250000, s: "+", l: "Burgers served" },
    { n: 380000, s: "+", l: "Happy regulars" },
    { n: 3, s: "", l: "Cities" },
    { n: 8, s: " yrs", l: "Of smashing" },
  ];
  return (
    <section aria-label="Our numbers" className="border-y py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 md:grid-cols-4">
        {stats.map((x) => (
          <div key={x.l}>
            <p className="display-xl text-5xl text-gradient-sauce md:text-6xl"><CountUp to={x.n} suffix={x.s} /></p>
            <p className="mt-2 text-muted-foreground">{x.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
export function Testimonials() {
  const [paused, setPaused] = useState(false);
  const row = [...testimonials, ...testimonials];
  return (
    <section aria-labelledby="t-h" className="overflow-hidden py-24 md:py-32">
      <div className="mx-auto mb-12 max-w-7xl px-6">
        <SplitText id="t-h" text="Fans with sauce on their sleeves." className="display-xl max-w-4xl text-5xl md:text-7xl" />
      </div>
      <div className="overflow-x-auto [scrollbar-width:none]" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)} data-lenis-prevent-horizontal>
        <ul className="flex w-max animate-marquee gap-6 px-6" style={{ ["--marquee-speed" as string]: "50s", animationPlayState: paused ? "paused" : "running" }}>
          {row.map((t, i) => (
            <li key={i} className="w-[320px] shrink-0 rounded-3xl glass p-7 md:w-[400px]" aria-hidden={i >= testimonials.length}>
              <div className="flex gap-1" aria-label={`${t.stars} stars`}>
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} className={`h-4 w-4 ${k < t.stars ? "fill-sauce text-sauce" : "text-cream/20"}`} />)}
              </div>
              <blockquote className="mt-4 text-lg leading-relaxed">“{t.quote}”</blockquote>
              <div className="mt-6 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-sauce font-display font-bold text-charcoal">{t.name[0]}</span>
                <div><p className="font-semibold">{t.name}</p><p className="text-sm text-muted-foreground">{t.role}</p></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Gallery ---------------- */
export function Gallery() {
  const imgs = [smoky, mojito, kitchen, sides, berry, chicken, veg, orange, truffle];
  const ref = useGsap((gsap, root) => {
    root.querySelectorAll(".g-item").forEach((el) => {
      gsap.fromTo(el, { scale: 0.85, opacity: 0.4 }, { scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "top 60%", scrub: true } });
    });
  });
  return (
    <section ref={ref} aria-labelledby="g-h" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 id="g-h" className="display-xl text-5xl md:text-7xl">@bunzandco</h2>
          <a href="#" className="text-sauce underline-offset-4 hover:underline">Follow us →</a>
        </div>
        <div className="columns-2 gap-4 md:columns-3">
          {imgs.map((src, i) => (
            <div key={i} data-cursor="VIEW" className="g-item group mb-4 break-inside-avoid overflow-hidden rounded-3xl">
              <img src={src} alt="Food and moments from BUNZ & CO." loading="lazy" className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Locations ---------------- */
function isOpen(l: Location) {
  const h = new Date().getHours();
  return h >= l.open && h < l.close;
}
export function Locations() {
  const [now, setNow] = useState(false);
  useEffect(() => setNow(true), []);
  return (
    <section aria-labelledby="loc-h" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SplitText id="loc-h" text="Find your nearest grill." className="display-xl mb-12 text-5xl md:text-7xl" />
        <Reveal className="grid gap-6 md:grid-cols-3">
          {locations.map((l) => {
            const open = now && isOpen(l);
            return (
              <article key={l.id} className="reveal overflow-hidden rounded-3xl glass">
                <div className="relative grid aspect-video place-items-center bg-secondary [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:28px_28px]" aria-label={`Map of ${l.name}`}>
                  <MapPin className="h-10 w-10 animate-bounce fill-sauce text-charcoal" />
                </div>
                <div className="space-y-2 p-6">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-2xl font-bold">{l.name}</h3>
                    {now && (
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${open ? "bg-lime/15 text-lime" : "bg-ketchup/20 text-ketchup"}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${open ? "animate-pulse bg-lime" : "bg-ketchup"}`} />{open ? "Open now" : "Closed"}
                      </span>
                    )}
                  </div>
                  <p className="flex items-center gap-2 text-sm text-cream/75"><MapPin className="h-4 w-4 shrink-0" />{l.address}</p>
                  <p className="flex items-center gap-2 text-sm text-cream/75"><Clock className="h-4 w-4 shrink-0" />{l.open}:00 – {l.close === 24 ? "00" : l.close}:00 daily</p>
                  <p className="flex items-center gap-2 text-sm text-cream/75"><Phone className="h-4 w-4 shrink-0" />{l.phone}</p>
                </div>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- CTA + newsletter ---------------- */
export function CtaNewsletter() {
  const [email, setEmail] = useState("");
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) { toast.error("That email looks a bit undercooked."); return; }
    toast.success("You're in! Watch your inbox for a free fries code. 🍟");
    setEmail("");
  };
  return (
    <section className="px-4 py-16 md:px-6">
      <div className="section-light relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] px-6 py-16 text-center md:py-24">
        <div aria-hidden className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-sauce/40 blur-3xl" />
        <div aria-hidden className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-lime/50 blur-3xl" />
        <h2 className="display-xl relative mx-auto max-w-4xl text-5xl md:text-8xl">Hungry yet?</h2>
        <p className="relative mx-auto mt-4 max-w-md text-charcoal/70">Join the Bunz Club for secret menu drops, birthday burgers and free fries on your first order.</p>
        <form onSubmit={submit} className="relative mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <label htmlFor="nl" className="sr-only">Email address</label>
          <Input id="nl" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="h-14 rounded-full border-charcoal/20 bg-cream px-6 text-charcoal placeholder:text-charcoal/40" />
          <Button type="submit" variant="hero" size="xl">Join the club</Button>
        </form>
        <Button asChild variant="link" className="relative mt-6 text-ketchup"><Link to="/menu">Or skip straight to the menu →</Link></Button>
      </div>
    </section>
  );
}
