import { useEffect, useRef, useState } from "react";

/** Dot + ring cursor. Elements with data-cursor="VIEW" show a label; links/buttons expand the ring. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");
    let x = 0, y = 0, rx = 0, ry = 0, raf = 0;
    const move = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px)`;
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button, [role=tab], input, textarea");
      setLabel(t?.dataset["cursor"] ?? "");
      setHover(!!t);
    };
    const loop = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  if (!enabled) return null;
  const size = label ? 84 : hover ? 54 : 34;
  return (
    <>
      <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[110]">
        <div className="-ml-1 -mt-1 h-2 w-2 rounded-full bg-sauce" />
      </div>
      <div ref={ring} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[109]">
        <div
          className={`grid place-items-center rounded-full border transition-all duration-300 ${label ? "border-transparent bg-sauce text-charcoal" : "border-cream/50"}`}
          style={{ width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2 }}
        >
          <span className="text-[11px] font-bold tracking-widest">{label}</span>
        </div>
      </div>
    </>
  );
}
