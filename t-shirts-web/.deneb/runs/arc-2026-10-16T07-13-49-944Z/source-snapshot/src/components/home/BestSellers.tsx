'use client';
import { useSiteData } from "@deneb-ui/ui";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/commerce/ProductCard';

export function BestSellers() {
  const siteData = useSiteData();
  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="w-full bg-[#FFFFFF] dark:bg-[#0B0B0B] py-24 border-b border-black/5 dark:border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span
              className="text-xs font-mono tracking-[0.25em] text-[#D72626] font-semibold uppercase block mb-1"
              data-preview-field-path="home.provenStandardsLabel"
              data-preview-style-target="home.provenStandardsLabel"
              data-preview-style-type="text">{siteData?.content?.home?.provenStandardsLabel ?? "PROVEN STANDARDS"}</span>
            <h2
              className="text-3xl sm:text-5xl font-light tracking-tight text-[#0B0B0B] dark:text-white uppercase"
              data-preview-field-path="home.heading"
              data-preview-style-target="home.heading"
              data-preview-style-type="text">{siteData?.content?.home?.heading ?? "BEST"}<span
              className="font-bold"
              data-preview-field-path="home.sellersLabel"
              data-preview-style-target="home.sellersLabel"
              data-preview-style-type="text">{siteData?.content?.home?.sellersLabel ?? "SELLERS"}</span>
            </h2>
          </div>

          <Link
            href="/collections/t-shirts?sort=bestseller"
            data-preview-static="view-all-link"
            className="group inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#0B0B0B] dark:text-white hover:text-[#D72626] transition-colors uppercase"
          >
            <span>{siteData?.content?.home?.viewAllBestSellersLabel ?? "VIEW ALL BEST SELLERS"}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10">
          {bestSellers.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
