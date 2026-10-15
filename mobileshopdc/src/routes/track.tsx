import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Package, Truck, Home, CheckCircle2 } from "lucide-react";
import { PageHeader, meta } from "@/components/sections/PageHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/track")({
  head: () => meta("Track Order", "Track your PHONEX order in real time."),
  component: Track,
});

function Track() {
  const [id, setId] = useState("");
  const [shown, setShown] = useState(false);
  const steps = [{ i: CheckCircle2, t: "Order confirmed" }, { i: Package, t: "Packed" }, { i: Truck, t: "Out for delivery" }, { i: Home, t: "Delivered" }];
  return (
    <>
      <PageHeader eyebrow="Tracking" title="Where's my phone?" />
      <div className="mx-auto max-w-2xl px-6">
        <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); if (id.trim()) setShown(true); }}>
          <Input placeholder="Order ID e.g. PX123456" value={id} onChange={(e) => setId(e.target.value)} className="rounded-full" />
          <Button type="submit" className="rounded-full bg-gradient-brand">Track</Button>
        </form>
        {shown && (
          <ol className="glass mt-8 space-y-6 rounded-3xl p-6">
            {steps.map(({ i: I, t }, n) => (
              <li key={t} className={cn("flex items-center gap-4 animate-in fade-in slide-in-from-left-4 fill-mode-both", n > 2 && "opacity-40")} style={{ animationDelay: `${n * 150}ms` }}>
                <span className={cn("grid h-10 w-10 place-items-center rounded-full", n <= 2 ? "bg-gradient-brand text-primary-foreground" : "bg-secondary")}><I className="h-5 w-5" /></span>
                <span className="font-medium">{t}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </>
  );
}
