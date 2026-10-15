import { createFileRoute } from "@tanstack/react-router";
import { Beef, Leaf, Heart, Recycle } from "lucide-react";
import { Reveal, SplitText, useGsap } from "@/components/animations/primitives";
import kitchen from "@/assets/kitchen.jpg";
import truffle from "@/assets/burger-truffle.jpg";
import mojito from "@/assets/drink-mojito.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — BUNZ & CO." },
      { name: "description", content: "From a single flat-top in a borrowed garage to three cities. The story, kitchen and values behind BUNZ & CO." },
      { property: "og:title", content: "Our Story — BUNZ & CO." },
      { property: "og:description", content: "From one flat-top to three cities — the story behind BUNZ & CO." },
    ],
  }),
  component: About,
});

const timeline = [
  { y: "2018", t: "The garage", d: "One flat-top, one borrowed garage, one obsession: the perfect crust on a smash patty." },
  { y: "2019", t: "Street pop-ups", d: "Lines around the block at weekend markets. We sold out every Saturday for 40 weeks straight." },
  { y: "2021", t: "Mission District", d: "Our first real home on Valencia St — and the day the mojito bar was born." },
  { y: "2023", t: "SoHo calling", d: "New York got its first taste. The Truffle Boss joined the menu and never left." },
  { y: "2025", t: "Across the pond", d: "Shoreditch opens. Same smash, same sauce, now with a London accent." },
];

const values = [
  { I: Beef, t: "Dry-aged, never frozen", d: "Grass-fed chuck and brisket, ground fresh twice a day." },
  { I: Leaf, t: "Local first", d: "Produce from farms within 100 miles whenever the season allows." },
  { I: Heart, t: "Made with swagger", d: "Every burger is smashed, stacked and wrapped by hand." },
  { I: Recycle, t: "Zero-waste aim", d: "Compostable packaging and fry oil turned into biodiesel." },
];

function About() {
  const tl = useGsap((gsap, root) => {
    gsap.fromTo(".tl-line", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: root, start: "top 60%", end: "bottom 60%", scrub: true } });
    root.querySelectorAll(".tl-item").forEach((el) => gsap.from(el, { opacity: 0, x: -40, duration: 0.8, scrollTrigger: { trigger: el, start: "top 80%" } }));
  });
  const masks = useGsap((gsap, root) => {
    root.querySelectorAll(".mask").forEach((el) =>
      gsap.fromTo(el, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1.3, ease: "power4.inOut", scrollTrigger: { trigger: el, start: "top 85%" } }),
    );
  });

  return (
    <div className="pt-32">
      <section className="mx-auto max-w-7xl px-6">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-sauce">Our story</p>
        <SplitText as="h1" onScroll={false} text="Born on a flat-top. Raised on sauce." className="display-xl max-w-5xl text-6xl md:text-9xl" />
      </section>

      <section ref={masks} className="mx-auto mt-16 grid max-w-7xl gap-4 px-6 md:grid-cols-3">
        <img src={kitchen} alt="Our head chef smashing patties over open flame" className="mask aspect-[4/3] w-full rounded-3xl object-cover md:col-span-2 md:aspect-auto md:h-full" />
        <div className="grid gap-4">
          <img src={truffle} alt="Truffle Boss burger" loading="lazy" className="mask aspect-square w-full rounded-3xl object-cover" />
          <img src={mojito} alt="Classic mojito" loading="lazy" className="mask aspect-square w-full rounded-3xl object-cover" />
        </div>
      </section>

      <section ref={tl} aria-labelledby="tl-h" className="mx-auto max-w-3xl px-6 py-28">
        <h2 id="tl-h" className="display-xl mb-14 text-5xl md:text-7xl">How we got here</h2>
        <ol className="relative space-y-14 pl-10">
          <span aria-hidden className="absolute left-[7px] top-2 h-full w-0.5 bg-border" />
          <span aria-hidden className="tl-line absolute left-[7px] top-2 h-full w-0.5 origin-top bg-gradient-sauce" />
          {timeline.map((t) => (
            <li key={t.y} className="tl-item relative">
              <span className="absolute -left-10 top-2 h-4 w-4 rounded-full border-4 border-charcoal bg-sauce" />
              <p className="font-display text-xl font-bold text-sauce">{t.y}</p>
              <h3 className="font-display text-3xl font-bold">{t.t}</h3>
              <p className="mt-2 text-cream/70">{t.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section-light py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="display-xl mb-12 text-5xl md:text-7xl">What we stand for</h2>
          <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ I, t, d }) => (
              <div key={t} className="reveal group rounded-3xl border border-charcoal/10 p-7 transition hover:-translate-y-2 hover:bg-charcoal hover:text-cream">
                <I className="h-10 w-10 text-ketchup transition-transform group-hover:rotate-12 group-hover:scale-110" />
                <h3 className="mt-6 font-display text-2xl font-bold">{t}</h3>
                <p className="mt-2 opacity-70">{d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </div>
  );
}
