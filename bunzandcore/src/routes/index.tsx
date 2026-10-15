import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { Signature } from "@/components/sections/Signature";
import { Builder } from "@/components/sections/Builder";
import { CtaNewsletter, Combos, Drinks, Gallery, Locations, Stats, Testimonials } from "@/components/sections/HomeSections";
import { Marquee } from "@/components/animations/primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BUNZ & CO. — Gourmet Burgers, Buns & Mojitos" },
      { name: "description", content: "Dry-aged smash burgers, brioche buns and hand-muddled mojitos. Stacked right. Served bold." },
      { property: "og:title", content: "BUNZ & CO. — Gourmet Burgers, Buns & Mojitos" },
      { property: "og:description", content: "Dry-aged smash burgers, brioche buns and hand-muddled mojitos. Stacked right. Served bold." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <div className="-rotate-2 border-y bg-sauce py-5 text-charcoal">
        <Marquee items={["BURGERS", "BUNS", "MOJITOS", "SHAKES", "FRIES"]} />
      </div>
      <Signature />
      <Builder />
      <Drinks />
      <Combos />
      <Stats />
      <Testimonials />
      <Gallery />
      <Locations />
      <CtaNewsletter />
    </>
  );
}
