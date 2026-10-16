'use client';
import { useSiteData } from "@deneb-ui/ui";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { MEGA_MENU_MEN } from '@/data/navigation';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const siteData = useSiteData();
  if (!isOpen) return null;

  return (
    <div
      onMouseLeave={onClose}
      className="absolute top-full left-0 w-full border-b border-white/10 bg-[#0B0B0B]/98 text-white backdrop-blur-xl shadow-2xl transition-all duration-300 z-40 animate-fade-in"
    >
      <div className="mx-auto max-w-7xl px-8 py-10">
        <div className="grid grid-cols-12 gap-8">
          {/* Column 1: Featured */}
          <div className="col-span-3">
            <h4
              className="text-[11px] font-mono tracking-widest text-[#7A7A78] uppercase mb-4"
              data-preview-field-path="home.navigation.featuredSubheading"
              data-preview-style-target="home.navigation.featuredSubheading"
              data-preview-style-type="text">{siteData?.content?.home?.navigation?.featuredSubheading ?? "FEATURED"}</h4>
            <ul className="space-y-3">
              {MEGA_MENU_MEN.featured.map((item: any) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group inline-flex items-center gap-2 text-xs font-medium tracking-wide text-[#C9C6BF] hover:text-white transition-colors uppercase"
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="rounded-full bg-[#D72626] px-1.5 py-0.2 text-[9px] font-mono font-bold text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Shop Categories */}
          <div className="col-span-3">
            <h4
              className="text-[11px] font-mono tracking-widest text-[#7A7A78] uppercase mb-4"
              data-preview-field-path="home.navigation.shopApparelSubheading"
              data-preview-style-target="home.navigation.shopApparelSubheading"
              data-preview-style-type="text">{siteData?.content?.home?.navigation?.shopApparelSubheading ?? "SHOP APPAREL"}</h4>
            <ul className="space-y-3">
              {MEGA_MENU_MEN.shop.map((item: any) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group inline-flex items-center gap-2 text-xs font-medium tracking-wide text-[#C9C6BF] hover:text-white transition-colors uppercase"
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] font-mono text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Shop by Activity */}
          <div className="col-span-3">
            <h4
              className="text-[11px] font-mono tracking-widest text-[#7A7A78] uppercase mb-4"
              data-preview-field-path="home.navigation.shopActivitySubheading"
              data-preview-style-target="home.navigation.shopActivitySubheading"
              data-preview-style-type="text">{siteData?.content?.home?.navigation?.shopActivitySubheading ?? "SHOP BY ACTIVITY"}</h4>
            <ul className="space-y-3">
              {MEGA_MENU_MEN.activity.map((item: any) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="text-xs font-medium tracking-wide text-[#C9C6BF] hover:text-white transition-colors uppercase block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Editorial Card */}
          <div className="col-span-3">
            <Link
              href={MEGA_MENU_MEN.promo.href}
              onClick={onClose}
              className="group relative block aspect-[4/5] w-full overflow-hidden bg-[#181818]"
            >
              <Image
                src={(MEGA_MENU_MEN.promo.image && typeof MEGA_MENU_MEN.promo.image === 'string' && MEGA_MENU_MEN.promo.image.trim() !== '') ? MEGA_MENU_MEN.promo.image : '/images/showcase-phone.jpg'}
                alt={MEGA_MENU_MEN.promo.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
                sizes="300px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none" />
              <div className="absolute inset-x-4 bottom-4 flex flex-col">
                <span
                  className="text-[10px] font-mono tracking-widest text-[#D72626] font-semibold uppercase mb-1"
                  data-preview-field-path="common.navigation.editorialSeriesLabel"
                  data-preview-style-target="common.navigation.editorialSeriesLabel"
                  data-preview-style-type="text">{siteData?.content?.common?.navigation?.editorialSeriesLabel ?? "EDITORIAL SERIES"}</span>
                <h5 className="text-sm font-bold uppercase tracking-tight text-white mb-1">
                  {MEGA_MENU_MEN.promo.title}
                </h5>
                <p className="text-[11px] text-[#C9C6BF] line-clamp-2 mb-3">
                  {MEGA_MENU_MEN.promo.subtitle}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-white group-hover:text-[#D72626] transition-colors uppercase">
                  <span>{MEGA_MENU_MEN.promo.cta}</span>
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
