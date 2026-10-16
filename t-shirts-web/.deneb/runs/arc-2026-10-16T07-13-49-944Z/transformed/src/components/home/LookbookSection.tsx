'use client';
import { useSiteData } from "@deneb-ui/ui";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function LookbookSection() {
  const siteData = useSiteData();
  return (
    <section className="w-full bg-[#FFFFFF] dark:bg-[#0B0B0B] py-24 border-b border-black/5 dark:border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
          <div>
            <span
              className="text-xs font-mono tracking-[0.25em] text-[#D72626] font-semibold uppercase block mb-1"
              data-preview-field-path="home.editorialCampaignLabel"
              data-preview-style-target="home.editorialCampaignLabel"
              data-preview-style-type="text">{siteData?.content?.home?.editorialCampaignLabel ?? "EDITORIAL CAMPAIGN"}</span>
            <h2
              className="text-3xl sm:text-5xl font-light tracking-tight text-[#0B0B0B] dark:text-white uppercase"
              data-preview-field-path="home.heading6"
              data-preview-style-target="home.heading6"
              data-preview-style-type="text">{siteData?.content?.home?.heading6 ?? "STYLED /"}<span
              className="font-bold"
              data-preview-field-path="home.item026Label"
              data-preview-style-target="home.item026Label"
              data-preview-style-type="text">{siteData?.content?.home?.item026Label ?? "026"}</span>
            </h2>
            <p
              className="mt-2 text-xs sm:text-sm text-[#7A7A78] dark:text-[#A9A9A5] font-light max-w-md"
              data-preview-field-path="home.description12"
              data-preview-style-target="home.description12"
              data-preview-style-type="text">{siteData?.content?.home?.description12 ?? "Shot on location across brutalist pavilions and training grounds. Minimal styling designed for longevity."}</p>
          </div>

          <Link
            href="/collections/t-shirts"
            data-preview-static="lookbook-link"
            className="group inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wider text-[#0B0B0B] dark:text-white hover:text-[#D72626] transition-colors uppercase"
          >
            <span>{siteData?.content?.home?.viewCompleteLookbookLabel ?? "VIEW COMPLETE LOOKBOOK"}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Asymmetrical Fashion Editorial Grid */}
        <div className="grid grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Main Hero Shot Left */}
          <div className="col-span-12 lg:col-span-7 relative aspect-[4/5] overflow-clip bg-[#181818] shadow-xl">
            <Image
              src={siteData?.content?.home?.form?.image ?? "/images/hero/hero-campaign.jpg"}
              alt={siteData?.content?.home?.form?.imageAlt ?? "Vanta Lookbook Editorial 01"}
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 60vw"
              data-preview-field-path="home.form.image" />
            <div className="absolute bottom-6 left-6 bg-black/70 backdrop-blur-md px-4 py-2 font-mono text-xs text-white uppercase">
              <span
                data-preview-field-path="home.look01Oversized280Gsm"
                data-preview-style-target="home.look01Oversized280Gsm"
                data-preview-style-type="text">{siteData?.content?.home?.look01Oversized280Gsm ?? "LOOK 01 • OVERSIZED 280 GSM JET BLACK"}</span>
            </div>
          </div>

          {/* Right Stack (2 images) */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-6 lg:gap-8">
            <div className="relative aspect-[4/3] overflow-clip bg-[#181818]">
              <Image
                src={siteData?.content?.home?.form?.image2 ?? "/images/categories/fit-oversized.jpg"}
                alt={siteData?.content?.home?.form?.imageAlt2 ?? "Vanta Lookbook Editorial 02"}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
                data-preview-field-path="home.form.image2" />
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 font-mono text-[10px] text-white uppercase">
                <span
                  data-preview-field-path="home.look02BoneCreamRelaxed"
                  data-preview-style-target="home.look02BoneCreamRelaxed"
                  data-preview-style-type="text">{siteData?.content?.home?.look02BoneCreamRelaxed ?? "LOOK 02 • BONE CREAM RELAXED DRAPE"}</span>
              </div>
            </div>

            <div className="relative aspect-[4/3] overflow-clip bg-[#181818]">
              <Image
                src={siteData?.content?.home?.form?.image3 ?? "/images/categories/fit-classic.jpg"}
                alt={siteData?.content?.home?.form?.imageAlt3 ?? "Vanta Lookbook Editorial 03"}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
                data-preview-field-path="home.form.image3" />
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 font-mono text-[10px] text-white uppercase">
                <span
                  data-preview-field-path="home.look03ClassicTailoredPima"
                  data-preview-style-target="home.look03ClassicTailoredPima"
                  data-preview-style-type="text">{siteData?.content?.home?.look03ClassicTailoredPima ?? "LOOK 03 • CLASSIC TAILORED PIMA"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
