import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useShop } from "@/lib/store";
import { brand, formatPrice, emi } from "@/lib/brand";
import { getProduct } from "@/data/products";
import { PhoneImage } from "@/components/shop/PhoneImage";
import { toast } from "sonner";

export const COUPONS: Record<string, number> = { PHONEX10: 0.1, NEWPHONE: 0.05 };

export function CartSheet() {
  const { cart, cartOpen, setCartOpen, setQty, remove } = useShop();
  const [code, setCode] = useState("");
  const [disc, setDisc] = useState(0);
  const sub = cart.reduce((a, c) => a + c.price * c.qty, 0);
  const total = sub * (1 - disc);
  const left = Math.max(0, brand.freeShippingAt - sub);

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="flex w-full flex-col bg-background sm:max-w-md">
        <SheetHeader><SheetTitle className="font-display text-2xl">Your bag</SheetTitle></SheetHeader>
        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <p className="text-muted-foreground">Your bag is empty. Let's fix that.</p>
            <Button asChild onClick={() => setCartOpen(false)}><Link to="/phones">Browse phones</Link></Button>
          </div>
        ) : (
          <>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">{left > 0 ? `Add ${formatPrice(left)} for free delivery` : "Free express delivery unlocked"}</p>
              <Progress value={Math.min(100, (sub / brand.freeShippingAt) * 100)} />
            </div>
            <ul className="-mx-2 flex-1 space-y-3 overflow-y-auto px-2">
              {cart.map((c) => {
                const p = getProduct(c.slug);
                return (
                  <li key={c.key} className="glass flex gap-3 rounded-2xl p-3 animate-in fade-in slide-in-from-right-4">
                    {p && <PhoneImage product={p} className="h-20 w-16 shrink-0" />}
                    <div className="flex-1">
                      <p className="font-medium leading-tight">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.color} · {c.variant}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button aria-label="Decrease" onClick={() => setQty(c.key, c.qty - 1)} className="grid h-7 w-7 place-items-center rounded-full glass"><Minus className="h-3 w-3" /></button>
                        <span className="w-5 text-center text-sm">{c.qty}</span>
                        <button aria-label="Increase" onClick={() => setQty(c.key, c.qty + 1)} className="grid h-7 w-7 place-items-center rounded-full glass"><Plus className="h-3 w-3" /></button>
                        <button aria-label="Remove" onClick={() => remove(c.key)} className="ml-auto text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </div>
                    <p className="font-semibold">{formatPrice(c.price * c.qty)}</p>
                  </li>
                );
              })}
            </ul>
            <div className="space-y-3 border-t pt-4">
              <div className="flex gap-2">
                <Input placeholder="Coupon code" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} />
                <Button variant="secondary" onClick={() => { const d = COUPONS[code]; if (d) { setDisc(d); toast.success(`${d * 100}% off applied`); } else toast.error("That code isn't valid"); }}>Apply</Button>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground"><span>Subtotal</span><span>{formatPrice(sub)}</span></div>
              {disc > 0 && <div className="flex justify-between text-sm text-mint"><span>Discount</span><span>-{formatPrice(sub * disc)}</span></div>}
              <div className="flex justify-between font-display text-xl font-bold"><span>Total</span><span>{formatPrice(total)}</span></div>
              <p className="text-xs text-muted-foreground">or {formatPrice(emi(total))}/month for 12 months at 0% EMI</p>
              <Button asChild size="lg" className="w-full rounded-full bg-gradient-brand shadow-glow" onClick={() => setCartOpen(false)}>
                <Link to="/checkout">Checkout</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
