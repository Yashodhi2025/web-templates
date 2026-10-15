import { createFileRoute, notFound } from "@tanstack/react-router";
import { getProduct } from "@/data/products";
import { ProductDetail } from "@/components/shop/ProductDetail";

export const Route = createFileRoute("/accessories/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p || p.category !== "accessory") throw notFound();
    return { slug: p.slug, name: p.name };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.name} — PHONEX Accessories` },
      { name: "description", content: `Buy ${loaderData.name} with fast delivery and 1 year warranty.` },
      { property: "og:title", content: `${loaderData.name} — PHONEX` },
      { property: "og:description", content: `${loaderData.name} with fast delivery.` },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ] : [],
  }),
  component: () => {
    const { slug } = Route.useLoaderData();
    return <ProductDetail key={slug} product={getProduct(slug)!} />;
  },
});
