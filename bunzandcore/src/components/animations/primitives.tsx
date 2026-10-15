import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";
import { cn } from "@/lib/utils";

const reduced = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Load gsap + ScrollTrigger and run a scoped context with cleanup. */
export function useGsap(
  fn: (g: typeof import("gsap").gsap, root: HTMLElement) => void,
  deps: unknown[] = [],
) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current || reduced()) return;
    let ctx: { revert: () => void } | undefined;
    let alive = true;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (!alive || !ref.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const el = ref.current;
      ctx = gsap.context(() => fn(gsap, el), el);
    });
    return () => {
      alive = false;
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}

/** Fade/slide children marked .reveal into view, staggered. */
export function Reveal({ children, className, as: Tag = "div" }: { children: ReactNode; className?: string; as?: ElementType }) {
  const ref = useGsap((gsap, root) => {
    gsap.from(root.querySelectorAll(".reveal"), {
      y: 50, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.1,
      scrollTrigger: { trigger: root, start: "top 82%" },
    });
  });
  return <Tag ref={ref} className={className}>{children}</Tag>;
}

/** Per-word mask reveal headline. */
export function SplitText({ text, className, delay = 0, as: Tag = "h2", onScroll = true, id }: { text: string; className?: string; delay?: number; as?: ElementType; onScroll?: boolean; id?: string }) {
  const ref = useGsap((gsap, root) => {
    gsap.from(root.querySelectorAll(".w"), {
      yPercent: 115, rotate: 4, duration: 1, ease: "power4.out", stagger: 0.06, delay,
      ...(onScroll ? { scrollTrigger: { trigger: root, start: "top 88%" } } : {}),
    });
  });
  return (
    <Tag ref={ref} id={id} className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <span className="w inline-block">{w}&nbsp;</span>
        </span>
      ))}
    </Tag>
  );
}

/** Magnetic hover wrapper. */
export function Magnet({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px, ${(e.clientY - r.top - r.height / 2) * strength}px)`;
  };
  const reset = () => ref.current && (ref.current.style.transform = "");
  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} className={cn("inline-block transition-transform duration-300 ease-out", className)}>
      {children}
    </div>
  );
}

/** 3D tilt card on hover. */
export function Tilt({ children, className, max = 10, ...rest }: { children: ReactNode; className?: string; max?: number } & React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg) scale(1.02)`;
    el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
  };
  const reset = () => ref.current && (ref.current.style.transform = "");
  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={reset} className={cn("transition-transform duration-300 ease-out will-change-transform", className)} {...rest}>
      {children}
    </div>
  );
}

/** Count up when scrolled into view. */
export function CountUp({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) { setV(to); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - start) / 1800);
        setV(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref} className="tabular-nums">{v.toLocaleString(undefined, { maximumFractionDigits: decimals, minimumFractionDigits: decimals })}{suffix}</span>;
}

/** Infinite marquee whose speed reacts to scroll velocity. */
export function Marquee({ items, className, reverse }: { items: string[]; className?: string; reverse?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let last = window.scrollY, raf = 0, speed = 30;
    const loop = () => {
      const d = Math.abs(window.scrollY - last);
      last = window.scrollY;
      const target = Math.max(8, 30 - d * 1.2);
      speed += (target - speed) * 0.08;
      ref.current?.style.setProperty("--marquee-speed", `${speed}s`);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className={cn("overflow-hidden", className)} aria-hidden>
      <div ref={ref} className="flex w-max animate-marquee" style={{ animationDirection: reverse ? "reverse" : "normal" }}>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {row.map((t, i) => (
              <span key={i} className="flex items-center gap-8 px-8 display-xl text-5xl md:text-7xl">
                {t}<span className="text-lime">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
