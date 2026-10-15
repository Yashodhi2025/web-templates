import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { useRouterState } from "@tanstack/react-router";
import { gsap, ScrollTrigger, reduced } from "@/hooks/use-motion";
import { useShop } from "@/lib/store";
import { brand } from "@/lib/brand";

/** Lenis smooth scroll synced with ScrollTrigger, store rehydration, scroll-to-top on route change. */
export function SmoothScroll() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const lenisRef = useRef<Lenis | null>(null);
  useEffect(() => {
    useShop.persist.rehydrate();
    if (reduced()) return;
    const lenis = new Lenis({ duration: 1.1 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);
  useEffect(() => {
    lenisRef.current?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => clearTimeout(t);
  }, [path]);
  return null;
}

/** Dot + ring cursor with contextual labels from [data-cursor]. Hidden on touch. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (matchMedia("(hover: none)").matches || reduced()) return;
    setOn(true);
    const move = (e: PointerEvent) => {
      gsap.to(dot.current, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(ring.current, { x: e.clientX, y: e.clientY, duration: 0.45 });
      const t = (e.target as HTMLElement).closest("[data-cursor], a, button") as HTMLElement | null;
      setLabel(t?.dataset.cursor ?? "");
      gsap.to(ring.current, { scale: t ? 1.8 : 1, duration: 0.3 });
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, []);
  if (!on) return null;
  return (
    <>
      <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[200] -ml-1 -mt-1 h-2 w-2 rounded-full bg-primary" />
      <div ref={ring} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[200] -ml-5 -mt-5 grid h-10 w-10 place-items-center rounded-full border border-primary/60 text-[6px] font-bold tracking-widest text-primary">{label}</div>
    </>
  );
}

/** Logo reveal with progress counter, then curtain lift. Shown once per session. */
export function Preloader() {
  const [show, setShow] = useState(true);
  const [n, setN] = useState(0);
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (sessionStorage.getItem("phonex-loaded") || reduced()) { setShow(false); return; }
    const o = { v: 0 };
    const tl = gsap.timeline({ onComplete: () => { sessionStorage.setItem("phonex-loaded", "1"); setShow(false); } });
    tl.to(o, { v: 100, duration: 1.4, ease: "power2.inOut", onUpdate: () => setN(Math.round(o.v)) })
      .to(el.current, { yPercent: -100, duration: 0.9, ease: "expo.inOut" });
    return () => { tl.kill(); };
  }, []);
  if (!show) return null;
  return (
    <div ref={el} className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-background">
      <p className="font-display text-6xl font-extrabold tracking-tighter text-gradient">{brand.name}</p>
      <p className="mt-4 font-mono text-sm text-muted-foreground">{n.toString().padStart(3, "0")}%</p>
    </div>
  );
}
