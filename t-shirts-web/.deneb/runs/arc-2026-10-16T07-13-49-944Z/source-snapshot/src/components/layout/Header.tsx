'use client';
import { useSiteData } from "@deneb-ui/ui";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, Menu } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { NAV_LINKS } from '@/data/navigation';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const siteData = useSiteData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { cartCount, wishlistCount, setIsCartOpen, setIsWishlistOpen, setIsSearchOpen } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B0B0B]/95 text-white backdrop-blur-md border-b border-white/10 shadow-lg'
            : 'bg-[#0B0B0B] text-white border-b border-white/5'
        }`}
      >
        <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-8">
          {/* Left: Mobile Hamburger & Desktop Brand Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center text-white lg:hidden"
              aria-label="Open navigation menu"
              data-preview-static="menu-toggle"
            >
              <Menu className="h-6 w-6" />
            </button>

            <Link
              href="/"
              data-preview-static="brand-logo"
              className="group flex items-center gap-2"
            >
              <span
                className="flex h-6 w-6 items-center justify-center bg-white text-black font-mono font-black text-xs tracking-tighter"
                data-preview-static="decorative-copy">
                V
              </span>
              <span className="font-mono text-sm sm:text-base font-black tracking-tighter text-white group-hover:text-[#C9C6BF] transition-colors uppercase">
                {siteData?.content?.common?.header?.vantaathleticsLabel ?? "VANTAATHLETICS"}
                <span className="text-[#D72626]" data-preview-static="chrome">.</span>
                {siteData?.content?.common?.header?.vantaathleticsLabel ?? "VANTAATHLETICS"}
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="[display:none] lg:flex items-center gap-8">
            {NAV_LINKS.map((link: any) => {
              const displayText = link.label === 'T-SHIRTS'
                ? (siteData?.content?.common?.header?.tShirtsLabel ?? link.label)
                : link.label === 'COLLECTIONS'
                ? (siteData?.content?.common?.header?.collectionsLabel ?? link.label)
                : link.label;

              return (
                <div
                  key={link.label}
                  onMouseEnter={() => (link.hasMega ? setActiveMega(link.label) : setActiveMega(null))}
                  className="relative py-6"
                >
                  <Link
                    href={link.href}
                    data-preview-static="nav-link"
                    className={`text-xs font-mono tracking-widest uppercase transition-colors relative py-1 ${
                      link.highlight
                        ? 'font-bold text-white'
                        : 'font-medium text-[#C9C6BF] hover:text-white'
                    }`}
                  >
                    {displayText}
                    {link.highlight && (
                      <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-[#D72626]" />
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>

          {/* Right: Actions (Search, Wishlist, Bag) */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              data-preview-static="search-trigger"
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center text-[#C9C6BF] hover:text-white transition-colors"
              aria-label="Search store"
            >
              <Search className="h-4 sm:h-5 w-4 sm:w-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              data-preview-static="wishlist-trigger"
              className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center text-[#C9C6BF] hover:text-white transition-colors"
              aria-label="View wishlist"
            >
              <Heart className="h-4 sm:h-5 w-4 sm:w-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-2 right-2 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white text-[9px] font-mono font-bold text-black">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              data-preview-static="cart-trigger"
              className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center text-white hover:text-[#C9C6BF] transition-colors"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="h-4 sm:h-5 w-4 sm:w-5" />
              {cartCount > 0 && (
                <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#D72626] text-[10px] font-mono font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <MegaMenu isOpen={Boolean(activeMega)} onClose={() => setActiveMega(null)} />
      </header>

      {/* Mobile Drawer */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
