'use client';
import { useSiteData } from "@deneb-ui/ui";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SWATCH_COLORS, PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/commerce/ProductCard';

export function ShopByColor() {
  const siteData = useSiteData();
  const [activeColor, setActiveColor] = useState('Black');

  // Filter products matching active color
  const filteredProducts = PRODUCTS.filter((p) =>
    p.colors.some((c) => c.name.toLowerCase().includes(activeColor.toLowerCase()))
  ).slice(0, 4);

  return (
    <section className="w-full bg-[#F5F4F0] dark:bg-[#121212] py-24 border-b border-black/5 dark:border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span
              className="text-xs font-mono tracking-[0.25em] text-[#D72626] font-semibold uppercase block mb-1"
              data-preview-field-path="home.curatedPaletteLabel"
              data-preview-style-target="home.curatedPaletteLabel"
              data-preview-style-type="text">{siteData?.content?.home?.curatedPaletteLabel ?? "CURATED PALETTE"}</span>
            <h2
              className="text-3xl sm:text-5xl font-light tracking-tight text-[#0B0B0B] dark:text-white uppercase"
              data-preview-field-path="home.heading7"
              data-preview-style-target="home.heading7"
              data-preview-style-type="text">{siteData?.content?.home?.heading7 ?? "SHOP BY"}<span
              className="font-bold"
              data-preview-field-path="home.colorLabel2"
              data-preview-style-target="home.colorLabel2"
              data-preview-style-type="text">{siteData?.content?.home?.colorLabel2 ?? "COLOR"}</span>
            </h2>
          </div>

          {/* Color Selector Swatches */}
          <div className="flex flex-wrap items-center gap-3">
            {SWATCH_COLORS.map((swatch: any) => {
              const isSelected = activeColor === swatch.name;
              return (
                <button
                  key={swatch.name}
                  onClick={() => setActiveColor(swatch.name)}
                  data-preview-static="color-filter-button"
                  className={`group flex items-center gap-2 px-3 py-1.5 border transition-all ${
                    isSelected
                      ? 'border-black dark:border-white bg-white dark:bg-black shadow-sm'
                      : 'border-black/10 dark:border-white/10 hover:border-black/30'
                  }`}
                >
                  <span
                    className="h-3.5 w-3.5 rounded-full border border-black/20"
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <span
                    data-preview-static="color-name"
                    className={`text-xs font-mono uppercase tracking-wider ${
                      isSelected
                        ? 'font-bold text-black dark:text-white'
                        : 'text-[#7A7A78] group-hover:text-black dark:group-hover:text-white'
                    }`}
                  >
                    {swatch.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Filtered Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-xs font-mono text-[#A9A9A5]">
              <span
                data-preview-field-path="home.noPiecesCurrentlyStockCheck"
                data-preview-style-target="home.noPiecesCurrentlyStockCheck"
                data-preview-style-type="text">{siteData?.content?.home?.noPiecesCurrentlyStockCheck ?? "No pieces currently in stock for . Check back soon."}</span> {activeColor}. Check back soon.
                          </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={`/collections/t-shirts?color=${encodeURIComponent(activeColor)}`}
            data-preview-static="color-view-all-link"
            className="inline-flex items-center gap-2 border-b-2 border-black dark:border-white pb-1 text-xs font-mono font-bold tracking-widest text-[#0B0B0B] dark:text-white hover:text-[#D72626] hover:border-[#D72626] transition-colors uppercase"
          >
            <span>{siteData?.content?.home?.viewAllPiecesLabel ?? "VIEW ALL PIECES"}{activeColor.toUpperCase()} PIECES</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
