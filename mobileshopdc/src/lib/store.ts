import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = { key: string; slug: string; name: string; price: number; color: string; variant: string; qty: number };

type State = {
  cart: CartItem[];
  wishlist: string[];
  compare: string[];
  cartOpen: boolean;
  setCartOpen: (o: boolean) => void;
  add: (item: Omit<CartItem, "key" | "qty">, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  toggleWish: (slug: string) => void;
  toggleCompare: (slug: string) => boolean;
};

export const useShop = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      compare: [],
      cartOpen: false,
      setCartOpen: (cartOpen) => set({ cartOpen }),
      add: (item, qty = 1) => {
        const key = `${item.slug}|${item.color}|${item.variant}`;
        const exist = get().cart.find((c) => c.key === key);
        set({
          cart: exist
            ? get().cart.map((c) => (c.key === key ? { ...c, qty: c.qty + qty } : c))
            : [...get().cart, { ...item, key, qty }],
        });
      },
      setQty: (key, qty) => set({ cart: get().cart.map((c) => (c.key === key ? { ...c, qty: Math.max(1, qty) } : c)) }),
      remove: (key) => set({ cart: get().cart.filter((c) => c.key !== key) }),
      clear: () => set({ cart: [] }),
      toggleWish: (slug) => {
        const w = get().wishlist;
        set({ wishlist: w.includes(slug) ? w.filter((s) => s !== slug) : [...w, slug] });
      },
      toggleCompare: (slug) => {
        const c = get().compare;
        if (c.includes(slug)) { set({ compare: c.filter((s) => s !== slug) }); return true; }
        if (c.length >= 3) return false;
        set({ compare: [...c, slug] });
        return true;
      },
    }),
    {
      name: "phonex-shop",
      skipHydration: true,
      partialize: (s) => ({ cart: s.cart, wishlist: s.wishlist, compare: s.compare }),
    },
  ),
);
