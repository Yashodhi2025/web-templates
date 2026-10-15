import { createFileRoute, Link } from "@tanstack/react-router";
import { getProduct } from "@/data/products";
import { useShop } from "@/lib/store";
import { PageHeader, meta } from "@/components/sections/PageHeader";
import { ProductCard } from "@/components/shop/ProductCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/wishlist")({
  head: () => meta("Wishlist", "Phones and accessories you've saved for later."),
  component: () => {
    const { wishlist } = useShop();
    const items = wishlist.map(getProduct).filter((p): p is NonNullable<typeof p> => !!p);
    return (
      <>
        <PageHeader eyebrow="Wishlist" title="Saved for later." />
        <div className="mx-auto max-w-7xl px-6">
          {items.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{items.map((p) => <ProductCard key={p.id} product={p} />)}</div>
          ) : (
            <div className="glass rounded-3xl p-16 text-center"><p className="text-muted-foreground">Tap the heart on any product to save it here.</p><Button asChild className="mt-6 rounded-full bg-gradient-brand"><Link to="/phones">Browse phones</Link></Button></div>
          )}
        </div>
      </>
    );
  },
});
