import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Search, Heart, ShoppingBag, GitCompare, Menu, Home, Store } from "lucide-react";
import { useShop } from "@/lib/store";
import { brand } from "@/lib/brand";
import { phones, accessoriesList, brands } from "@/data/products";
import { useMagnetic } from "@/hooks/use-motion";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { PhoneImage } from "@/components/shop/PhoneImage";
import { ThemeToggle } from "@/components/layout/Theme";

const links = [
  { to: "/phones", label: "Phones" },
  { to: "/accessories", label: "Accessories" },
  { to: "/deals", label: "Deals" },
  { to: "/compare", label: "Compare" },
  { to: "/services", label: "Repair & Trade-in" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mega, setMega] = useState(false);
  const { cart, wishlist, compare, setCartOpen } = useShop();
  const count = cart.reduce((a, c) => a + c.qty, 0);
  const mag = useMagnetic<HTMLAnchorElement>();
  const navigate = useNavigate();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    const key = (e: KeyboardEvent) => { if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearch(true); } };
    window.addEventListener("keydown", key);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("keydown", key); };
  }, []);

  const icon = "relative grid h-10 w-10 place-items-center rounded-full transition hover:bg-accent";
  const badge = "absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-gradient-brand px-1 text-[10px] font-bold text-primary-foreground";

  return (
    <>
      <header className={cn("fixed inset-x-0 top-0 z-50 flex justify-center px-3 transition-all duration-500", scrolled ? "pt-2" : "pt-4")}>
        <nav onMouseLeave={() => setMega(false)} className={cn("glass relative flex w-full max-w-7xl items-center gap-2 rounded-full px-4 transition-all duration-500", scrolled ? "h-14" : "h-16")} aria-label="Main">
          <Link to="/" className="mr-4 font-display text-xl font-extrabold tracking-tight">{brand.name.slice(0, -1)}<span className="text-gradient">{brand.name.slice(-1)}</span></Link>
          <div className="hidden flex-1 items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onMouseEnter={() => setMega(l.to === "/phones")}
                className="rounded-full px-3 py-1.5 text-sm text-muted-foreground transition hover:text-foreground"
                activeProps={{ className: "text-foreground bg-accent" }}>{l.label}</Link>
            ))}
          </div>
          <div className="ml-auto flex items-center">
            <ThemeToggle />
            <button className={icon} aria-label="Search" onClick={() => setSearch(true)}><Search className="h-4 w-4" /></button>
            <Link to="/wishlist" className={cn(icon, "hidden sm:grid")} aria-label="Wishlist"><Heart className="h-4 w-4" />{wishlist.length > 0 && <span className={badge}>{wishlist.length}</span>}</Link>
            <Link to="/compare" className={cn(icon, "hidden sm:grid")} aria-label="Compare"><GitCompare className="h-4 w-4" />{compare.length > 0 && <span className={badge}>{compare.length}</span>}</Link>
            <button className={icon} aria-label="Cart" onClick={() => setCartOpen(true)}><ShoppingBag className="h-4 w-4" />{count > 0 && <span key={count} className={cn(badge, "animate-in zoom-in")}>{count}</span>}</button>
            <Link ref={mag} to="/phones" className="ml-2 hidden rounded-full bg-gradient-brand px-5 py-2 text-sm font-semibold text-primary-foreground shadow-glow md:inline-block">Shop Now</Link>
            <button className={cn(icon, "lg:hidden")} aria-label="Menu" onClick={() => setMenu(true)}><Menu className="h-4 w-4" /></button>
          </div>

          {mega && (
            <div className="glass absolute inset-x-0 top-full mt-3 hidden grid-cols-[200px_1fr] gap-6 rounded-3xl bg-popover/90 p-6 animate-in fade-in slide-in-from-top-2 lg:grid">
              <div className="space-y-1">
                <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Brands</p>
                {brands.map((b) => (
                  <Link key={b} to="/phones" search={{ brand: b }} className="block rounded-lg px-2 py-1.5 text-sm hover:bg-accent">{b}</Link>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-3">
                {phones.slice(0, 4).map((p) => (
                  <Link key={p.id} to="/phones/$slug" params={{ slug: p.slug }} className="rounded-2xl bg-secondary/60 p-3 transition hover:bg-accent">
                    <PhoneImage product={p} className="aspect-square" />
                    <p className="mt-2 text-sm font-medium">{p.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Mobile bottom tab bar */}
      <nav className="glass fixed inset-x-3 bottom-3 z-50 flex justify-around rounded-full bg-background/70 py-2 lg:hidden" aria-label="Mobile">
        {[
          { icon: Home, label: "Home", fn: () => navigate({ to: "/" }) },
          { icon: Store, label: "Shop", fn: () => navigate({ to: "/phones" }) },
          { icon: Search, label: "Search", fn: () => setSearch(true) },
          { icon: ShoppingBag, label: "Cart", fn: () => setCartOpen(true) },
          { icon: Menu, label: "Menu", fn: () => setMenu(true) },
        ].map(({ icon: I, label, fn }) => (
          <button key={label} onClick={fn} className="flex flex-col items-center gap-0.5 px-3 text-[10px] text-muted-foreground">
            <I className="h-5 w-5" />{label}
          </button>
        ))}
      </nav>

      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetContent side="right" className="w-full bg-background">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <div className="mt-12 flex flex-col gap-2">
            {[{ to: "/", label: "Home" }, ...links, { to: "/wishlist", label: "Wishlist" }, { to: "/track", label: "Track order" }].map((l, i) => (
              <Link key={l.to} to={l.to} onClick={() => setMenu(false)} style={{ animationDelay: `${i * 40}ms` }}
                className="font-display text-3xl font-bold animate-in fade-in slide-in-from-right-8 fill-mode-both">{l.label}</Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      <CommandDialog open={search} onOpenChange={setSearch}>
        <CommandInput placeholder="Search phones, brands, accessories…" />
        <CommandList>
          <CommandEmpty>No signal for that search.</CommandEmpty>
          <CommandGroup heading="Phones">
            {phones.map((p) => (
              <CommandItem key={p.id} value={`${p.brand} ${p.name}`} onSelect={() => { setSearch(false); navigate({ to: "/phones/$slug", params: { slug: p.slug } }); }}>
                {p.name} <span className="ml-auto text-xs text-muted-foreground">{p.brand}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Accessories">
            {accessoriesList.map((p) => (
              <CommandItem key={p.id} value={`${p.brand} ${p.name}`} onSelect={() => { setSearch(false); navigate({ to: "/accessories/$slug", params: { slug: p.slug } }); }}>{p.name}</CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
