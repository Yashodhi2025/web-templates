'use client';
import { useSiteData } from "@deneb-ui/ui";

import React from 'react';
import Image from 'next/image';
import { Layers, Shield, Sparkles, RefreshCw, Feather } from 'lucide-react';

const DEFAULT_SPEC_PILLS = [
  { label: '280 GSM DENSITY', icon: Layers },
  { label: '100% COMBED COTTON', icon: Feather },
  { label: 'ZERO RESIDUAL SHRINKAGE', icon: RefreshCw },
  { label: 'REINFORCED BOUND COLLAR', icon: Shield },
  { label: 'ORGANIC CARBON PIGMENTS', icon: Sparkles },
];

export function ProductStory() {
  const siteData = useSiteData();
  const SPEC_PILLS: any[] = siteData?.content?.home?.SPEC_PILLS ?? DEFAULT_SPEC_PILLS;
  return (
    <section className="w-full bg-[#FFFFFF] dark:bg-[#0B0B0B] py-24 border-b border-black/5 dark:border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Macro Fabric Image */}
          <div className="lg:col-span-6 relative aspect-[4/5] w-full overflow-clip bg-[#181818] shadow-2xl">
            <Image
              src={siteData?.content?.home?.about?.image ?? "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop"}
              alt={siteData?.content?.home?.about?.imageAlt ?? "Vanta Heavyweight Cotton Macro Fabric Texture"}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              data-preview-field-path="home.about.image" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6">
              <span
                className="text-[10px] font-mono tracking-widest text-[#D72626] uppercase font-bold block mb-1"
                data-preview-field-path="home.about.microscopicIntegrityLabel"
                data-preview-style-target="home.about.microscopicIntegrityLabel"
                data-preview-style-type="text">{siteData?.content?.home?.about?.microscopicIntegrityLabel ?? "MICROSCOPIC INTEGRITY"}</span>
              <p
                className="text-sm font-mono text-white font-medium"
                data-preview-field-path="home.about.description"
                data-preview-style-target="home.about.description"
                data-preview-style-type="text">{siteData?.content?.home?.about?.description ?? "High-twist double-spun yarns eliminate surface pilling and preserve structural density across 100+ washes."}</p>
            </div>
          </div>

          {/* Right Column: Narrative & Principles */}
          <div className="lg:col-span-6 flex flex-col">
            <span
              className="text-xs font-mono tracking-[0.25em] text-[#D72626] font-semibold uppercase mb-2"
              data-preview-field-path="home.about.materialHonestyLabel"
              data-preview-style-target="home.about.materialHonestyLabel"
              data-preview-style-type="text">{siteData?.content?.home?.about?.materialHonestyLabel ?? "MATERIAL HONESTY"}</span>
            <h2
              className="text-3xl sm:text-5xl font-light tracking-tight text-[#0B0B0B] dark:text-white uppercase mb-6 leading-tight"
              data-preview-field-path="home.about.heading"
              data-preview-style-target="home.about.heading"
              data-preview-style-type="text">{siteData?.content?.home?.about?.heading ?? "MADE"}<span
              className="font-bold"
              data-preview-field-path="home.about.betterLabel"
              data-preview-style-target="home.about.betterLabel"
              data-preview-style-type="text">{siteData?.content?.home?.about?.betterLabel ?? "BETTER"}</span>
            </h2>
            <p
              className="text-sm text-[#7A7A78] dark:text-[#A9A9A5] leading-relaxed mb-8"
              data-preview-field-path="home.about.description2"
              data-preview-style-target="home.about.description2"
              data-preview-style-type="text">{siteData?.content?.home?.about?.description2 ?? "We rejected fast-fashion cotton blends that pill, stretch and lose their collar shape after three washes. Our foundation tees are custom milled to deliver sculptural weight and permanent comfort."}</p>

            {/* 3 Principles */}
            <div className="space-y-6 border-t border-black/10 dark:border-white/10 pt-6 mb-8">
              <div>
                <h4
                  className="text-xs font-mono font-bold uppercase text-[#0B0B0B] dark:text-white tracking-wider mb-1"
                  data-preview-field-path="home.about.item01HeavyweightFabric280Gsm"
                  data-preview-style-target="home.about.item01HeavyweightFabric280Gsm"
                  data-preview-style-type="text">{siteData?.content?.home?.about?.item01HeavyweightFabric280Gsm ?? "01 / HEAVYWEIGHT FABRIC (280 GSM)"}</h4>
                <p
                  className="text-xs text-[#7A7A78] dark:text-[#A9A9A5] leading-normal"
                  data-preview-field-path="home.about.description3"
                  data-preview-style-target="home.about.description3"
                  data-preview-style-type="text">{siteData?.content?.home?.about?.description3 ?? "Dense long-staple cotton with a substantial, cool hand-feel that never clings to the body."}</p>
              </div>

              <div>
                <h4
                  className="text-xs font-mono font-bold uppercase text-[#0B0B0B] dark:text-white tracking-wider mb-1"
                  data-preview-field-path="home.about.item02EngineeredAnatomicalFitSubheading"
                  data-preview-style-target="home.about.item02EngineeredAnatomicalFitSubheading"
                  data-preview-style-type="text">{siteData?.content?.home?.about?.item02EngineeredAnatomicalFitSubheading ?? "02 / ENGINEERED ANATOMICAL FIT"}</h4>
                <p
                  className="text-xs text-[#7A7A78] dark:text-[#A9A9A5] leading-normal"
                  data-preview-field-path="home.about.description4"
                  data-preview-style-target="home.about.description4"
                  data-preview-style-type="text">{siteData?.content?.home?.about?.description4 ?? "Sculpted around real athletic shoulders. Balanced bicep drop with zero excess billowing at the waist."}</p>
              </div>

              <div>
                <h4
                  className="text-xs font-mono font-bold uppercase text-[#0B0B0B] dark:text-white tracking-wider mb-1"
                  data-preview-field-path="home.about.item03BuiltEnduranceSubheading"
                  data-preview-style-target="home.about.item03BuiltEnduranceSubheading"
                  data-preview-style-type="text">{siteData?.content?.home?.about?.item03BuiltEnduranceSubheading ?? "03 / BUILT FOR ENDURANCE"}</h4>
                <p
                  className="text-xs text-[#7A7A78] dark:text-[#A9A9A5] leading-normal"
                  data-preview-field-path="home.about.description5"
                  data-preview-style-target="home.about.description5"
                  data-preview-style-type="text">{siteData?.content?.home?.about?.description5 ?? "1.25-inch double-needle bound collar with herringbone internal tape that remains completely flat wash after wash."}</p>
              </div>
            </div>

            {/* Spec Chips */}
            <div
              className="flex flex-wrap gap-2"
              data-preview-list-path="home.SPEC_PILLS"
              data-preview-style-target="home.SPEC_PILLS.grid"
              data-preview-style-type="grid">
              {SPEC_PILLS.map((pill: any, index: number) => {
                const Icon = pill.icon;
                return (
                  <div
                    key={pill.label}
                    className="flex items-center gap-1.5 border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3 py-1.5 text-[10px] font-mono tracking-wider font-semibold text-[#0B0B0B] dark:text-white uppercase"
                    data-preview-item-path={`home.SPEC_PILLS[${index}]`}
                    data-preview-style-target={`home.SPEC_PILLS[${index}].card`}
                    data-preview-style-type="card">
                    <Icon className="h-3 w-3 text-[#D72626]" data-preview-static="decorative-icon" />
                    <span data-preview-field-path={`home.SPEC_PILLS[${index}].label`}>{pill.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
