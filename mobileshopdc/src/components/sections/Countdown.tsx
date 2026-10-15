import { useEffect, useState } from "react";

/** Live countdown to the next midnight (flash sale reset). */
export function Countdown({ className }: { className?: string }) {
  const [t, setT] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => { const n = new Date(); const m = new Date(n); m.setHours(24, 0, 0, 0); setT(m.getTime() - n.getTime()); };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);
  const s = Math.floor((t ?? 0) / 1000);
  const parts = [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60];
  return (
    <div className={className} aria-label="Time left in flash sale">
      {parts.map((v, i) => (
        <span key={i} className="inline-flex items-center">
          <span className="glass rounded-xl px-2.5 py-1.5 font-mono text-xl font-bold tabular-nums">{t === null ? "--" : String(v).padStart(2, "0")}</span>
          {i < 2 && <span className="px-1 text-muted-foreground">:</span>}
        </span>
      ))}
    </div>
  );
}

/** Counts up from 0 when scrolled into view. */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const [el, setEl] = useState<HTMLSpanElement | null>(null);
  useEffect(() => {
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (now: number) => { const p = Math.min(1, (now - start) / 1600); setV(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [el, to]);
  return <span ref={setEl}>{v.toLocaleString("en-IN")}{suffix}</span>;
}
