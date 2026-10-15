import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Check, PartyPopper } from "lucide-react";
import { useShop } from "@/lib/store";
import { formatPrice } from "@/lib/brand";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { meta } from "@/components/sections/PageHeader";
import { gsap } from "@/hooks/use-motion";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => meta("Checkout", "Secure checkout with delivery, EMI and payment options."),
  component: Checkout,
});

const details = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  email: z.string().trim().email("Enter a valid email"),
  phone: z.string().regex(/^\d{10}$/, "10-digit mobile number"),
  address: z.string().trim().min(8, "Enter your full address").max(200),
  pincode: z.string().regex(/^\d{6}$/, "6-digit pincode"),
});
type Details = z.infer<typeof details>;
const steps = ["Details", "Delivery", "Payment", "Review"];

function Checkout() {
  const { cart, clear } = useShop();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Details>({ name: "", email: "", phone: "", address: "", pincode: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof Details, string>>>({});
  const [delivery, setDelivery] = useState("express");
  const [pay, setPay] = useState("emi");
  const [done, setDone] = useState<string | null>(null);
  const sub = cart.reduce((a, c) => a + c.price * c.qty, 0);
  const ship = delivery === "sameday" ? 199 : 0;

  const next = () => {
    if (step === 0) {
      const r = details.safeParse(form);
      if (!r.success) { setErrors(Object.fromEntries(r.error.issues.map((i) => [i.path[0], i.message]))); return; }
      setErrors({});
    }
    if (step === 3) { setDone(`PX${Date.now().toString().slice(-6)}`); clear(); return; }
    setStep(step + 1);
  };

  if (done) return <Success id={done} />;

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-6 pt-32 lg:grid-cols-[1fr_360px]">
      <div>
        <h1 className="font-display text-5xl font-extrabold">Checkout</h1>
        <ol className="mt-8 flex gap-2">
          {steps.map((s, i) => (
            <li key={s} className="flex-1">
              <div className={cn("h-1 rounded-full transition-colors duration-500", i <= step ? "bg-gradient-brand" : "bg-secondary")} />
              <p className={cn("mt-2 text-xs", i === step ? "text-foreground" : "text-muted-foreground")}>{s}</p>
            </li>
          ))}
        </ol>
        <div key={step} className="glass mt-8 space-y-4 rounded-3xl p-6 animate-in fade-in slide-in-from-right-6 duration-500">
          {step === 0 && (Object.keys(form) as (keyof Details)[]).map((k) => (
            <div key={k}>
              <Label htmlFor={k} className="capitalize">{k}</Label>
              <Input id={k} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className="mt-1" aria-invalid={!!errors[k]} />
              {errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>}
            </div>
          ))}
          {step === 1 && (
            <RadioGroup value={delivery} onValueChange={setDelivery} className="space-y-2">
              {[["express", "Express — tomorrow", "Free"], ["sameday", "Same day — within 4 hours", "₹199"], ["store", "Pick up in store", "Free"]].map(([v, l, p]) => (
                <label key={v} className="glass flex items-center gap-3 rounded-2xl p-4"><RadioGroupItem value={v} />{l}<span className="ml-auto text-sm text-muted-foreground">{p}</span></label>
              ))}
            </RadioGroup>
          )}
          {step === 2 && (
            <RadioGroup value={pay} onValueChange={setPay} className="space-y-2">
              {[["emi", "0% EMI — 12 months"], ["card", "Credit / Debit card"], ["upi", "UPI"], ["cod", "Cash on delivery"]].map(([v, l]) => (
                <label key={v} className="glass flex items-center gap-3 rounded-2xl p-4"><RadioGroupItem value={v} />{l}</label>
              ))}
              <p className="text-xs text-muted-foreground">Demo store: no real payment is taken.</p>
            </RadioGroup>
          )}
          {step === 3 && (
            <div className="space-y-2 text-sm">
              <p><span className="text-muted-foreground">Ship to:</span> {form.name}, {form.address} — {form.pincode}</p>
              <p><span className="text-muted-foreground">Delivery:</span> {delivery}</p>
              <p><span className="text-muted-foreground">Payment:</span> {pay.toUpperCase()}</p>
            </div>
          )}
          <div className="flex justify-between pt-4">
            <Button variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</Button>
            <Button className="rounded-full bg-gradient-brand" disabled={!cart.length} onClick={next}>{step === 3 ? "Place order" : "Continue"}</Button>
          </div>
        </div>
      </div>
      <aside className="glass h-fit rounded-3xl p-6 lg:sticky lg:top-24">
        <h2 className="font-display text-xl font-bold">Order summary</h2>
        {cart.length === 0 && <p className="mt-4 text-sm text-muted-foreground">Your bag is empty. <Link to="/phones" className="text-primary">Shop phones</Link></p>}
        <ul className="mt-4 space-y-3 text-sm">
          {cart.map((c) => <li key={c.key} className="flex justify-between gap-2"><span>{c.qty}× {c.name}<br /><span className="text-xs text-muted-foreground">{c.color} · {c.variant}</span></span><span>{formatPrice(c.price * c.qty)}</span></li>)}
        </ul>
        <div className="mt-4 space-y-1 border-t pt-4 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{ship ? formatPrice(ship) : "Free"}</span></div>
          <div className="flex justify-between font-display text-xl font-bold"><span>Total</span><span>{formatPrice(sub + ship)}</span></div>
        </div>
      </aside>
    </div>
  );
}

function Success({ id }: { id: string }) {
  useEffect(() => {
    const colors = ["var(--primary)", "var(--violet)", "var(--mint)"];
    const bits = Array.from({ length: 80 }, (_, i) => {
      const d = document.createElement("div");
      Object.assign(d.style, { position: "fixed", left: "50%", top: "40%", width: "8px", height: "12px", background: colors[i % 3], zIndex: "999", borderRadius: "2px", pointerEvents: "none" });
      document.body.appendChild(d);
      gsap.to(d, { x: gsap.utils.random(-500, 500), y: gsap.utils.random(-300, 500), rotate: gsap.utils.random(-720, 720), opacity: 0, duration: gsap.utils.random(1.2, 2.4), ease: "power3.out", onComplete: () => d.remove() });
      return d;
    });
    return () => bits.forEach((b) => b.remove());
  }, []);
  return (
    <div className="mx-auto max-w-xl px-6 pt-40 text-center">
      <div className="mx-auto grid h-28 w-28 place-items-center rounded-3xl bg-gradient-brand shadow-glow animate-in zoom-in spin-in-12 duration-700"><PartyPopper className="h-12 w-12 text-primary-foreground" /></div>
      <h1 className="mt-8 font-display text-5xl font-extrabold">Order placed!</h1>
      <p className="mt-3 text-muted-foreground">Order <span className="font-mono text-foreground">{id}</span> is being packed. We'll text you tracking updates.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Button asChild className="rounded-full bg-gradient-brand"><Link to="/track"><Check className="h-4 w-4" /> Track order</Link></Button>
        <Button asChild variant="secondary" className="rounded-full"><Link to="/">Back home</Link></Button>
      </div>
    </div>
  );
}
