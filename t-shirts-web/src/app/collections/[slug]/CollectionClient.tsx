'use client';
import { useSiteData } from "@deneb-ui/ui";

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Filter, X, ChevronDown, Check, SlidersHorizontal } from 'lucide-react';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/commerce/ProductCard';
import { PRODUCTS, SWATCH_COLORS } from '@/data/products';
import { FitType, ActivityType } from '@/types/store';

interface CollectionClientProps {
  params: { slug: string };
}

export function CollectionClient({ params }: CollectionClientProps) {
  const siteData = useSiteData();
  const [selectedFits, setSelectedFits] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sp = new URLSearchParams(window.location.search);
      const initialFit = sp.get('fit') || '';
      const initialColor = sp.get('color') || '';
      const initialSort = sp.get('sort') || 'featured';
      const initialActivity = sp.get('activity') || '';
      if (initialFit) setSelectedFits([initialFit]);
      if (initialColor) setSelectedColors([initialColor]);
      if (initialActivity) setSelectedActivities([initialActivity]);
      if (initialSort) setSortBy(initialSort);
    }
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedFits.length > 0) {
      list = list.filter((p) => selectedFits.includes(p.fit));
    }

    if (selectedColors.length > 0) {
      list = list.filter((p) =>
        p.colors.some((c) =>
          selectedColors.some((sc) => c.name.toLowerCase().includes(sc.toLowerCase()))
        )
      );
    }

    if (selectedActivities.length > 0) {
      list = list.filter((p) => selectedActivities.includes(p.activity));
    }

    // Sort
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      list.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    } else if (sortBy === 'bestseller') {
      list.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return list;
  }, [selectedFits, selectedColors, selectedActivities, sortBy]);

  const toggleFit = (fit: string) => {
    setSelectedFits((prev) =>
      prev.includes(fit) ? prev.filter((f) => f !== fit) : [...prev, fit]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const toggleActivity = (act: string) => {
    setSelectedActivities((prev) =>
      prev.includes(act) ? prev.filter((a) => a !== act) : [...prev, act]
    );
  };

  const clearAllFilters = () => {
    setSelectedFits([]);
    setSelectedColors([]);
    setSelectedActivities([]);
  };

  const totalFiltersCount = selectedFits.length + selectedColors.length + selectedActivities.length;

  return (
    <div className="min-h-screen bg-[#FFFFFF] dark:bg-[#0B0B0B] text-[#0B0B0B] dark:text-white flex flex-col">
      <AnnouncementBar />
      <Header />

      {/* Category Hero Banner */}
      <section className="relative w-full border-b border-black/10 dark:border-white/10 bg-[#F5F4F0] dark:bg-[#121212] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <nav className="flex items-center gap-2 text-xs font-mono text-[#7A7A78] uppercase mb-3">
                <Link href="/" data-preview-static="breadcrumb-link" className="hover:text-black dark:hover:text-white">Home</Link>
                <span data-preview-static="chrome">/</span>
                <span
                  className="text-black dark:text-white font-medium"
                  data-preview-field-path="common.header.collectionsLabel"
                  data-preview-style-target="common.header.collectionsLabel"
                  data-preview-style-type="text">{siteData?.content?.common?.header?.collectionsLabel ?? "Collections"}</span>
                <span data-preview-static="chrome">/</span>
                <span
                  className="text-[#D72626]"
                  data-preview-field-path="common.header.tShirtsLabel"
                  data-preview-style-target="common.header.tShirtsLabel"
                  data-preview-style-type="text">{siteData?.content?.common?.header?.tShirtsLabel ?? "T-Shirts"}</span>
              </nav>

              <h1
                className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-none"
                data-preview-field-path="home.title2"
                data-preview-style-target="home.title2"
                data-preview-style-type="text">{siteData?.content?.home?.title2 ?? "T-SHIRTS"}<span
                className="font-light text-[#7A7A78]"
                data-preview-field-path="home.foundationLabel"
                data-preview-style-target="home.foundationLabel"
                data-preview-style-type="text">{siteData?.content?.home?.foundationLabel ?? "FOUNDATION"}</span>
              </h1>
              <p
                className="mt-3 text-xs sm:text-sm text-[#7A7A78] dark:text-[#A9A9A5] max-w-xl"
                data-preview-field-path="home.description"
                data-preview-style-target="home.description"
                data-preview-style-type="text">{siteData?.content?.home?.description ?? "The visual hero of Vanta Athletics. Custom-milled 240–280 GSM cotton and technical knits engineered for movement and quiet luxury durability."}</p>
            </div>

            <div className="text-xs font-mono text-[#7A7A78] tracking-wider uppercase">
              <span
                data-preview-field-path="home.showingPieces"
                data-preview-style-target="home.showingPieces"
                data-preview-style-type="text">{siteData?.content?.home?.showingPieces ?? "SHOWING PIECES"}</span> <span className="font-bold text-black dark:text-white">{filteredProducts.length}</span></div>
          </div>
        </div>
      </section>

      {/* Main Content Area: Sticky Filters + Product Grid */}
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-8 py-10 flex-1">
        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-6 mb-8">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex lg:hidden items-center gap-2 border border-black/20 dark:border-white/20 px-4 py-2 text-xs font-mono tracking-wider uppercase"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span
              data-preview-field-path="home.filtersLabel"
              data-preview-style-target="home.filtersLabel"
              data-preview-style-type="text">{siteData?.content?.home?.filtersLabel ?? "FILTERS"}</span>
            {totalFiltersCount > 0 && (
              <span className="rounded-full bg-[#D72626] text-white px-1.5 py-0.2 text-[10px] font-bold">
                {totalFiltersCount}
              </span>
            )}
          </button>

          {/* Active Filter Chips */}
          <div className="[display:none] lg:flex items-center gap-2 flex-wrap flex-1">
            {totalFiltersCount > 0 && (
              <>
                <span
                  className="text-xs font-mono text-[#7A7A78] uppercase mr-1"
                  data-preview-field-path="home.activeLabel"
                  data-preview-style-target="home.activeLabel"
                  data-preview-style-type="text">{siteData?.content?.home?.activeLabel ?? "ACTIVE:"}</span>
                {selectedFits.map((f: any) => (
                  <button
                    key={f}
                    onClick={() => toggleFit(f)}
                    className="inline-flex items-center gap-1.5 border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5 px-2.5 py-1 text-xs font-mono uppercase"
                  >
                    <span data-preview-field-path="home.fitLabel2" data-preview-style-target="home.fitLabel2" data-preview-style-type="text">{f}{siteData?.content?.home?.fitLabel2 ?? "fit"}</span>
                    <X className="h-3 w-3" />
                  </button>
                ))}
                {selectedColors.map((c: any) => (
                  <button
                    key={c}
                    onClick={() => toggleColor(c)}
                    className="inline-flex items-center gap-1.5 border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5 px-2.5 py-1 text-xs font-mono uppercase"
                  >
                    <span>{c}</span>
                    <X className="h-3 w-3" />
                  </button>
                ))}
                {selectedActivities.map((a: any) => (
                  <button
                    key={a}
                    onClick={() => toggleActivity(a)}
                    className="inline-flex items-center gap-1.5 border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5 px-2.5 py-1 text-xs font-mono uppercase"
                  >
                    <span>{a}</span>
                    <X className="h-3 w-3" />
                  </button>
                ))}
                <button
                  onClick={clearAllFilters}
                  className="text-xs font-mono text-[#D72626] hover:underline uppercase ml-2"
                  data-preview-field-path="home.clearAllLabel"
                  data-preview-style-target="home.clearAllLabel"
                  data-preview-style-type="button">{siteData?.content?.home?.clearAllLabel ?? "Clear All"}</button>
              </>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-xs font-mono text-[#7A7A78] uppercase [display:none] sm:inline" data-preview-static="decorative-icon">SORT BY:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border border-black/20 dark:border-white/20 px-3 py-2 text-xs font-mono tracking-wider text-black dark:text-white uppercase focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-[#0B0B0B] text-white"><span data-preview-field-path="home.featured" data-preview-style-target="home.featured" data-preview-style-type="text">{siteData?.content?.home?.featured ?? "Featured"}</span></option>
              <option value="newest" className="bg-[#0B0B0B] text-white"><span data-preview-field-path="home.newestDrops" data-preview-style-target="home.newestDrops" data-preview-style-type="text">{siteData?.content?.home?.newestDrops ?? "Newest Drops"}</span></option>
              <option value="bestseller" className="bg-[#0B0B0B] text-white"><span data-preview-field-path="home.bestSellers" data-preview-style-target="home.bestSellers" data-preview-style-type="text">{siteData?.content?.home?.bestSellers ?? "Best Sellers"}</span></option>
              <option value="price-low" className="bg-[#0B0B0B] text-white"><span
                data-preview-field-path="home.priceLowHigh"
                data-preview-style-target="home.priceLowHigh"
                data-preview-style-type="text">{siteData?.content?.home?.priceLowHigh ?? "Price: Low to High"}</span></option>
              <option value="price-high" className="bg-[#0B0B0B] text-white"><span
                data-preview-field-path="home.priceHighLow"
                data-preview-style-target="home.priceHighLow"
                data-preview-style-type="text">{siteData?.content?.home?.priceHighLow ?? "Price: High to Low"}</span></option>
            </select>
          </div>
        </div>

        {/* 2-Column Desktop Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="[display:none] lg:block lg:col-span-3 space-y-8 pr-6 border-r border-black/5 dark:border-white/5 sticky top-28">
            {/* Fit Category */}
            <div>
              <h4
                className="text-xs font-mono tracking-widest font-bold uppercase text-black dark:text-white mb-3"
                data-preview-field-path="home.silhouetteFitSubheading"
                data-preview-style-target="home.silhouetteFitSubheading"
                data-preview-style-type="text">{siteData?.content?.home?.silhouetteFitSubheading ?? "SILHOUETTE / FIT"}</h4>
              <div className="space-y-2">
                {[
                  { id: 'oversized', label: 'Oversized (280 GSM)' },
                  { id: 'classic', label: 'Classic Fit (240 GSM)' },
                  { id: 'performance', label: 'Performance (Technical)' },
                ].map((fit: any) => (
                  <label
                    key={fit.id}
                    className="flex items-center gap-2.5 text-xs font-mono text-[#7A7A78] dark:text-[#C9C6BF] hover:text-black dark:hover:text-white cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFits.includes(fit.id)}
                      onChange={() => toggleFit(fit.id)}
                      className="accent-[#D72626] h-3.5 w-3.5"
                    />
                    <span data-preview-static="fit-sidebar-label">{fit.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <h4
                className="text-xs font-mono tracking-widest font-bold uppercase text-black dark:text-white mb-3"
                data-preview-field-path="home.colorPaletteSubheading"
                data-preview-style-target="home.colorPaletteSubheading"
                data-preview-style-type="text">{siteData?.content?.home?.colorPaletteSubheading ?? "COLOR PALETTE"}</h4>
              <div className="flex flex-wrap gap-2">
                {SWATCH_COLORS.map((c: any) => {
                  const isChecked = selectedColors.includes(c.name);
                  return (
                    <button
                      key={c.name}
                      onClick={() => toggleColor(c.name)}
                      data-preview-static="color-swatch-btn"
                      className={`flex items-center gap-1.5 px-2.5 py-1 border text-[11px] font-mono transition-colors ${
                        isChecked
                          ? 'border-black dark:border-white bg-black/5 dark:bg-white/10 font-bold'
                          : 'border-black/15 dark:border-white/15 text-[#7A7A78] hover:border-black dark:hover:border-white'
                      }`}
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full border border-black/20"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span data-preview-static="color-swatch-label">{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Activity */}
            <div>
              <h4
                className="text-xs font-mono tracking-widest font-bold uppercase text-black dark:text-white mb-3"
                data-preview-field-path="home.disciplineActivitySubheading"
                data-preview-style-target="home.disciplineActivitySubheading"
                data-preview-style-type="text">{siteData?.content?.home?.disciplineActivitySubheading ?? "DISCIPLINE / ACTIVITY"}</h4>
              <div className="space-y-2">
                {[
                  { id: 'running', label: 'Running & Track' },
                  { id: 'training', label: 'Strength & Training' },
                  { id: 'court', label: 'Court Sports' },
                  { id: 'lifestyle', label: 'Everyday Lifestyle' },
                  { id: 'rest-day', label: 'Rest Day' },
                ].map((act: any) => (
                  <label
                    key={act.id}
                    className="flex items-center gap-2.5 text-xs font-mono text-[#7A7A78] dark:text-[#C9C6BF] hover:text-black dark:hover:text-white cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedActivities.includes(act.id)}
                      onChange={() => toggleActivity(act.id)}
                      className="accent-[#D72626] h-3.5 w-3.5"
                    />
                    <span data-preview-static="activity-sidebar-label">{act.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="col-span-12 lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="py-24 text-center">
                <p
                  className="text-sm font-mono text-[#7A7A78] uppercase mb-4"
                  data-preview-field-path="home.subtitle"
                  data-preview-style-target="home.subtitle"
                  data-preview-style-type="text">{siteData?.content?.home?.subtitle ?? "No pieces matched your selected filters."}</p>
                <button
                  onClick={clearAllFilters}
                  className="bg-black dark:bg-white text-white dark:text-black px-6 py-3 text-xs font-mono font-bold tracking-widest uppercase"
                  data-preview-field-path="home.resetAllFiltersLabel"
                  data-preview-style-target="home.resetAllFiltersLabel"
                  data-preview-style-type="button">{siteData?.content?.home?.resetAllFiltersLabel ?? "RESET ALL FILTERS"}</button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-10">
                {filteredProducts.map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative z-10 flex h-full w-full max-w-xs flex-col bg-[#0B0B0B] text-white p-6 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <span
                className="text-xs font-mono font-bold uppercase tracking-wider"
                data-preview-field-path="home.filtersLabel2"
                data-preview-style-target="home.filtersLabel2"
                data-preview-style-type="text">{siteData?.content?.home?.filtersLabel2 ?? "FILTERS"}</span>
              <button onClick={() => setIsMobileFilterOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Filters Content */}
            <div className="space-y-6">
              <div>
                <h4
                  className="text-xs font-mono text-[#A9A9A5] uppercase mb-3"
                  data-preview-field-path="home.fitSubheading"
                  data-preview-style-target="home.fitSubheading"
                  data-preview-style-type="text">{siteData?.content?.home?.fitSubheading ?? "FIT"}</h4>
                <div className="space-y-2">
                  {['oversized', 'classic', 'performance'].map((fit: any) => (
                    <label key={fit} className="flex items-center gap-2 text-xs font-mono uppercase">
                      <input
                        type="checkbox"
                        checked={selectedFits.includes(fit)}
                        onChange={() => toggleFit(fit)}
                        className="accent-[#D72626]"
                      />
                      <span data-preview-field-path="home.fitLabel3" data-preview-style-target="home.fitLabel3" data-preview-style-type="text">{fit}{siteData?.content?.home?.fitLabel3 ?? "fit"}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4
                  className="text-xs font-mono text-[#A9A9A5] uppercase mb-3"
                  data-preview-field-path="home.colorsSubheading"
                  data-preview-style-target="home.colorsSubheading"
                  data-preview-style-type="text">{siteData?.content?.home?.colorsSubheading ?? "COLORS"}</h4>
                <div className="flex flex-wrap gap-2">
                  {SWATCH_COLORS.map((c: any) => (
                    <button
                      key={c.name}
                      onClick={() => toggleColor(c.name)}
                      className={`px-2 py-1 text-xs font-mono border ${
                        selectedColors.includes(c.name)
                          ? 'border-white font-bold bg-white/10'
                          : 'border-white/20 text-[#A9A9A5]'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-white/10 flex gap-2">
              <button
                onClick={clearAllFilters}
                className="w-1/2 border border-white/20 py-3 text-xs font-mono uppercase"
                data-preview-field-path="home.resetLabel"
                data-preview-style-target="home.resetLabel"
                data-preview-style-type="button">{siteData?.content?.home?.resetLabel ?? "RESET"}</button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-1/2 bg-white text-black py-3 text-xs font-mono font-bold uppercase"
                data-preview-field-path="home.applyLabel"
                data-preview-style-target="home.applyLabel"
                data-preview-style-type="button">{siteData?.content?.home?.applyLabel ?? "APPLY ()"}{filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
