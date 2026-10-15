'use client';
import { useSiteData } from "@deneb-ui/ui";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CampaignSection() {
  const siteData = useSiteData();
  return (
    <section className="relative min-h-[75vh] lg:min-h-[85vh] w-full overflow-clip bg-[#0B0B0B] text-white flex items-center justify-center py-20">
      {/* Background Campaign Visual */}
      <div className="absolute inset-0 z-0">
        <Image
          src={siteData?.content?.home?.image ?? "/images/hero/hero-campaign.jpg"}
          alt={siteData?.content?.home?.imageAlt ?? "Vanta Performance 01 Campaign"}
          fill
          className="object-cover object-center scale-105 opacity-50"
          sizes="100vw"
          data-preview-field-path="home.image" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/90 pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8 text-center flex flex-col items-center">
        {/* Label */}
        <span
          className="text-xs font-mono tracking-[0.3em] text-[#D72626] font-semibold uppercase mb-4 px-3 py-1 bg-white/5 border border-white/10"
          data-preview-field-path="home.performance01Label"
          data-preview-style-target="home.performance01Label"
          data-preview-style-type="text">{siteData?.content?.home?.performance01Label ?? "PERFORMANCE / 01"}</span>

        {/* Heading */}
        <h2
          className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white uppercase leading-[0.95] max-w-3xl mb-6"
          data-preview-field-path="home.heading3"
          data-preview-style-target="home.heading3"
          data-preview-style-type="text">{siteData?.content?.home?.heading3 ?? "THE EVERYDAY"}<br />
          <span
            className="font-black text-white"
            data-preview-field-path="home.performanceTeeLabel"
            data-preview-style-target="home.performanceTeeLabel"
            data-preview-style-type="text">{siteData?.content?.home?.performanceTeeLabel ?? "PERFORMANCE TEE"}</span>
        </h2>

        {/* Copy */}
        <p
          className="text-sm sm:text-base text-[#C9C6BF] font-light max-w-xl mb-10 leading-relaxed"
          data-preview-field-path="home.description9"
          data-preview-style-target="home.description9"
          data-preview-style-type="text">{siteData?.content?.home?.description9 ?? "Lightweight. Breathable. Built for max movement velocity without looking like synthetic gymwear. Transition effortlessly from track sprints to the city."}</p>

        {/* CTA */}
        <Link
          href="/collections/t-shirts?fit=performance"
          data-preview-static="discover-link"
          className="group inline-flex items-center gap-3 bg-[#D72626] text-white px-10 py-4 text-xs font-mono font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 shadow-2xl"
        >
          <span>{siteData?.content?.home?.discoverPerformanceLabel ?? "DISCOVER PERFORMANCE"}</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
