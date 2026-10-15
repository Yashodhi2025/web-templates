'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { platformProductDetailHref, useSiteData } from '@deneb-ui/ui';
import { useStore } from '@/context/StoreContext';
import { PRODUCTS } from '@/data/products';

export function WishlistDrawer() {
  const siteData = useSiteData();
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Drawer */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-[#0B0B0B] text-white shadow-2xl transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-mono tracking-widest text-[#A9A9A5] uppercase"
              data-preview-field-path="home.savedPiecesLabel"
              data-preview-style-target="home.savedPiecesLabel"
              data-preview-style-type="text">{siteData?.content?.home?.savedPiecesLabel ?? "SAVED PIECES"}</span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-mono font-medium text-white">
              {wishlist.length}
            </span>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#A9A9A5] hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Close wishlist"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-white/5">
          {wishlistedProducts.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center py-16">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-[#A9A9A5] mb-4">
                <Heart className="h-7 w-7" />
              </div>
              <h3
                className="text-sm font-semibold tracking-wide uppercase mb-1"
                data-preview-field-path="home.yourWishlistEmptySubheading"
                data-preview-style-target="home.yourWishlistEmptySubheading"
                data-preview-style-type="text">{siteData?.content?.home?.yourWishlistEmptySubheading ?? "Your wishlist is empty"}</h3>
              <p
                className="text-xs text-[#A9A9A5] max-w-xs mb-6"
                data-preview-field-path="home.subtitle3"
                data-preview-style-target="home.subtitle3"
                data-preview-style-type="text">{siteData?.content?.home?.subtitle3 ?? "Tap the heart on any piece to save your favorite fits for later."}</p>
              <a
                onClick={() => setIsWishlistOpen(false)}
                className="bg-white text-black text-xs font-mono tracking-widest uppercase px-6 py-3 font-semibold hover:bg-[#EBE8DE] transition-colors"
                href={siteData?.content?.home?.shop?.exploreCollectionUrl ?? "/shop"}
                data-preview-field-path={"home.shop.exploreCollectionUrl"}
                data-preview-style-target="home.shop.exploreCollectionLabel"
                data-preview-style-type="text">
                <span
                  data-preview-field-path="home.shop.exploreCollectionLabel"
                  data-preview-style-target="home.shop.exploreCollectionLabel"
                  data-preview-style-type="text">{siteData?.content?.home?.shop?.exploreCollectionLabel ?? "EXPLORE COLLECTION"}</span>
              </a>
            </div>
          ) : (
            wishlistedProducts.map((product: any) => (
              <div key={product.id} className="py-4 flex gap-4">
                <div className="relative h-28 w-20 flex-shrink-0 overflow-clip bg-[#181818]">
                  <Image
                    src={(product.images.primary && typeof product.images.primary === 'string' && product.images.primary.trim() !== '') ? product.images.primary : '/images/showcase-phone.jpg'}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={platformProductDetailHref(product.slug)}
                        onClick={() => setIsWishlistOpen(false)}
                        className="text-xs font-semibold tracking-wide text-white hover:text-[#C9C6BF] transition-colors uppercase line-clamp-1"
                      >
                        {product.name}
                      </Link>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="text-[#A9A9A5] hover:text-[#D72626] transition-colors p-0.5"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="mt-1 text-[11px] font-mono text-[#A9A9A5]">
                      <span data-preview-field-path="home.fitLabel6" data-preview-style-target="home.fitLabel6" data-preview-style-type="text">{product.fit.toUpperCase()}{siteData?.content?.home?.fitLabel6 ?? "FIT"}</span> <span data-preview-static="chrome">•</span> <span data-preview-field-path="home.gsmLabel3" data-preview-style-target="home.gsmLabel3" data-preview-style-type="text">{product.gsm}{siteData?.content?.home?.gsmLabel3 ?? "GSM"}</span>
                    </div>

                    <div className="mt-1 text-xs font-mono font-medium text-white">
                      <span data-preview-field-path="home.lkr" data-preview-style-target="home.lkr" data-preview-style-type="text">{siteData?.content?.home?.lkr ?? "LKR"}</span> {product.price.toLocaleString()}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(product, product.colors[0].name, 'M');
                      toggleWishlist(product.id);
                    }}
                    className="mt-3 flex items-center justify-center gap-1.5 border border-white/20 bg-white/5 py-2 text-[11px] font-mono tracking-wider font-semibold uppercase hover:bg-white hover:text-black transition-colors"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span
                      data-preview-field-path="home.moveBagSizeMLabel"
                      data-preview-style-target="home.moveBagSizeMLabel"
                      data-preview-style-type="text">{siteData?.content?.home?.moveBagSizeMLabel ?? "MOVE TO BAG (SIZE M)"}</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
