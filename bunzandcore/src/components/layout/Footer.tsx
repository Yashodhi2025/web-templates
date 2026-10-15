import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Music2 } from "lucide-react";
import { brand, navLinks } from "@/lib/brand";
import { useGsap } from "@/components/animations/primitives";

export function Footer() {
  const ref = useGsap((gsap, root) => {
    gsap.from(root.querySelectorAll(".fw"), {
      yPercent: 100, stagger: 0.04, ease: "power3.out",
      scrollTrigger: { trigger: root, start: "top 95%", end: "bottom bottom", scrub: 1 },
    });
  });
  return (
    <footer className="relative overflow-hidden border-t pt-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="max-w-sm text-lg text-cream/80">{brand.description}</p>
          <div className="mt-6 flex gap-3">
            {[{ I: Instagram, l: "Instagram" }, { I: Music2, l: "TikTok" }, { I: Twitter, l: "X" }].map(({ I, l }) => (
              <a key={l} href="#" aria-label={l} className="grid h-11 w-11 place-items-center rounded-full glass transition hover:-translate-y-1 hover:text-sauce"><I className="h-5 w-5" /></a>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-4 text-sm uppercase tracking-widest text-muted-foreground">Explore</p>
          <ul className="space-y-2">
            {navLinks.map((l) => <li key={l.to}><Link to={l.to} className="hover:text-sauce">{l.label}</Link></li>)}
            <li><Link to="/checkout" className="hover:text-sauce">Checkout</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-4 text-sm uppercase tracking-widest text-muted-foreground">Say hi</p>
          <p>{brand.email}</p>
          <p>{brand.phone}</p>
        </div>
      </div>
      <div ref={ref as React.RefObject<HTMLDivElement>} className="mt-16 flex justify-center overflow-hidden px-2" aria-hidden>
        {brand.name.split("").map((c, i) => (
          <span key={i} className="fw display-xl inline-block whitespace-pre text-[19vw] leading-[0.8] text-gradient-sauce">{c}</span>
        ))}
      </div>
      <p className="py-6 text-center text-sm text-muted-foreground">© {new Date().getFullYear()} {brand.name} — {brand.tagline}</p>
    </footer>
  );
}
