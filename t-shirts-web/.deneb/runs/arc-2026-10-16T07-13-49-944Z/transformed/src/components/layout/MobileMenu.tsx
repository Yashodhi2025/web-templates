'use client';
import { useSiteData } from "@deneb-ui/ui";

import React from 'react';
import Link from 'next/link';
import { X, Search, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const siteData = useSiteData();
  const { setIsSearchOpen, setIsWishlistOpen, setIsCartOpen, cartCount, wishlistCount } = useStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex flex-col bg-[#0B0B0B] text-white animate-fade-in lg:hidden">
      {/* Top Header with Close */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
        <Link href="/" onClick={onClose} className="font-mono text-sm font-bold tracking-tighter text-white uppercase">
          <span
            data-preview-field-path="home.navigation.logoText"
            data-preview-style-target="home.navigation.logoText"
            data-preview-style-type="text">{siteData?.content?.home?.navigation?.logoText ?? "VANTA ATHLETICS"}</span>
        </Link>
        <button
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#A9A9A5] hover:bg-white/10 hover:text-white"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Main Navigation Links */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <Link
              href="/collections/t-shirts?sort=newest"
              onClick={onClose}
              className="flex items-center justify-between text-xl font-light tracking-tight text-white hover:text-[#C9C6BF] uppercase"
            >
              <span
                data-preview-field-path="home.navigation.newDropsLabel"
                data-preview-style-target="home.navigation.newDropsLabel"
                data-preview-style-type="text">{siteData?.content?.home?.navigation?.newDropsLabel ?? "NEW DROPS"}</span>
              <span
                className="text-[10px] font-mono bg-[#D72626] text-white px-2 py-0.5 font-bold"
                data-preview-field-path="home.navigation.latestLabel"
                data-preview-style-target="home.navigation.latestLabel"
                data-preview-style-type="text">{siteData?.content?.home?.navigation?.latestLabel ?? "LATEST"}</span>
            </Link>

            <Link
              href="/collections/t-shirts"
              onClick={onClose}
              className="flex items-center justify-between text-2xl font-bold tracking-tight text-white hover:text-[#C9C6BF] uppercase"
            >
              <span
                data-preview-field-path="home.navigation.tShirtsHeroLabel"
                data-preview-style-target="home.navigation.tShirtsHeroLabel"
                data-preview-style-type="text">{siteData?.content?.home?.navigation?.tShirtsHeroLabel ?? "T-SHIRTS (HERO)"}</span>
              <ArrowRight className="h-4 w-4 text-[#A9A9A5]" />
            </Link>

            <div className="pl-4 border-l border-white/10 space-y-3 pt-1">
              <Link
                href="/collections/t-shirts?fit=oversized"
                onClick={onClose}
                className="block text-sm font-mono text-[#A9A9A5] hover:text-white uppercase"
              >
                <span
                  data-preview-field-path="home.navigation.oversizedTees280Gsm"
                  data-preview-style-target="home.navigation.oversizedTees280Gsm"
                  data-preview-style-type="text">{siteData?.content?.home?.navigation?.oversizedTees280Gsm ?? "• Oversized Tees (280 GSM)"}</span>
              </Link>
              <Link
                href="/collections/t-shirts?fit=classic"
                onClick={onClose}
                className="block text-sm font-mono text-[#A9A9A5] hover:text-white uppercase"
              >
                <span
                  data-preview-field-path="home.navigation.classicFitTees"
                  data-preview-style-target="home.navigation.classicFitTees"
                  data-preview-style-type="text">{siteData?.content?.home?.navigation?.classicFitTees ?? "• Classic Fit Tees"}</span>
              </Link>
              <Link
                href="/collections/t-shirts?fit=performance"
                onClick={onClose}
                className="block text-sm font-mono text-[#A9A9A5] hover:text-white uppercase"
              >
                <span
                  data-preview-field-path="home.navigation.performanceTeesDryTech"
                  data-preview-style-target="home.navigation.performanceTeesDryTech"
                  data-preview-style-type="text">{siteData?.content?.home?.navigation?.performanceTeesDryTech ?? "• Performance Tees (Dry-Tech)"}</span>
              </Link>
            </div>

            <Link
              href="/collections/t-shirts?collection=black-series"
              onClick={onClose}
              className="flex items-center justify-between text-xl font-light tracking-tight text-white hover:text-[#C9C6BF] uppercase"
            >
              <span
                data-preview-field-path="home.navigation.blackSeriesLabel"
                data-preview-style-target="home.navigation.blackSeriesLabel"
                data-preview-style-type="text">{siteData?.content?.home?.navigation?.blackSeriesLabel ?? "BLACK SERIES"}</span>
              <ArrowRight className="h-4 w-4 text-[#A9A9A5]" />
            </Link>

            <Link
              href="/collections/t-shirts?fit=performance"
              onClick={onClose}
              className="flex items-center justify-between text-xl font-light tracking-tight text-white hover:text-[#C9C6BF] uppercase"
            >
              <span
                data-preview-field-path="home.navigation.sportRunningLabel"
                data-preview-style-target="home.navigation.sportRunningLabel"
                data-preview-style-type="text">{siteData?.content?.home?.navigation?.sportRunningLabel ?? "SPORT & RUNNING"}</span>
              <ArrowRight className="h-4 w-4 text-[#A9A9A5]" />
            </Link>
          </div>
        </div>

        {/* Quick Utility Actions */}
        <div className="mt-12 pt-8 border-t border-white/10 space-y-4">
          <button
            onClick={() => {
              onClose();
              setIsSearchOpen(true);
            }}
            className="flex items-center gap-3 text-sm font-mono text-[#C9C6BF] hover:text-white w-full uppercase"
          >
            <Search className="h-4 w-4" />
            <span
              data-preview-field-path="home.navigation.searchCatalogLabel"
              data-preview-style-target="home.navigation.searchCatalogLabel"
              data-preview-style-type="text">{siteData?.content?.home?.navigation?.searchCatalogLabel ?? "Search Catalog"}</span>
          </button>

          <button
            onClick={() => {
              onClose();
              setIsWishlistOpen(true);
            }}
            className="flex items-center justify-between text-sm font-mono text-[#C9C6BF] hover:text-white w-full uppercase"
          >
            <div className="flex items-center gap-3">
              <Heart className="h-4 w-4" />
              <span
                data-preview-field-path="home.navigation.savedPiecesLabel"
                data-preview-style-target="home.navigation.savedPiecesLabel"
                data-preview-style-type="text">{siteData?.content?.home?.navigation?.savedPiecesLabel ?? "Saved Pieces"}</span>
            </div>
            {wishlistCount > 0 && (
              <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              onClose();
              setIsCartOpen(true);
            }}
            className="flex items-center justify-between text-sm font-mono text-[#C9C6BF] hover:text-white w-full uppercase"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-4 w-4" />
              <span
                data-preview-field-path="home.navigation.shoppingBagLabel"
                data-preview-style-target="home.navigation.shoppingBagLabel"
                data-preview-style-type="text">{siteData?.content?.home?.navigation?.shoppingBagLabel ?? "Shopping Bag"}</span>
            </div>
            {cartCount > 0 && (
              <span className="rounded-full bg-[#D72626] px-2 py-0.5 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="border-t border-white/10 p-6 bg-[#0E0E0E] text-center font-mono text-xs text-[#7A7A78]">
        <span
          data-preview-field-path="home.navigation.builtMovementDesignedEverywhere"
          data-preview-style-target="home.navigation.builtMovementDesignedEverywhere"
          data-preview-style-type="text">{siteData?.content?.home?.navigation?.builtMovementDesignedEverywhere ?? "BUILT FOR MOVEMENT. DESIGNED FOR EVERYWHERE."}</span>
      </div>
    </div>
  );
}
