import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Heart, GitCompare, Star, Truck, Tag, Check } from "lucide-react";
import { toast } from "sonner";
import { accessoriesList, phones, priceOf, type Product } from "@/data/products";
import { useShop } from "@/lib/store";
import { formatPrice } from "@/lib/brand";
import { gsap } from "@/hooks/use-motion";
import { PhoneImage } from "./PhoneImage";
import { ProductCard } from "./ProductCard";
import { CountUp } from "@/components/sections/Countdown";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export function ProductDetail({ product: p }: { product: Product }) {
  const [ci, setCi] = useState(0);
  const [vi, setVi] = useState(0);
  const [back, setBack] = useState(false);
  const [months, setMonths] = useState(12);
  const [pin, setPin] = useState("");
  const [care, setCare] = useState(false);
  const [qty, setQty] = useState(1);
  const imgRef = useRef<HTMLDivElement>(null);
  const { add, toggleWish, toggleCompare, wishlist, compare, setCartOpen } = useShop();
  const v = p.variants[vi];
  const price = v.price + (care ? 4999 : 0);
  const c = p.colorways[ci];
  const isPhone = p.category === "phone";
  const similar = (isPhone ? phones : accessoriesList).filter((x) => x.id !== p.id).slice(0, 4);
  const bundle = accessoriesList.filter((a) => ["magsafe-leather-case", "65w-gan-charger", "tempered-glass-guard"].includes(a.slug));
  const variantLabel = v.storage ? `${v.ram}GB / ${v.storage}GB` : "Standard";

  const addToCart = (open = false) => {
    add({ slug: p.slug, name: p.name, price, color: c.name, variant: variantLabel + (care ? " + Care" : "") }, qty);
    // fly-to-cart: clone image and arc it to the top-right cart icon
    const src = imgRef.current;
    const cart = document.querySelector('[aria-label="Cart"]');
    if (src && cart) {
      const a = src.getBoundingClientRect(), b = cart.getBoundingClientRect();
      const ghost = src.cloneNode(true) as HTMLElement;
      Object.assign(ghost.style, { position: "fixed", left: `${a.left}px`, top: `${a.top}px`, width: `${a.width}px`, height: `${a.height}px`, zIndex: "999", pointerEvents: "none" });
      document.body.appendChild(ghost);
      gsap.timeline({ onComplete: () => ghost.remove() })
        .to(ghost, { x: (b.left - a.left) / 2, y: -80, scale: 0.5, duration: 0.4, ease: "power2.out" })
        .to(ghost, { x: b.left - a.left - a.width / 2 + 20, y: b.top - a.top - a.height / 2 + 20, scale: 0.05, opacity: 0.4, duration: 0.5, ease: "power2.in" });
    }
    toast.success(`${p.name} added to bag`);
    if (open) setTimeout(() => setCartOpen(true), 900);
  };

  const schema = { "@context": "https://schema.org", "@type": "Product", name: p.name, brand: p.brand, aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviews }, offers: { "@type": "Offer", price: priceOf(p), priceCurrency: "INR", availability: "https://schema.org/InStock" } };

  return (
    <div className="mx-auto max-w-7xl px-6 pt-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink asChild><Link to={isPhone ? "/phones" : "/accessories"}>{isPhone ? "Phones" : "Accessories"}</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>{p.name}</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <div className="glass relative overflow-hidden rounded-[2rem]" data-cursor="ZOOM">
            <div className="absolute inset-0 opacity-30 transition-[background] duration-700" style={{ background: `radial-gradient(circle at 50% 40%, ${c.hex}, transparent 70%)` }} />
            <div ref={imgRef} className="relative">
              <PhoneImage key={`${ci}-${back}`} product={p} color={c} back={back} eager className="aspect-square p-10 animate-in fade-in zoom-in-95 duration-500 transition-transform hover:scale-110" />
            </div>
          </div>
          {isPhone && (
            <div className="mt-4 flex gap-3">
              {[false, true].map((b) => (
                <button key={String(b)} onClick={() => setBack(b)} className={cn("glass h-20 w-20 rounded-2xl p-2", back === b && "ring-2 ring-primary")} aria-label={b ? "Back view" : "Front view"}>
                  <PhoneImage product={p} color={c} back={b} className="h-full" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground">{p.brand} · {p.condition}</p>
            <h1 className="mt-1 font-display text-4xl font-extrabold md:text-5xl">{p.name}</h1>
            <p className="mt-2 flex items-center gap-1 text-sm"><Star className="h-4 w-4 fill-primary text-primary" />{p.rating.toFixed(1)} <span className="text-muted-foreground">({p.reviews} reviews)</span></p>
          </div>
          <div className="flex items-baseline gap-3">
            <span key={price} className="font-display text-4xl font-bold animate-in fade-in slide-in-from-bottom-2">{formatPrice(price)}</span>
            {p.salePrice && <span className="text-muted-foreground line-through">{formatPrice(p.price + (v.price - p.variants[0].price))}</span>}
          </div>

          <div>
            <p className="mb-2 text-sm">Colour — <span className="text-muted-foreground">{c.name}</span></p>
            <div className="flex gap-3">
              {p.colorways.map((cw, i) => <button key={cw.name} aria-label={cw.name} onClick={() => setCi(i)} className={cn("h-9 w-9 rounded-full ring-offset-4 ring-offset-background transition", i === ci && "ring-2 ring-primary")} style={{ background: cw.hex }} />)}
            </div>
          </div>

          {isPhone && (
            <div>
              <p className="mb-2 text-sm">Storage</p>
              <div className="grid grid-cols-3 gap-2">
                {p.variants.map((vv, i) => (
                  <button key={i} disabled={!vv.inStock} onClick={() => setVi(i)} className={cn("glass rounded-2xl p-3 text-left text-sm transition disabled:opacity-40", i === vi && "ring-2 ring-primary")}>
                    <p className="font-semibold">{vv.storage}GB</p>
                    <p className="text-xs text-muted-foreground">{vv.inStock ? formatPrice(vv.price) : "Sold out"}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="glass rounded-3xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">0% EMI calculator</p>
              <Select value={String(months)} onValueChange={(m) => setMonths(Number(m))}>
                <SelectTrigger className="w-32 rounded-full"><SelectValue /></SelectTrigger>
                <SelectContent>{[3, 6, 9, 12, 18, 24].map((m) => <SelectItem key={m} value={String(m)}>{m} months</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <Slider className="mt-4" min={3} max={24} step={3} value={[months]} onValueChange={(m) => setMonths(m[0])} />
            <p className="mt-3 font-display text-2xl font-bold text-mint"><CountUp key={months + price} to={Math.ceil(price / months)} /> ₹/month</p>
          </div>

          {isPhone && <label className="flex items-center gap-3 text-sm"><Checkbox checked={care} onCheckedChange={(v) => setCare(!!v)} /> Add PHONEX Care+ (2 yr damage cover) — {formatPrice(4999)}</label>}

          <div className="flex gap-2">
            <Input placeholder="Pincode" maxLength={6} value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))} className="rounded-full" />
            <Button variant="secondary" className="rounded-full" onClick={() => pin.length === 6 ? toast.success(`Delivery to ${pin}: tomorrow by 9pm`, { icon: <Truck className="h-4 w-4" /> }) : toast.error("Enter a 6-digit pincode")}>Check</Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="glass flex items-center rounded-full">
              <button className="px-4 py-3" aria-label="Decrease" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
              <span className="w-6 text-center">{qty}</span>
              <button className="px-4 py-3" aria-label="Increase" onClick={() => setQty(qty + 1)}>+</button>
            </div>
            <Button size="lg" data-cursor="ADD" className="flex-1 rounded-full bg-gradient-brand shadow-glow" onClick={() => addToCart()}>Add to bag</Button>
            <Button size="lg" variant="secondary" className="rounded-full" onClick={() => addToCart(true)}>Buy now</Button>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => toggleWish(p.slug)}><Heart className={cn("h-4 w-4", wishlist.includes(p.slug) && "fill-destructive text-destructive")} /> Wishlist</Button>
            {isPhone && <Button variant="ghost" onClick={() => { if (!toggleCompare(p.slug)) toast.error("Compare holds up to 3 phones"); }}><GitCompare className="h-4 w-4" /> {compare.includes(p.slug) ? "Comparing" : "Compare"}</Button>}
            {isPhone && <TradeIn />}
          </div>
          <ul className="space-y-2 text-sm">
            {["10% instant discount with HDFC & ICICI cards", "Extra ₹5,000 exchange bonus", "Free screen guard + 1 year replacement"].map((o) => <li key={o} className="flex gap-2"><Tag className="h-4 w-4 shrink-0 text-mint" />{o}</li>)}
          </ul>
        </div>
      </div>

      <Tabs defaultValue="overview" className="mt-24">
        <TabsList className="glass sticky top-20 z-10 rounded-full">
          <TabsTrigger value="overview" className="rounded-full">Overview</TabsTrigger>
          <TabsTrigger value="specs" className="rounded-full">Specs</TabsTrigger>
          <TabsTrigger value="reviews" className="rounded-full">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-8 grid gap-4 md:grid-cols-2">
          {p.highlights.map((h, i) => (
            <div key={h} className="glass rounded-3xl p-8 animate-in fade-in slide-in-from-bottom-4 fill-mode-both" style={{ animationDelay: `${i * 80}ms` }}>
              <p className="text-sm text-muted-foreground">0{i + 1}</p>
              <p className="mt-6 font-display text-3xl font-bold">{h}</p>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="specs" className="mt-8">
          <Accordion type="multiple" defaultValue={Object.keys(p.specs).slice(0, 2)}>
            {Object.entries(p.specs).map(([k, val]) => (
              <AccordionItem key={k} value={k}><AccordionTrigger className="font-display text-lg">{k}</AccordionTrigger><AccordionContent className="text-muted-foreground">{val}</AccordionContent></AccordionItem>
            ))}
          </Accordion>
        </TabsContent>
        <TabsContent value="reviews" className="mt-8 grid gap-8 md:grid-cols-[280px_1fr]">
          <div>
            <p className="font-display text-6xl font-bold">{p.rating.toFixed(1)}</p>
            {[5, 4, 3, 2, 1].map((s, i) => (
              <div key={s} className="mt-2 flex items-center gap-2 text-sm"><span className="w-3">{s}</span><div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary"><div className="h-full bg-gradient-brand" style={{ width: `${[68, 20, 7, 3, 2][i]}%` }} /></div></div>
            ))}
          </div>
          <div className="space-y-4">
            {["Battery easily lasts two days, camera is stunning at night.", "Upgraded via trade-in, the whole process took 15 minutes.", "Display is gorgeous, a bit heavy but worth it."].map((r, i) => (
              <div key={i} className="glass rounded-2xl p-5"><div className="flex gap-0.5">{Array.from({ length: 5 - (i === 2 ? 1 : 0) }).map((_, j) => <Star key={j} className="h-3.5 w-3.5 fill-primary text-primary" />)}</div><p className="mt-2">{r}</p><p className="mt-2 text-xs text-muted-foreground">Verified buyer</p></div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {isPhone && (
        <section className="mt-24">
          <h2 className="font-display text-3xl font-bold">Frequently bought together</h2>
          <div className="glass mt-6 flex flex-wrap items-center gap-4 rounded-3xl p-6">
            {bundle.map((b) => <div key={b.id} className="flex items-center gap-2"><Check className="h-4 w-4 text-mint" />{b.name} <span className="text-muted-foreground">{formatPrice(priceOf(b))}</span></div>)}
            <Button className="ml-auto rounded-full bg-gradient-brand" onClick={() => { bundle.forEach((b) => add({ slug: b.slug, name: b.name, price: priceOf(b), color: b.colorways[0].name, variant: "Standard" })); toast.success("Bundle added"); }}>
              Add all · {formatPrice(bundle.reduce((a, b) => a + priceOf(b), 0))}
            </Button>
          </div>
        </section>
      )}

      <section className="mt-24">
        <h2 className="font-display text-3xl font-bold">You might also like</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{similar.map((s) => <ProductCard key={s.id} product={s} />)}</div>
      </section>

      <div className="glass fixed inset-x-3 bottom-20 z-40 flex items-center justify-between rounded-full bg-background/80 p-2 pl-5 lg:hidden">
        <span className="font-display font-bold">{formatPrice(price)}</span>
        <Button className="rounded-full bg-gradient-brand" onClick={() => addToCart()}>Add to bag</Button>
      </div>
    </div>
  );
}

function TradeIn() {
  const [age, setAge] = useState(1);
  const [cond, setCond] = useState("good");
  const val = Math.round(40000 / (age + 1) * ({ mint: 1.15, good: 1, fair: 0.7 } as Record<string, number>)[cond]);
  return (
    <Dialog>
      <DialogTrigger asChild><Button variant="ghost">Trade-in value</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle className="font-display">Estimate your trade-in</DialogTitle></DialogHeader>
        <p className="text-sm">Phone age: {age} year{age > 1 ? "s" : ""}</p>
        <Slider min={0} max={5} step={1} value={[age]} onValueChange={(v) => setAge(v[0])} />
        <div className="flex gap-2">{["mint", "good", "fair"].map((c) => <Button key={c} variant={cond === c ? "default" : "secondary"} className="flex-1 capitalize" onClick={() => setCond(c)}>{c}</Button>)}</div>
        <p className="font-display text-4xl font-bold text-gradient">₹<CountUp key={val} to={val} /></p>
        <p className="text-xs text-muted-foreground">Final value confirmed in store after inspection.</p>
      </DialogContent>
    </Dialog>
  );
}
