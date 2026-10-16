'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { platformProductDetailHref, useSiteData } from '@deneb-ui/ui';
import { useStore } from '@/context/StoreContext';

export function CartDrawer() {
  const siteData = useSiteData();
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartCount,
    cartSubtotal,
    freeShippingRemaining,
    freeShippingPercent,
    freeShippingThreshold,
  } = useStore();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="relative z-10 flex h-full w-full max-w-md flex-col bg-[#0B0B0B] text-white shadow-2xl transition-transform duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-mono tracking-widest text-[#A9A9A5] uppercase"
              data-preview-field-path="home.yourBagLabel"
              data-preview-style-target="home.yourBagLabel"
              data-preview-style-type="text">{siteData?.content?.home?.yourBagLabel ?? "YOUR BAG"}</span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-mono font-medium text-white">
              {cartCount}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#A9A9A5] hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Close bag"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="border-b border-white/10 bg-[#141414] px-6 py-3.5">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            {freeShippingRemaining > 0 ? (
              <span
                className="text-[#C9C6BF]"
                data-preview-field-path="home.addFreeDeliveryLabel"
                data-preview-style-target="home.addFreeDeliveryLabel"
                data-preview-style-type="text">{siteData?.content?.home?.addFreeDeliveryLabel ?? "Add for free delivery"}<span
                className="font-semibold text-white"
                data-preview-field-path="home.lkrLabel5"
                data-preview-style-target="home.lkrLabel5"
                data-preview-style-type="text">{siteData?.content?.home?.lkrLabel5 ?? "LKR"}{freeShippingRemaining.toLocaleString()}</span>{siteData?.content?.home?.addFreeDeliveryLabel ?? "Add for free delivery"}</span>
            ) : (
              <span
                className="flex items-center gap-1.5 font-semibold text-[#D72626]"
                data-preview-field-path="home.freeIslandwideShippingUnlockedLabel"
                data-preview-style-target="home.freeIslandwideShippingUnlockedLabel"
                data-preview-style-type="text">
                <ShieldCheck className="h-3.5 w-3.5" />{siteData?.content?.home?.freeIslandwideShippingUnlockedLabel ?? "FREE ISLANDWIDE SHIPPING UNLOCKED"}</span>
            )}
            <span className="text-[#A9A9A5]" data-preview-static="decorative-copy">{freeShippingPercent}%</span>
          </div>
          <div className="h-1.5 w-full overflow-clip rounded-full bg-white/10">
            <div
              className="h-full bg-[#D72626] transition-all duration-500 ease-out"
              style={{ width: `${freeShippingPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-white/5">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center py-16">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/5 text-[#A9A9A5] mb-4">
                <ShoppingBag className="h-7 w-7" />
              </div>
              <h3
                className="text-sm font-semibold tracking-wide uppercase mb-1"
                data-preview-field-path="home.yourBagEmptySubheading"
                data-preview-style-target="home.yourBagEmptySubheading"
                data-preview-style-type="text">{siteData?.content?.home?.yourBagEmptySubheading ?? "Your bag is empty"}</h3>
              <p
                className="text-xs text-[#A9A9A5] max-w-xs mb-6"
                data-preview-field-path="home.description6"
                data-preview-style-target="home.description6"
                data-preview-style-type="text">{siteData?.content?.home?.description6 ?? "Discover our signature heavyweight and performance t-shirts engineered for movement."}</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-white text-black text-xs font-mono tracking-widest uppercase px-6 py-3 font-semibold hover:bg-[#EBE8DE] transition-colors"
                data-preview-field-path="home.startShoppingLabel"
                data-preview-style-target="home.startShoppingLabel"
                data-preview-style-type="button">{siteData?.content?.home?.startShoppingLabel ?? "START SHOPPING"}</button>
            </div>
          ) : (
            cart.map((item: any) => (
              <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} className="py-4 flex gap-4">
                {/* Product Thumbnail */}
                <div className="relative h-24 w-20 flex-shrink-0 overflow-clip bg-[#181818]">
                  <Image
                    src={(item.product.images.primary && typeof item.product.images.primary === 'string' && item.product.images.primary.trim() !== '') ? item.product.images.primary : '/images/showcase-phone.jpg'}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={platformProductDetailHref(item.product.slug)}
                        onClick={() => setIsCartOpen(false)}
                        className="text-xs font-semibold tracking-wide text-white hover:text-[#C9C6BF] transition-colors uppercase line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedColor, item.selectedSize)}
                        className="text-[#A9A9A5] hover:text-[#D72626] transition-colors p-0.5"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-[11px] font-mono text-[#A9A9A5]">
                      <span>{item.selectedColor}</span>
                      <span data-preview-static="chrome">•</span>
                      <span
                        className="font-semibold text-white"
                        data-preview-field-path="home.sizeLabel3"
                        data-preview-style-target="home.sizeLabel3"
                        data-preview-style-type="text">{siteData?.content?.home?.sizeLabel3 ?? "SIZE"}{item.selectedSize}</span>
                    </div>
                  </div>

                  {/* Quantity & Price */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-white/20 bg-[#181818]">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                        className="flex h-7 w-7 items-center justify-center text-[#A9A9A5] hover:text-white transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-xs font-mono font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                        className="flex h-7 w-7 items-center justify-center text-[#A9A9A5] hover:text-white transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <span
                      className="text-xs font-mono font-medium text-white"
                      data-preview-field-path="home.lkrLabel6"
                      data-preview-style-target="home.lkrLabel6"
                      data-preview-style-type="text">{siteData?.content?.home?.lkrLabel6 ?? "LKR"}{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {cart.length > 0 && (
          <div className="border-t border-white/10 bg-[#0E0E0E] p-6 space-y-4">
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-[#A9A9A5]">
                <span
                  data-preview-field-path="home.subtotalLabel"
                  data-preview-style-target="home.subtotalLabel"
                  data-preview-style-type="text">{siteData?.content?.home?.subtotalLabel ?? "SUBTOTAL"}</span>
                <span
                  className="text-white font-semibold"
                  data-preview-field-path="home.lkrLabel7"
                  data-preview-style-target="home.lkrLabel7"
                  data-preview-style-type="text">{siteData?.content?.home?.lkrLabel7 ?? "LKR"}{cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#A9A9A5]">
                <span
                  data-preview-field-path="home.estimatedDeliveryLabel"
                  data-preview-style-target="home.estimatedDeliveryLabel"
                  data-preview-style-type="text">{siteData?.content?.home?.estimatedDeliveryLabel ?? "ESTIMATED DELIVERY"}</span>
                <span className="text-white">
                  {freeShippingRemaining === 0 ? 'FREE' : 'LKR 450'}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex justify-between items-baseline font-mono">
              <span
                className="text-xs tracking-wider text-[#A9A9A5] uppercase"
                data-preview-field-path="home.totalLabel"
                data-preview-style-target="home.totalLabel"
                data-preview-style-type="text">{siteData?.content?.home?.totalLabel ?? "TOTAL"}</span>
              <span
                className="text-base font-bold text-white"
                data-preview-field-path="home.lkrLabel8"
                data-preview-style-target="home.lkrLabel8"
                data-preview-style-type="text">{siteData?.content?.home?.lkrLabel8 ?? "LKR"}{(cartSubtotal + (freeShippingRemaining === 0 ? 0 : 450)).toLocaleString()}
              </span>
            </div>

            <button
              onClick={() => {
                alert('Checkout simulation: Order received for LKR ' + (cartSubtotal + (freeShippingRemaining === 0 ? 0 : 450)).toLocaleString());
              }}
              className="w-full flex items-center justify-center gap-2 bg-white text-black py-4 text-xs font-mono tracking-widest font-bold uppercase hover:bg-[#D72626] hover:text-white transition-all duration-300"
            >
              <span
                data-preview-field-path="home.proceedCheckoutLabel"
                data-preview-style-target="home.proceedCheckoutLabel"
                data-preview-style-type="text">{siteData?.content?.home?.proceedCheckoutLabel ?? "PROCEED TO CHECKOUT"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => setIsCartOpen(false)}
              className="w-full text-center text-[11px] font-mono tracking-wider text-[#A9A9A5] hover:text-white uppercase transition-colors"
              data-preview-field-path="home.continueShoppingLabel"
              data-preview-style-target="home.continueShoppingLabel"
              data-preview-style-type="button">{siteData?.content?.home?.continueShoppingLabel ?? "CONTINUE SHOPPING"}</button>
          </div>
        )}
      </div>
    </div>
  );
}
