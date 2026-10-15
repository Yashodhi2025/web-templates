import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cartTotal, useCart } from "@/lib/cart";
import { money } from "@/lib/brand";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — BUNZ & CO." },
      { name: "description", content: "Review your bag and place your BUNZ & CO. order for pickup or delivery." },
      { property: "og:title", content: "Checkout — BUNZ & CO." },
      { property: "og:description", content: "Review your bag and place your order." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  phone: z.string().trim().regex(/^[+\d\s()-]{7,20}$/, "Enter a valid phone"),
  address: z.string().trim().min(5, "Address is required").max(200),
  card: z.string().refine((v) => /^\d{16}$/.test(v.replace(/\s/g, "")), "16-digit card number"),
});
type FormV = z.infer<typeof schema>;

function Confetti() {
  const colors = ["bg-sauce", "bg-lime", "bg-ketchup", "bg-cream", "bg-berry"];
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] overflow-hidden">
      {Array.from({ length: 80 }).map((_, i) => (
        <span key={i} className={`absolute top-[-5%] h-3 w-2 rounded-sm ${colors[i % 5]}`}
          style={{ left: `${(i * 37) % 100}%`, animation: `confetti ${2 + (i % 5) * 0.4}s ${(i % 10) * 0.08}s ease-in forwards` }} />
      ))}
      <style>{`@keyframes confetti{to{transform:translateY(110vh) rotate(720deg);opacity:.8}}`}</style>
    </div>
  );
}

function Checkout() {
  const { lines, clear } = useCart();
  const [mounted, setMounted] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  useEffect(() => setMounted(true), []);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormV>({ resolver: zodResolver(schema) });
  const sub = cartTotal(lines);
  const fee = sub > 0 ? 2.99 : 0;
  const tax = sub * 0.08;

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 900));
    setDone(`BZ-${Math.floor(1000 + Math.random() * 9000)}`);
    clear();
  };

  if (done) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-6 pt-28">
        <Confetti />
        <div className="max-w-md text-center">
          <CheckCircle2 className="mx-auto h-20 w-20 text-lime" />
          <h1 className="display-xl mt-6 text-6xl">Order's on the grill!</h1>
          <p className="mt-4 text-cream/75">Order <b className="text-sauce">{done}</b> confirmed. Estimated ready time: 18 minutes.</p>
          <Button asChild variant="hero" size="xl" className="mt-8"><Link to="/">Back home</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pt-32 pb-12">
      <h1 className="display-xl text-6xl md:text-8xl">Checkout</h1>
      {mounted && lines.length === 0 ? (
        <div className="mt-12 rounded-3xl glass p-12 text-center">
          <p className="text-lg text-muted-foreground">Your bag is empty.</p>
          <Button asChild variant="hero" size="xl" className="mt-6"><Link to="/menu">Browse the menu</Link></Button>
        </div>
      ) : (
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 rounded-3xl glass p-6 md:p-8">
            <h2 className="font-display text-2xl font-bold">Delivery details</h2>
            {([["name", "Full name", "text"], ["phone", "Phone", "tel"], ["address", "Delivery address", "text"], ["card", "Card number (demo)", "text"]] as const).map(([k, l, t]) => (
              <div key={k}>
                <label htmlFor={k} className="mb-1.5 block text-sm font-semibold">{l}</label>
                <Input id={k} type={t} inputMode={k === "card" ? "numeric" : undefined} placeholder={k === "card" ? "4242 4242 4242 4242" : undefined} {...register(k)} aria-invalid={!!errors[k]} className="h-12 rounded-xl bg-secondary" />
                {errors[k] && <p className="mt-1 text-sm text-ketchup">{errors[k]?.message}</p>}
              </div>
            ))}
            <Button type="submit" variant="hero" size="xl" className="w-full" disabled={isSubmitting}>{isSubmitting ? "Placing order…" : `Place order · ${money(sub + fee + tax)}`}</Button>
            <p className="text-center text-xs text-muted-foreground">Demo checkout — no real payment is taken.</p>
          </form>
          <aside className="h-fit rounded-3xl glass p-6 lg:sticky lg:top-28">
            <h2 className="font-display text-2xl font-bold">Order summary</h2>
            <ul className="mt-4 space-y-3">
              {mounted && lines.map((l) => (
                <li key={l.key} className="flex items-center gap-3">
                  <img src={l.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1"><p className="truncate font-semibold">{l.qty}× {l.name}</p>{l.note && <p className="truncate text-xs text-muted-foreground">{l.note}</p>}</div>
                  <span className="tabular-nums">{money(l.qty * l.price)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-6 space-y-2 border-t pt-4 text-sm">
              <div className="flex justify-between"><dt>Subtotal</dt><dd>{money(sub)}</dd></div>
              <div className="flex justify-between"><dt>Delivery</dt><dd>{money(fee)}</dd></div>
              <div className="flex justify-between"><dt>Tax</dt><dd>{money(tax)}</dd></div>
              <div className="flex justify-between pt-2 font-display text-xl font-bold"><dt>Total</dt><dd>{money(sub + fee + tax)}</dd></div>
            </dl>
          </aside>
        </div>
      )}
    </div>
  );
}
