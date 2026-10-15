'use client';
import { useSiteData } from "@deneb-ui/ui";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const ACTIVITIES = [
  {
    title: 'RUNNING',
    tagline: 'Ultralight hydro-mesh with zero drag.',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1200&auto=format&fit=crop',
    href: '/collections/t-shirts?activity=running',
    span: 'col-span-12 md:col-span-7',
  },
  {
    title: 'TRAINING',
    tagline: 'Gusseted mobility for heavy compound lifts.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
    href: '/collections/t-shirts?activity=training',
    span: 'col-span-12 md:col-span-5',
  },
  {
    title: 'COURT',
    tagline: 'Structured pique and breathable collar.',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=1200&auto=format&fit=crop',
    href: '/collections/t-shirts?activity=court',
    span: 'col-span-12 md:col-span-4',
  },
  {
    title: 'LIFESTYLE',
    tagline: 'Heavyweight boxy draping for the street.',
    image: '/images/hero/hero-campaign.jpg',
    href: '/collections/t-shirts?activity=lifestyle',
    span: 'col-span-12 md:col-span-4',
  },
  {
    title: 'REST DAY',
    tagline: 'French terry and combed jersey comfort.',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1200&auto=format&fit=crop',
    href: '/collections/t-shirts?activity=rest-day',
    span: 'col-span-12 md:col-span-4',
  },
];

export function SportCollection() {
  const siteData = useSiteData();
  return (
    <section className="w-full bg-[#0B0B0B] text-white py-24 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span
              className="text-xs font-mono tracking-[0.25em] text-[#D72626] font-semibold uppercase block mb-1"
              data-preview-field-path="home.activityMatrixLabel"
              data-preview-style-target="home.activityMatrixLabel"
              data-preview-style-type="text">{siteData?.content?.home?.activityMatrixLabel ?? "ACTIVITY MATRIX"}</span>
            <h2
              className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase"
              data-preview-field-path="home.heading9"
              data-preview-style-target="home.heading9"
              data-preview-style-type="text">{siteData?.content?.home?.heading9 ?? "MADE FOR"}<span
              className="font-bold"
              data-preview-field-path="home.motionLabel"
              data-preview-style-target="home.motionLabel"
              data-preview-style-type="text">{siteData?.content?.home?.motionLabel ?? "MOTION"}</span>
            </h2>
          </div>

          <p
            className="text-xs sm:text-sm text-[#A9A9A5] max-w-xs font-light"
            data-preview-field-path="home.description14"
            data-preview-style-target="home.description14"
            data-preview-style-type="text">{siteData?.content?.home?.description14 ?? "Engineered disciplines. Every garment is purpose-built for its physiological demands."}</p>
        </div>

        {/* Asymmetrical Grid */}
        <div className="grid grid-cols-12 gap-4 lg:gap-6">
          {ACTIVITIES.map((act: any) => (
            <Link
              key={act.title}
              href={act.href}
              data-preview-static="activity-link"
              className={`group relative min-h-[300px] sm:min-h-[360px] overflow-hidden bg-[#181818] ${act.span}`}
            >
              <Image
                src={(act.image && typeof act.image === 'string' && act.image.trim() !== '') ? act.image : '/images/showcase-phone.jpg'}
                alt={act.title}
                fill
                data-preview-static="activity-image"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-80"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity pointer-events-none" />

              <div className="absolute inset-x-6 bottom-6 flex items-end justify-between">
                <div>
                  <h3 data-preview-static="activity-title" className="text-2xl font-bold uppercase tracking-tight text-white mb-1">
                    {act.title}
                  </h3>
                  <p data-preview-static="activity-desc" className="text-xs text-[#C9C6BF] font-light max-w-xs">
                    {act.tagline}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm group-hover:bg-[#D72626] transition-colors">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
