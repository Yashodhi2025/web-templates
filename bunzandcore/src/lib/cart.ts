import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartLine {
  key: string;
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
  note?: string;
}

interface CartState {
  lines: CartLine[];
  open: boolean;
  bump: number;
  setOpen: (o: boolean) => void;
  add: (line: Omit<CartLine, "qty" | "key"> & { qty?: number; key?: string }) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      open: false,
      bump: 0,
      setOpen: (open) => set({ open }),
      add: ({ qty = 1, key, ...item }) =>
        set((s) => {
          const k = key ?? item.id + (item.note ?? "");
          const existing = s.lines.find((l) => l.key === k);
          const lines = existing
            ? s.lines.map((l) => (l.key === k ? { ...l, qty: l.qty + qty } : l))
            : [...s.lines, { ...item, key: k, qty }];
          return { lines, bump: s.bump + 1 };
        }),
      setQty: (key, qty) =>
        set((s) => ({ lines: qty <= 0 ? s.lines.filter((l) => l.key !== key) : s.lines.map((l) => (l.key === key ? { ...l, qty } : l)) })),
      remove: (key) => set((s) => ({ lines: s.lines.filter((l) => l.key !== key) })),
      clear: () => set({ lines: [] }),
    }),
    { name: "bunz-cart", partialize: (s) => ({ lines: s.lines }) },
  ),
);

export const cartCount = (l: CartLine[]) => l.reduce((a, b) => a + b.qty, 0);
export const cartTotal = (l: CartLine[]) => l.reduce((a, b) => a + b.qty * b.price, 0);

/** Fly a thumbnail from a source element to the cart icon. */
export function flyToCart(from: HTMLElement | null, image: string) {
  if (typeof window === "undefined" || !from) return;
  const target = document.getElementById("cart-button");
  if (!target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const a = from.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  const img = document.createElement("img");
  img.src = image;
  img.alt = "";
  Object.assign(img.style, {
    position: "fixed", left: `${a.left + a.width / 2 - 32}px`, top: `${a.top + a.height / 2 - 32}px`,
    width: "64px", height: "64px", borderRadius: "999px", objectFit: "cover", zIndex: "100", pointerEvents: "none",
  });
  document.body.appendChild(img);
  import("gsap").then(({ gsap }) => {
    gsap.to(img, {
      x: b.left + b.width / 2 - (a.left + a.width / 2),
      y: b.top + b.height / 2 - (a.top + a.height / 2),
      scale: 0.2, rotate: 360, duration: 0.8, ease: "power2.in",
      onComplete: () => img.remove(),
    });
  });
}
