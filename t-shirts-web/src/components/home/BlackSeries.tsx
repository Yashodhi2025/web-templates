'use client';
import { useSiteData } from "@deneb-ui/ui";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/commerce/ProductCard';

export function BlackSeries() {
  const siteData = useSiteData();
  const blackProducts = PRODUCTS.filter((p) => p.colors.some((c) => c.name.toLowerCase().includes('black'))).slice(0, 4);

  return (
    <section className="w-full bg-[#070707] text-white py-24 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span
              className="text-xs font-mono tracking-[0.25em] text-[#D72626] font-semibold uppercase block mb-1"
              data-preview-field-path="home.monochromeStandardLabel"
              data-preview-style-target="home.monochromeStandardLabel"
              data-preview-style-type="text">{siteData?.content?.home?.monochromeStandardLabel ?? "MONOCHROME STANDARD"}</span>
            <h2
              className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase"
              data-preview-field-path="home.heading2"
              data-preview-style-target="home.heading2"
              data-preview-style-type="text">{siteData?.content?.home?.heading2 ?? "BLACK"}<span
              className="font-bold"
              data-preview-field-path="home.seriesLabel"
              data-preview-style-target="home.seriesLabel"
              data-preview-style-type="text">{siteData?.content?.home?.seriesLabel ?? "SERIES"}</span>
            </h2>
            <p
              className="mt-2 text-xs sm:text-sm text-[#A9A9A5] font-light max-w-md"
              data-preview-field-path="home.description8"
              data-preview-style-target="home.description8"
              data-preview-style-type="text">{siteData?.content?.home?.description8 ?? "Pure carbon pigment dyes. Tonal side lighting and sculptural drape across our highest density weights."}</p>
          </div>

          <Link
            href="/collections/t-shirts?color=Black"
            data-preview-static="shop-series-link"
            className="group inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-white hover:text-[#D72626] transition-colors uppercase"
          >
            <span>{siteData?.content?.home?.shopBlackSeriesLabel ?? "SHOP BLACK SERIES"}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10">
          {blackProducts.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
