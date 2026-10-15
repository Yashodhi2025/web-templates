import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { brand } from "@/lib/brand";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer className="relative mt-32 overflow-hidden border-t pb-28 pt-20 lg:pb-10">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <h3 className="font-display text-3xl font-bold">Get drops before anyone else.</h3>
          <form className="mt-6 flex max-w-md gap-2" onSubmit={(e) => { e.preventDefault(); if (!/\S+@\S+\.\S+/.test(email)) return toast.error("Enter a valid email"); toast.success("You're on the list ✦"); setEmail(""); }}>
            <Input type="email" aria-label="Email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-full" />
            <Button type="submit" className="rounded-full bg-gradient-brand">Subscribe</Button>
          </form>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="mb-3 text-foreground">Shop</p>
          <Link to="/phones" className="block hover:text-foreground">Phones</Link>
          <Link to="/accessories" className="block hover:text-foreground">Accessories</Link>
          <Link to="/deals" className="block hover:text-foreground">Deals</Link>
          <Link to="/track" className="block hover:text-foreground">Track order</Link>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="mb-3 text-foreground">Help</p>
          <Link to="/services" className="block hover:text-foreground">Repair & Trade-in</Link>
          <Link to="/about" className="block hover:text-foreground">About</Link>
          <Link to="/contact" className="block hover:text-foreground">Contact</Link>
          <p>{brand.phone}</p>
        </div>
      </div>
      <p aria-hidden className="pointer-events-none mt-16 select-none text-center font-display text-[22vw] font-extrabold leading-none tracking-tighter text-gradient opacity-20">{brand.name}</p>
      <p className="text-center text-xs text-muted-foreground">© {new Date().getFullYear()} {brand.name}. {brand.tagline}</p>
    </footer>
  );
}
