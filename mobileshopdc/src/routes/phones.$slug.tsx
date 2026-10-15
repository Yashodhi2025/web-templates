import { createFileRoute, notFound } from "@tanstack/react-router";
import { getProduct } from "@/data/products";
import { ProductDetail } from "@/components/shop/ProductDetail";

export const Route = createFileRoute("/phones/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p || p.category !== "phone") throw notFound();
    return { slug: p.slug, name: p.name, brand: p.brand };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.name} — Buy at PHONEX` },
      { name: "description", content: `Buy the ${loaderData.brand} ${loaderData.name} with 0% EMI, trade-in and same-day delivery.` },
      { property: "og:title", content: `${loaderData.name} — PHONEX` },
      { property: "og:description", content: `${loaderData.name} with 0% EMI and trade-in.` },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ] : [],
  }),
  component: () => {
    const { slug } = Route.useLoaderData();
    return <ProductDetail key={slug} product={getProduct(slug)!} />;
  },
});
