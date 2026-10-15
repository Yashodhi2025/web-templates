import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Star, Plus, GitCompare } from "lucide-react";
import { toast } from "sonner";
import { priceOf, type Product } from "@/data/products";
import { useShop } from "@/lib/store";
import { formatPrice, emi } from "@/lib/brand";
import { useTilt, gsap } from "@/hooks/use-motion";
import { PhoneImage } from "./PhoneImage";
import { cn } from "@/lib/utils";

export function ProductCard({ product, list }: { product: Product; list?: boolean }) {
  const [ci, setCi] = useState(0);
  const tilt = useTilt<HTMLDivElement>(6);
  const { wishlist, compare, toggleWish, toggleCompare, add, setCartOpen } = useShop();
  const wished = wishlist.includes(product.slug);
  const compared = compare.includes(product.slug);
  const price = priceOf(product);
  const off = product.salePrice ? Math.round((1 - product.salePrice / product.price) * 100) : 0;
  const to = product.category === "phone" ? "/phones/$slug" : "/accessories/$slug";

  return (
    <div ref={tilt} data-flip-id={product.id} className={cn("spotlight group glass rounded-3xl p-4 will-change-transform", list && "flex gap-6")}>
      <div className={cn("relative rounded-2xl bg-secondary/60", list ? "w-48 shrink-0" : "")}>
        <Link to={to} params={{ slug: product.slug }} aria-label={`View ${product.name}`}>
          <PhoneImage product={product} color={product.colorways[ci]} className="aspect-square p-6 transition-transform duration-500 group-hover:scale-105" />
        </Link>
        {off > 0 && <span className="absolute left-3 top-3 rounded-full bg-gradient-brand px-2.5 py-1 text-xs font-semibold text-primary-foreground">-{off}%</span>}
        <button
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            toggleWish(product.slug);
            gsap.fromTo(e.currentTarget, { scale: 0.6 }, { scale: 1, duration: 0.5, ease: "back.out(4)" });
          }}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full glass"
        >
          <Heart className={cn("h-4 w-4", wished && "fill-destructive text-destructive")} />
        </button>
      </div>
      <div className="mt-4 flex-1 space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{product.brand} · {product.condition}</span>
          <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-primary text-primary" />{product.rating.toFixed(1)}</span>
        </div>
        <Link to={to} params={{ slug: product.slug }} className="block font-display text-lg font-semibold leading-tight hover:text-primary">{product.name}</Link>
        {product.category === "phone" && (
          <div className="flex flex-wrap gap-1.5">
            {[product.specs.Chip, `${product.numeric.ram}GB RAM`, `${product.numeric.camera}MP`].map((s) => (
              <span key={s} className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground">{s}</span>
            ))}
          </div>
        )}
        <div className="flex gap-1.5 pt-1">
          {product.colorways.map((c, i) => (
            <button key={c.name} aria-label={c.name} onClick={() => setCi(i)}
              className={cn("h-4 w-4 rounded-full ring-offset-2 ring-offset-card transition", i === ci && "ring-2 ring-primary")}
              style={{ background: c.hex }} />
          ))}
        </div>
        <div className="flex items-end justify-between pt-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl font-bold">{formatPrice(price)}</span>
              {product.salePrice && <span className="text-xs text-muted-foreground line-through">{formatPrice(product.price)}</span>}
            </div>
            <p className="text-xs text-mint">or {formatPrice(emi(price))}/mo · 0% EMI</p>
          </div>
          <div className="flex gap-2">
            {product.category === "phone" && (
              <button aria-label="Compare" onClick={() => { if (!toggleCompare(product.slug)) toast.error("Compare holds up to 3 phones"); }}
                className={cn("grid h-10 w-10 place-items-center rounded-full glass transition", compared && "bg-primary text-primary-foreground")}>
                <GitCompare className="h-4 w-4" />
              </button>
            )}
            <button aria-label="Add to cart"
              onClick={() => {
                const v = product.variants[0];
                add({ slug: product.slug, name: product.name, price: v.price, color: product.colorways[ci].name, variant: v.storage ? `${v.ram}/${v.storage}GB` : "Standard" });
                toast.success(`${product.name} added`, { action: { label: "View cart", onClick: () => setCartOpen(true) } });
              }}
              className="grid h-10 w-10 place-items-center rounded-full bg-gradient-brand text-primary-foreground shadow-glow transition hover:scale-110">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
