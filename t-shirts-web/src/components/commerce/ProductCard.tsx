'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { platformProductDetailHref, useSiteData } from '@deneb-ui/ui';
import { Product } from '@/types/store';
import { useStore } from '@/context/StoreContext';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const siteData = useSiteData();
  const { toggleWishlist, isWishlisted, addToCart } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [showQuickSizes, setShowQuickSizes] = useState(false);

  const isSaved = isWishlisted(product.id);

  return (
    <div
      className="group relative flex flex-col w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickSizes(false);
      }}
    >
      {/* Product Image Stage (80% visual hero) */}
      <div className="relative aspect-[3/4] w-full overflow-clip bg-[#F0EFEA] dark:bg-[#141414]">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          <span
            className={`bg-[#0B0B0B] text-white px-2 py-0.5 text-[10px] font-mono font-semibold tracking-widest uppercase ${product.isNewArrival ? '' : 'hidden'}`}
            data-preview-field-path="home.newLabel"
            data-preview-style-target="home.newLabel"
            data-preview-style-type="text">{siteData?.content?.home?.newLabel ?? "NEW"}</span>
          <span
            className={`bg-white text-black px-2 py-0.5 text-[10px] font-mono font-semibold tracking-widest uppercase border border-black/10 ${product.isBestSeller ? '' : 'hidden'}`}
            data-preview-field-path="home.popularLabel2"
            data-preview-style-target="home.popularLabel2"
            data-preview-style-type="text">{siteData?.content?.home?.popularLabel2 ?? "POPULAR"}</span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          data-preview-static="wishlist-toggle"
          className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-sm text-black dark:text-white transition-all duration-200 hover:scale-110"
          aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isSaved ? 'fill-[#D72626] text-[#D72626]' : 'text-current hover:text-[#D72626]'
            }`}
          />
        </button>

        {/* Primary and Hover Secondary Images */}
        <Link href={platformProductDetailHref(product.slug)} data-preview-static="product-link" className="block h-full w-full">
          <Image
            src={(product.images.primary && typeof product.images.primary === 'string' && product.images.primary.trim() !== '') ? product.images.primary : '/images/showcase-phone.jpg'}
            alt={product.name}
            fill
            priority={priority}
            data-preview-static="product-image"
            className={`object-cover transition-all duration-700 ease-out ${
              isHovered && product.images.secondary
                ? 'opacity-0 scale-100'
                : 'opacity-100 scale-100 group-hover:scale-[1.025]'
            }`}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {product.images.secondary && (
            <Image
              src={(product.images.secondary && typeof product.images.secondary === 'string' && product.images.secondary.trim() !== '') ? product.images.secondary : '/images/showcase-phone.jpg'}
              alt={`${product.name} alternate view`}
              fill
              data-preview-static="product-image"
              className={`object-cover transition-all duration-700 ease-out ${
                isHovered ? 'opacity-100 scale-[1.025]' : 'opacity-0 scale-100'
              }`}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}
        </Link>

        {/* Quick Add Overlay on Hover */}
        <div className="absolute inset-x-3 bottom-3 z-10">
          {!showQuickSizes ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowQuickSizes(true);
              }}
              className="w-full bg-white/95 dark:bg-[#0B0B0B]/95 text-black dark:text-white backdrop-blur-md py-2.5 text-[11px] font-mono tracking-widest font-semibold uppercase opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black shadow-lg"
              data-preview-field-path="home.quickAddLabel"
              data-preview-style-target="home.quickAddLabel"
              data-preview-style-type="button">{siteData?.content?.home?.quickAddLabel ?? "+ QUICK ADD"}</button>
          ) : (
            <div className="w-full bg-[#0B0B0B] p-2 shadow-xl animate-fade-in border border-white/10">
              <div className="text-[10px] font-mono text-[#A9A9A5] uppercase text-center mb-1.5">
                <span data-preview-field-path="home.selectSize" data-preview-style-target="home.selectSize" data-preview-style-type="text">{siteData?.content?.home?.selectSize ?? "SELECT SIZE"}</span>
              </div>
              <div className="grid grid-cols-6 gap-1">
                {product.sizes.map((s: any) => (
                  <button
                    key={s.size}
                    disabled={s.stock === 'sold-out'}
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product, selectedColor, s.size);
                      setShowQuickSizes(false);
                    }}
                    className={`h-7 text-[10px] font-mono font-semibold transition-colors ${
                      s.stock === 'sold-out'
                        ? 'text-[#555] line-through cursor-not-allowed bg-white/5'
                        : 'bg-white/10 text-white hover:bg-white hover:text-black'
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Metadata & Editorial Details */}
      <div className="mt-3 flex flex-col">
        {/* Colors Swatches */}
        <div className="flex items-center gap-1.5 mb-1.5">
          {product.colors.map((c: any) => (
            <button
              key={c.name}
              onClick={() => setSelectedColor(c.name)}
              data-preview-field-type="color"
              className={`h-3 w-3 rounded-full border transition-all ${
                selectedColor === c.name
                  ? 'ring-1 ring-black dark:ring-white scale-110 border-white'
                  : 'border-black/20 hover:scale-110'
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
              aria-label={`Select color ${c.name}`}
            />
          ))}
        </div>

        {/* Fit and GSM label */}
        <div className="text-[10px] font-mono tracking-widest text-[#7A7A78] uppercase flex items-center gap-1.5">
          <span data-preview-field-path="home.fitLabel5" data-preview-style-target="home.fitLabel5" data-preview-style-type="text">{product.fit}{siteData?.content?.home?.fitLabel5 ?? "fit"}</span>
          <span data-preview-static="chrome">•</span>
          <span data-preview-field-path="home.gsmLabel2" data-preview-style-target="home.gsmLabel2" data-preview-style-type="text">{product.gsm}{siteData?.content?.home?.gsmLabel2 ?? "GSM"}</span>
        </div>

        {/* Title */}
        <Link
          href={platformProductDetailHref(product.slug)}
          data-preview-static="product-title"
          className="text-xs sm:text-[13px] font-semibold uppercase tracking-tight text-[#0B0B0B] dark:text-white hover:text-[#555] dark:hover:text-[#A9A9A5] transition-colors mt-0.5 line-clamp-1"
        >
          {product.name}
        </Link>

        {/* Price in LKR */}
        <div className="mt-1 flex items-baseline gap-2 font-mono text-xs">
          <span
            className="font-semibold text-black dark:text-white"
            data-preview-field-path="home.lkrLabel9"
            data-preview-style-target="home.lkrLabel9"
            data-preview-style-type="text">{siteData?.content?.home?.lkrLabel9 ?? "LKR"}{product.price.toLocaleString()}
          </span>
          <span
            className={`text-[11px] text-[#A9A9A5] line-through ${product.compareAtPrice ? '' : 'hidden'}`}
            data-preview-field-path="home.lkrLabel10"
            data-preview-style-target="home.lkrLabel10"
            data-preview-style-type="text">{siteData?.content?.home?.lkrLabel10 ?? "LKR"}{product.compareAtPrice?.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
