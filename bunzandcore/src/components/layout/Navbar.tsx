import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Menu as MenuIcon, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Magnet } from "@/components/animations/primitives";
import { brand, navLinks } from "@/lib/brand";
import { cartCount, useCart } from "@/lib/cart";

export function Navbar() {
  const lines = useCart((s) => s.lines);
  const bump = useCart((s) => s.bump);
  const setOpen = useCart((s) => s.setOpen);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const badge = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setMounted(true);
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!bump || !badge.current) return;
    badge.current.animate([{ transform: "scale(1)" }, { transform: "scale(1.6)" }, { transform: "scale(1)" }], { duration: 450, delay: 700, easing: "cubic-bezier(.3,1.6,.5,1)" });
  }, [bump]);

  const count = mounted ? cartCount(lines) : 0;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <nav
        aria-label="Main"
        className={`mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-full px-4 py-2.5 transition-all duration-500 md:grid-cols-[1fr_auto_1fr] md:px-6 ${scrolled ? "glass shadow-2xl" : "border border-transparent"}`}
      >
        <Link to="/" className="truncate font-display text-xl font-extrabold tracking-tight md:text-2xl">
          {brand.short}<span className="text-sauce"> & CO.</span>
        </Link>
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="rounded-full px-4 py-2 text-sm font-medium text-cream/75 transition-colors hover:text-cream" activeProps={{ className: "text-cream bg-cream/10" }}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-end gap-2">
          <button
            id="cart-button"
            onClick={() => setOpen(true)}
            aria-label={`Open cart, ${count} items`}
            className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full glass transition-transform hover:scale-105"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span ref={badge} className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-lime px-1 text-[11px] font-bold text-charcoal">
                {count}
              </span>
            )}
          </button>
          <Magnet className="hidden md:inline-block">
            <Button asChild variant="hero" size="lg" className="h-11">
              <Link to="/menu">Order Now</Link>
            </Button>
          </Magnet>
          <Sheet open={mobile} onOpenChange={setMobile}>
            <SheetTrigger asChild>
              <button aria-label="Open menu" className="grid h-11 w-11 shrink-0 place-items-center rounded-full glass md:hidden">
                <MenuIcon className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="top" className="h-dvh border-none bg-charcoal">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <ul className="mt-20 flex flex-col gap-2 px-4">
                {[{ to: "/", label: "Home" }, ...navLinks, { to: "/checkout", label: "Checkout" }].map((l, i) => (
                  <li key={l.to} className="animate-in fade-in slide-in-from-bottom-6 fill-mode-both" style={{ animationDelay: `${i * 70}ms`, animationDuration: "600ms" }}>
                    <Link to={l.to} onClick={() => setMobile(false)} className="display-xl block text-6xl hover:text-sauce">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
