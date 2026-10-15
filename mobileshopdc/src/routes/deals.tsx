import { createFileRoute } from "@tanstack/react-router";
import { Copy, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { allProducts } from "@/data/products";
import { PageHeader, meta } from "@/components/sections/PageHeader";
import { Countdown } from "@/components/sections/Countdown";
import { ProductCard } from "@/components/shop/ProductCard";

export const Route = createFileRoute("/deals")({
  head: () => meta("Deals & Flash Sales", "Flash sales, bank offers and coupon codes on phones and accessories."),
  component: Deals,
});

const coupons = [{ c: "PHONEX10", d: "10% off your order" }, { c: "NEWPHONE", d: "5% off any phone" }];

function Deals() {
  const deals = allProducts.filter((p) => p.tags.includes("deal"));
  return (
    <>
      <PageHeader eyebrow="Flash sale" title="Deals that won't last." />
      <div className="mx-auto max-w-7xl space-y-16 px-6">
        <div className="glass flex flex-wrap items-center justify-between gap-6 rounded-3xl p-6">
          <p className="font-display text-2xl font-bold">Today's flash sale ends in</p>
          <Countdown className="flex items-center" />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[["HDFC Bank", "10% instant discount up to ₹5,000"], ["ICICI Bank", "No-cost EMI up to 24 months"]].map(([b, t]) => (
            <div key={b} className="relative overflow-hidden rounded-3xl bg-gradient-brand p-8 text-primary-foreground">
              <CreditCard className="h-8 w-8" /><p className="mt-6 text-sm opacity-80">{b}</p><p className="font-display text-2xl font-bold">{t}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {coupons.map(({ c, d }) => (
            <button key={c} onClick={() => { navigator.clipboard.writeText(c); toast.success(`${c} copied`); }} className="glass flex items-center justify-between rounded-3xl border-dashed p-6 text-left transition hover:border-primary">
              <span><span className="font-mono text-2xl font-bold text-gradient">{c}</span><br /><span className="text-sm text-muted-foreground">{d}</span></span>
              <Copy className="h-5 w-5" />
            </button>
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{deals.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </div>
    </>
  );
}
