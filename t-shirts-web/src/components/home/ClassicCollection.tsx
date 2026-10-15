'use client';
import { useSiteData } from "@deneb-ui/ui";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/commerce/ProductCard';

export function ClassicCollection() {
  const siteData = useSiteData();
  const classicProducts = PRODUCTS.filter((p) => p.fit === 'classic' || p.category.includes('Polo')).slice(0, 3);

  return (
    <section className="w-full bg-[#FFFFFF] dark:bg-[#0B0B0B] py-24 border-b border-black/5 dark:border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Editorial Top Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8">
            <span
              className="text-xs font-mono tracking-[0.25em] text-[#D72626] font-semibold uppercase block mb-1"
              data-preview-field-path="home.timelessArchitectureLabel"
              data-preview-style-target="home.timelessArchitectureLabel"
              data-preview-style-type="text">{siteData?.content?.home?.timelessArchitectureLabel ?? "TIMELESS ARCHITECTURE"}</span>
            <h2
              className="text-3xl sm:text-5xl font-light tracking-tight text-[#0B0B0B] dark:text-white uppercase leading-none"
              data-preview-field-path="home.heading4"
              data-preview-style-target="home.heading4"
              data-preview-style-type="text">{siteData?.content?.home?.heading4 ?? "THE"}<span
              className="font-bold"
              data-preview-field-path="home.classicsLabel"
              data-preview-style-target="home.classicsLabel"
              data-preview-style-type="text">{siteData?.content?.home?.classicsLabel ?? "CLASSICS"}</span>
            </h2>
            <p
              className="mt-3 text-sm text-[#7A7A78] dark:text-[#A9A9A5] max-w-md"
              data-preview-field-path="home.description10"
              data-preview-style-target="home.description10"
              data-preview-style-type="text">{siteData?.content?.home?.description10 ?? "Pieces that never need a season. Engineered in 240 GSM Peruvian Pima jersey and structured pique for effortless everyday distinction."}</p>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <Link
              href="/collections/t-shirts?fit=classic"
              data-preview-static="explore-link"
              className="group inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#0B0B0B] dark:text-white hover:text-[#D72626] transition-colors uppercase"
            >
              <span>{siteData?.content?.home?.exploreClassicsLabel ?? "EXPLORE THE CLASSICS"}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Featured Editorial Split with Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Editorial Banner Left */}
          <div className="lg:col-span-5 relative aspect-[3/4] lg:aspect-auto lg:h-full min-h-[460px] overflow-clip bg-[#181818]">
            <Image
              src={siteData?.content?.home?.image2 ?? "/images/categories/fit-classic.jpg"}
              alt={siteData?.content?.home?.imageAlt2 ?? "The Classics - Vanta Athletics"}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
              data-preview-field-path="home.image2" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 pointer-events-none" />
            <div className="absolute inset-x-6 bottom-6 flex flex-col">
              <span
                className="text-[10px] font-mono tracking-widest text-[#D72626] uppercase font-bold mb-1"
                data-preview-field-path="home.heritageStandardLabel"
                data-preview-style-target="home.heritageStandardLabel"
                data-preview-style-type="text">{siteData?.content?.home?.heritageStandardLabel ?? "HERITAGE STANDARD"}</span>
              <h3
                className="text-2xl font-bold uppercase tracking-tight text-white mb-2"
                data-preview-field-path="home.refinedTennisTrackHeritageSubheading"
                data-preview-style-target="home.refinedTennisTrackHeritageSubheading"
                data-preview-style-type="text">{siteData?.content?.home?.refinedTennisTrackHeritageSubheading ?? "REFINED TENNIS & TRACK HERITAGE"}</h3>
              <p
                className="text-xs text-[#C9C6BF] font-light max-w-sm mb-4"
                data-preview-field-path="home.description11"
                data-preview-style-target="home.description11"
                data-preview-style-type="text">{siteData?.content?.home?.description11 ?? "Tailored collar architecture with zero curl. Designed for longevity beyond trends."}</p>
            </div>
          </div>

          {/* 3 Product Cards Right */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {classicProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
