import { Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import heroBurger from "@/assets/hero-burger.png";
import { Button } from "@/components/ui/button";
import { Magnet, SplitText, useGsap } from "@/components/animations/primitives";
import { brand } from "@/lib/brand";

const bits = [
  { e: "🥬", c: "left-[8%] top-[22%] text-5xl", s: -120 },
  { e: "🍅", c: "right-[10%] top-[18%] text-5xl", s: -200 },
  { e: "🧀", c: "left-[14%] bottom-[18%] text-6xl", s: -160 },
  { e: "🥒", c: "right-[16%] bottom-[22%] text-4xl", s: -260 },
  { e: "🧅", c: "left-[42%] top-[12%] text-3xl", s: -90 },
];

export function Hero() {
  const burger = useRef<HTMLDivElement>(null);

  const ref = useGsap((gsap, root) => {
    gsap.from(".hero-fade", { y: 30, opacity: 0, duration: 1, stagger: 0.12, delay: 0.5, ease: "power3.out" });
    gsap.from(".hero-burger", { scale: 0.6, rotate: -20, opacity: 0, duration: 1.4, ease: "back.out(1.4)", delay: 0.3 });
    root.querySelectorAll<HTMLElement>(".bit").forEach((b) => {
      gsap.to(b, { y: Number(b.dataset["s"]), rotate: 90, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true } });
    });
    gsap.to(".hero-burger", { yPercent: 25, scale: 0.85, ease: "none", scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true } });
  });

  useEffect(() => {
    const el = burger.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const on = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      el.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.2}deg)`;
    };
    window.addEventListener("pointermove", on);
    return () => window.removeEventListener("pointermove", on);
  }, []);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16">
      {/* Aurora background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -left-1/4 top-0 h-[70vh] w-[70vw] animate-aurora rounded-full bg-sauce/25 blur-[120px]" />
        <div className="absolute -right-1/4 bottom-0 h-[60vh] w-[60vw] animate-aurora rounded-full bg-ketchup/20 blur-[120px] [animation-delay:-6s]" />
        <div className="absolute left-1/3 top-1/3 h-[30vh] w-[30vw] animate-aurora rounded-full bg-lime/10 blur-[100px] [animation-delay:-3s]" />
      </div>
      {bits.map((b, i) => (
        <span key={i} data-s={b.s} aria-hidden className={`bit absolute hidden select-none drop-shadow-2xl md:block ${b.c}`}>{b.e}</span>
      ))}

      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="relative z-10">
          <p className="hero-fade mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-lime" /> Now grilling in 3 cities
          </p>
          <SplitText as="h1" onScroll={false} delay={0.2} text="Stacked right. Served bold." className="display-xl text-[17vw] sm:text-[13vw] lg:text-[7.6rem]" />
          <p className="hero-fade mt-6 max-w-md text-lg text-cream/75">
            Dry-aged smash patties, brioche baked at dawn and mojitos muddled to order. {brand.name} is the burger bar your cravings have been waiting for.
          </p>
          <div className="hero-fade mt-8 flex flex-wrap gap-3">
            <Magnet><Button asChild variant="hero" size="xl"><Link to="/menu">Order Now <ArrowRight /></Link></Button></Magnet>
            <Magnet><Button asChild variant="glass" size="xl"><Link to="/menu">View Menu</Link></Button></Magnet>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[560px]">
          <div aria-hidden className="absolute inset-[12%] rounded-full bg-gradient-sauce opacity-40 blur-3xl" />
          <div ref={burger} className="relative h-full w-full transition-transform duration-500 ease-out">
            <img src={heroBurger} alt="The OG Double — two smash patties, melted cheddar, lettuce and tomato on a sesame brioche" width={1024} height={1024} fetchPriority="high" className="hero-burger h-full w-full animate-float object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)]" />
          </div>
          {/* rotating circular badge */}
          <div className="absolute -left-2 bottom-6 h-28 w-28 md:h-36 md:w-36" aria-label="Hot and fresh">
            <svg viewBox="0 0 100 100" className="h-full w-full animate-spin-slow">
              <defs><path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
              <circle cx="50" cy="50" r="49" className="fill-lime" />
              <text className="fill-charcoal font-display text-[11px] font-extrabold tracking-[0.2em]"><textPath href="#circ">HOT & FRESH • HOT & FRESH • </textPath></text>
            </svg>
            <span className="absolute inset-0 grid place-items-center text-3xl">🔥</span>
          </div>
        </div>
      </div>
    </section>
  );
}
