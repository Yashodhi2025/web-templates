import { useRef } from "react";
import { Plus, Star } from "lucide-react";
import { toast } from "sonner";
import { signature } from "@/data/menu";
import { Tilt, useGsap } from "@/components/animations/primitives";
import { flyToCart, useCart } from "@/lib/cart";
import { money } from "@/lib/brand";

/** Horizontal pinned scroll of signature burgers (vertical stack on small screens). */
export function Signature() {
  const track = useRef<HTMLDivElement>(null);
  const add = useCart((s) => s.add);
  const ref = useGsap((gsap, root) => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const t = track.current!;
      gsap.to(t, {
        x: () => -(t.scrollWidth - window.innerWidth + 48),
        ease: "none",
        scrollTrigger: { trigger: root, pin: true, scrub: 1, start: "top top", end: () => `+=${t.scrollWidth - window.innerWidth}`, invalidateOnRefresh: true },
      });
    });
  });

  return (
    <section ref={ref} aria-labelledby="sig-h" className="relative overflow-hidden py-24 lg:flex lg:h-screen lg:items-center lg:py-0">
      <div ref={track} className="flex flex-col gap-6 px-6 lg:w-max lg:flex-row lg:items-center lg:gap-8 lg:pl-[8vw]">
        <div className="shrink-0 lg:w-[34vw]">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-sauce">Signature stack</p>
          <h2 id="sig-h" className="display-xl text-6xl md:text-8xl">The ones <span className="text-gradient-sauce">everyone</span> orders.</h2>
          <p className="mt-6 max-w-sm text-cream/70">Five burgers, endlessly refined. Scroll to meet the lineup.</p>
        </div>
        {signature.map((b, i) => (
          <Tilt key={b.id} data-cursor="ADD" className="shrink-0 lg:w-[30vw] lg:max-w-[440px]">
            <article className="shine group overflow-hidden rounded-3xl glass">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={b.image} alt={b.name} loading="lazy" width={1024} height={1024} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute left-4 top-4 font-display text-6xl font-extrabold text-cream/90">0{i + 1}</span>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent p-6 pt-24">
                  <div className="flex items-center gap-1 text-sm"><Star className="h-4 w-4 fill-sauce text-sauce" /> {b.rating}</div>
                  <h3 className="mt-1 font-display text-3xl font-bold">{b.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-cream/70">{b.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-display text-3xl font-bold">{money(b.price)}</span>
                    <button
                      aria-label={`Add ${b.name} to bag`}
                      onClick={(e) => { flyToCart(e.currentTarget, b.image); add({ id: b.id, name: b.name, price: b.price, image: b.image }); toast.success(`${b.name} added`); }}
                      className="inline-flex items-center gap-2 rounded-full bg-sauce px-5 py-3 font-semibold text-charcoal transition hover:scale-105"
                    >
                      <Plus className="h-4 w-4" /> Add
                    </button>
                  </div>
                </div>
              </div>
            </article>
          </Tilt>
        ))}
      </div>
    </section>
  );
}
