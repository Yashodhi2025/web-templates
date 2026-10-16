'use client';
import { useSiteData } from "@deneb-ui/ui";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const FITS = [
  {
    title: 'CLASSIC FIT',
    tagline: 'Clean everyday silhouette.',
    description: 'Tailored shoulder construction in 240 GSM Peruvian Pima cotton. Timeless athletic proportions for any occasion.',
    image: '/images/categories/fit-classic.jpg',
    href: '/collections/t-shirts?fit=classic',
  },
  {
    title: 'OVERSIZED',
    tagline: 'Relaxed structure. Heavyweight feel.',
    description: 'Sculptural dropped shoulders in dense 280 GSM combed jersey. An architectural drape designed to retain form.',
    image: '/images/categories/fit-oversized.jpg',
    href: '/collections/t-shirts?fit=oversized',
  },
  {
    title: 'PERFORMANCE',
    tagline: 'Engineered for movement.',
    description: 'Hydro-channel micro-mesh that wicks moisture instantly. 4-way stretch raglan architecture for total rotational freedom.',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1200&auto=format&fit=crop',
    href: '/collections/t-shirts?fit=performance',
  },
];

export function ShopByFit() {
  const siteData = useSiteData();
  return (
    <section className="w-full bg-[#F5F4F0] dark:bg-[#0E0E0E] py-24 border-b border-black/5 dark:border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Header */}
        <div className="mb-12 text-center max-w-xl mx-auto">
          <span
            className="text-xs font-mono tracking-[0.25em] text-[#D72626] font-semibold uppercase block mb-2"
            data-preview-field-path="home.tailoredAnatomyLabel"
            data-preview-style-target="home.tailoredAnatomyLabel"
            data-preview-style-type="text">{siteData?.content?.home?.tailoredAnatomyLabel ?? "TAILORED ANATOMY"}</span>
          <h2
            className="text-3xl sm:text-5xl font-light tracking-tight text-[#0B0B0B] dark:text-white uppercase"
            data-preview-field-path="home.heading8"
            data-preview-style-target="home.heading8"
            data-preview-style-type="text">{siteData?.content?.home?.heading8 ?? "SHOP YOUR"}<span
            className="font-bold"
            data-preview-field-path="home.fitLabel"
            data-preview-style-target="home.fitLabel"
            data-preview-style-type="text">{siteData?.content?.home?.fitLabel ?? "FIT"}</span>
          </h2>
          <p
            className="mt-3 text-xs sm:text-sm text-[#7A7A78] dark:text-[#A9A9A5]"
            data-preview-field-path="home.description13"
            data-preview-style-target="home.description13"
            data-preview-style-type="text">{siteData?.content?.home?.description13 ?? "Every silhouette is engineered around human kinetics. Choose the volume that reflects your personal standard."}</p>
        </div>

        {/* 3-Column Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {FITS.map((item: any) => (
            <div
              key={item.title}
              className="group relative aspect-[3/4] w-full overflow-hidden bg-[#181818] block"
            >
              <Image
                src={(item.image && typeof item.image === 'string' && item.image.trim() !== '') ? item.image : '/images/showcase-phone.jpg'}
                alt={item.title}
                fill
                data-preview-static="fit-image"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* Tonal Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-85 group-hover:opacity-75 transition-opacity pointer-events-none" />

              {/* Lower Left Content */}
              <div className="absolute inset-x-6 bottom-6 flex flex-col">
                <span
                  className="text-[10px] font-mono tracking-widest text-[#D72626] uppercase font-bold mb-1"
                  data-preview-field-path="home.categoryHeroLabel"
                  data-preview-style-target="home.categoryHeroLabel"
                  data-preview-style-type="text">{siteData?.content?.home?.categoryHeroLabel ?? "CATEGORY HERO"}</span>
                <h3 data-preview-static="fit-title" className="text-2xl font-bold uppercase tracking-tight text-white mb-1">
                  {item.title}
                </h3>
                <p data-preview-static="fit-desc" className="text-xs text-[#C9C6BF] font-light mb-4 line-clamp-2">
                  {item.tagline}
                </p>

                <Link
                  href={item.href}
                  data-preview-static="fit-cta"
                  className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-white group-hover:text-[#D72626] transition-colors uppercase"
                >
                  <span>{siteData?.content?.home?.exploreSilhouetteLabel ?? "Explore Silhouette"}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
