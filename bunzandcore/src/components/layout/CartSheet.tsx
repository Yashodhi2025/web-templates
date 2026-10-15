import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cartTotal, useCart } from "@/lib/cart";
import { money } from "@/lib/brand";

export function CartSheet() {
  const { lines, open, setOpen, setQty, remove } = useCart();
  const total = cartTotal(lines);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col border-glass-border bg-charcoal/95 backdrop-blur-xl sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-display text-3xl font-extrabold">Your bag</SheetTitle>
        </SheetHeader>
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <p className="text-5xl">🍔</p>
            <p className="text-muted-foreground">Your bag is hungry. Feed it something.</p>
            <Button asChild variant="hero" onClick={() => setOpen(false)}><Link to="/menu">Browse menu</Link></Button>
          </div>
        ) : (
          <>
            <ul className="-mx-2 flex-1 space-y-3 overflow-y-auto px-2" data-lenis-prevent>
              {lines.map((l) => (
                <li key={l.key} className="flex gap-3 rounded-2xl glass p-3">
                  <img src={l.image} alt={l.name} className="h-16 w-16 shrink-0 rounded-xl object-cover" loading="lazy" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{l.name}</p>
                    {l.note && <p className="truncate text-xs text-muted-foreground">{l.note}</p>}
                    <div className="mt-2 flex items-center gap-2">
                      <button aria-label="Decrease" onClick={() => setQty(l.key, l.qty - 1)} className="grid h-7 w-7 place-items-center rounded-full bg-secondary"><Minus className="h-3 w-3" /></button>
                      <span className="w-5 text-center text-sm tabular-nums">{l.qty}</span>
                      <button aria-label="Increase" onClick={() => setQty(l.key, l.qty + 1)} className="grid h-7 w-7 place-items-center rounded-full bg-secondary"><Plus className="h-3 w-3" /></button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <span className="font-semibold tabular-nums">{money(l.price * l.qty)}</span>
                    <button aria-label={`Remove ${l.name}`} onClick={() => remove(l.key)} className="text-muted-foreground hover:text-ketchup"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-4 border-t pt-4">
              <div className="flex justify-between text-lg"><span>Subtotal</span><span className="font-display font-bold">{money(total)}</span></div>
              <Button asChild variant="hero" size="xl" className="w-full" onClick={() => setOpen(false)}>
                <Link to="/checkout">Checkout</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
