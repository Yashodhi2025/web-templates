import { createFileRoute } from "@tanstack/react-router";
import { phones } from "@/data/products";
import { ShopPage, validateShopSearch } from "@/components/shop/ShopPage";

export const Route = createFileRoute("/phones/")({
  validateSearch: validateShopSearch,
  head: () => ({
    meta: [
      { title: "Shop Smartphones — PHONEX" },
      { name: "description", content: "Filter flagship and budget phones from Apple, Samsung, Pixel, OnePlus, Xiaomi and Nothing." },
      { property: "og:title", content: "Shop Smartphones — PHONEX" },
      { property: "og:description", content: "Every phone, every budget, 0% EMI." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => {
    const s = Route.useSearch();
    return <ShopPage key={JSON.stringify(s)} title="Phones" items={phones} initial={s} />;
  },
});
