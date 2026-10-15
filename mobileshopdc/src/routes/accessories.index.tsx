import { createFileRoute } from "@tanstack/react-router";
import { accessoriesList } from "@/data/products";
import { ShopPage, validateShopSearch } from "@/components/shop/ShopPage";

export const Route = createFileRoute("/accessories/")({
  validateSearch: validateShopSearch,
  head: () => ({
    meta: [
      { title: "Phone Accessories — PHONEX" },
      { name: "description", content: "Earbuds, smartwatches, chargers, cases and screen guards." },
      { property: "og:title", content: "Phone Accessories — PHONEX" },
      { property: "og:description", content: "Earbuds, watches, chargers and cases." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => {
    const s = Route.useSearch();
    return <ShopPage key={JSON.stringify(s)} title="Accessories" items={accessoriesList} initial={s} />;
  },
});
