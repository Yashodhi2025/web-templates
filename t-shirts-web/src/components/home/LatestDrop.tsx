'use client';
import { useSiteData } from "@deneb-ui/ui";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/commerce/ProductCard';

export function LatestDrop() {
  const siteData = useSiteData();
  const latestProducts = PRODUCTS.slice(0, 4);

  return (
    <section className="w-full bg-[#FFFFFF] dark:bg-[#0B0B0B] py-20 border-b border-black/5 dark:border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span
              className="text-xs font-mono tracking-[0.25em] text-[#D72626] font-semibold uppercase block mb-1"
              data-preview-field-path="home.latestDropLabel"
              data-preview-style-target="home.latestDropLabel"
              data-preview-style-type="text">{siteData?.content?.home?.latestDropLabel ?? "LATEST DROP"}</span>
            <h2
              className="text-3xl sm:text-4xl font-light tracking-tight text-[#0B0B0B] dark:text-white uppercase"
              data-preview-field-path="home.heading5"
              data-preview-style-target="home.heading5"
              data-preview-style-type="text">{siteData?.content?.home?.heading5 ?? "SHOP THE"}<span
              className="font-bold"
              data-preview-field-path="home.latestLabel"
              data-preview-style-target="home.latestLabel"
              data-preview-style-type="text">{siteData?.content?.home?.latestLabel ?? "LATEST"}</span>
            </h2>
          </div>

          <Link
            href="/collections/t-shirts?sort=newest"
            data-preview-static="view-all-link"
            className="group inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#0B0B0B] dark:text-white hover:text-[#D72626] transition-colors uppercase"
          >
            <span>{siteData?.content?.home?.viewAllNewArrivalsLabel ?? "VIEW ALL NEW ARRIVALS"}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10">
          {latestProducts.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
