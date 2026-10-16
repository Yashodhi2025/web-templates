'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, ArrowRight } from 'lucide-react';
import { platformProductDetailHref, useSiteData } from '@deneb-ui/ui';
import { useStore } from '@/context/StoreContext';
import { PRODUCTS } from '@/data/products';

const POPULAR_SEARCHES = [
  'Oversized Tee',
  'Black Tee',
  'Performance',
  '280 GSM',
  'Classic Fit',
  'Polo Shirt',
  'Running Shorts',
];

export function SearchOverlay() {
  const siteData = useSiteData();
  const { isSearchOpen, setIsSearchOpen } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const lower = searchTerm.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower) ||
        p.fit.toLowerCase().includes(lower) ||
        p.activity.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower) ||
        p.colors.some((c) => c.name.toLowerCase().includes(lower))
    );
  }, [searchTerm]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex flex-col bg-[#0B0B0B]/98 text-white backdrop-blur-xl animate-fade-in">
      {/* Top Bar with Close Button */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 lg:px-12 py-6">
        <span
          className="text-xs font-mono tracking-widest text-[#A9A9A5] uppercase"
          data-preview-field-path="home.vantaAthleticsSearchLabel"
          data-preview-style-target="home.vantaAthleticsSearchLabel"
          data-preview-style-type="text">{siteData?.content?.home?.vantaAthleticsSearchLabel ?? "VANTA ATHLETICS SEARCH"}</span>
        <button
          onClick={() => setIsSearchOpen(false)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-[#A9A9A5] hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Close search"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Main Search Input */}
      <div className="mx-auto w-full max-w-4xl px-6 pt-12 pb-6">
        <div className="relative border-b-2 border-white/20 pb-4 focus-within:border-white transition-colors">
          <div className="flex items-center gap-4">
            <Search className="h-7 w-7 text-[#A9A9A5]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={siteData?.content?.home?.whatLookingPlaceholder ?? "What are you looking for?"}
              autoFocus
              className="w-full bg-transparent text-2xl sm:text-4xl font-light tracking-tight text-white placeholder-[#5A5A58] focus:outline-none"
              data-preview-field-path="home.whatLookingPlaceholder" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="text-[#A9A9A5] hover:text-white p-2"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Popular Searches Pills */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span
            className="text-xs font-mono text-[#A9A9A5] uppercase mr-2"
            data-preview-field-path="home.popularLabel"
            data-preview-style-target="home.popularLabel"
            data-preview-style-type="text">{siteData?.content?.home?.popularLabel ?? "POPULAR:"}</span>
          {POPULAR_SEARCHES.map((tag: any) => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              className="border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-mono tracking-wider text-[#C9C6BF] hover:border-white hover:text-white transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results */}
      <div className="flex-1 overflow-y-auto px-6 lg:px-12 py-8">
        <div className="mx-auto max-w-5xl">
          {searchTerm.trim() && (
            <div className="mb-6 flex items-center justify-between">
              <span
                className="text-xs font-mono text-[#A9A9A5] uppercase tracking-wider"
                data-preview-field-path="home.forLabel"
                data-preview-style-target="home.forLabel"
                data-preview-style-type="text">
                {searchResults.length} {searchResults.length === 1 ? 'RESULT' : 'RESULTS'}{siteData?.content?.home?.forLabel ?? "FOR “”"}{searchTerm}&rdquo;
              </span>
              {searchResults.length > 0 && (
                <Link
                  href={`/collections/t-shirts?search=${encodeURIComponent(searchTerm)}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="flex items-center gap-1 text-xs font-mono text-[#D72626] hover:underline"
                >
                  <span
                    data-preview-field-path="home.viewAllCatalog"
                    data-preview-style-target="home.viewAllCatalog"
                    data-preview-style-type="text">{siteData?.content?.home?.viewAllCatalog ?? "View All in Catalog"}</span> <ArrowRight className="h-3 w-3" />
                </Link>
              )}
            </div>
          )}

          {searchTerm.trim() && searchResults.length === 0 ? (
            <div className="text-center py-16">
              <p
                className="text-sm font-mono text-[#A9A9A5] uppercase mb-2"
                data-preview-field-path="home.subtitle2"
                data-preview-style-target="home.subtitle2"
                data-preview-style-type="text">{siteData?.content?.home?.subtitle2 ?? "No products found"}</p>
              <p
                className="text-xs text-[#7A7A78] max-w-md mx-auto"
                data-preview-field-path="home.description7"
                data-preview-style-target="home.description7"
                data-preview-style-type="text">{siteData?.content?.home?.description7 ?? "Try searching with different terms like “heavyweight”, “oversized”, or “black tee”."}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {searchResults.map((product: any) => (
                <Link
                  key={product.id}
                  href={platformProductDetailHref(product.slug)}
                  onClick={() => setIsSearchOpen(false)}
                  className="group flex flex-col"
                >
                  <div className="relative aspect-[3/4] w-full overflow-clip bg-[#181818] mb-3">
                    <Image
                      src={(product.images.primary && typeof product.images.primary === 'string' && product.images.primary.trim() !== '') ? product.images.primary : '/images/showcase-phone.jpg'}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span
                      className="text-[11px] font-mono text-[#A9A9A5] uppercase"
                      data-preview-field-path="home.fitGsmLabel"
                      data-preview-style-target="home.fitGsmLabel"
                      data-preview-style-type="text">
                      {product.fit}{siteData?.content?.home?.fitGsmLabel ?? "fit • GSM"}{product.gsm} GSM
                    </span>
                    <h4 className="text-xs font-semibold text-white group-hover:text-[#C9C6BF] transition-colors uppercase mt-0.5 line-clamp-1">
                      {product.name}
                    </h4>
                    <span
                      className="text-xs font-mono font-medium text-white mt-1"
                      data-preview-field-path="home.lkrLabel11"
                      data-preview-style-target="home.lkrLabel11"
                      data-preview-style-type="text">{siteData?.content?.home?.lkrLabel11 ?? "LKR"}{product.price.toLocaleString()}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
