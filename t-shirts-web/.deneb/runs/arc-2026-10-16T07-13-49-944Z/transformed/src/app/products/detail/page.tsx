'use client';

import React from 'react';
import { PlatformProductDetail } from '@deneb-ui/ui';
import { PRODUCTS } from '@/data/products';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// Formatted product entries matching by both slug and id
const DETAIL_PRODUCTS = PRODUCTS.flatMap((p) => {
  const item = {
    ...p,
    title: p.name,
    name: p.name,
    imageUrl: p.images.primary,
    featuredImage: p.images.primary,
    image: p.images.primary,
    price: `LKR ${p.price.toLocaleString()}`,
    originalPrice: p.compareAtPrice ? `LKR ${p.compareAtPrice.toLocaleString()}` : undefined,
    compareAtPrice: p.compareAtPrice ? `LKR ${p.compareAtPrice.toLocaleString()}` : undefined,
    gallery: [p.images.primary, p.images.secondary, p.images.modelFront, p.images.modelBack].filter(Boolean) as string[],
    images: [p.images.primary, p.images.secondary, p.images.modelFront, p.images.modelBack].filter(Boolean) as string[],
    sizes: p.sizes.map((s) => s.size),
    colors: p.colors.map((c) => ({ name: c.name, hex: c.hex })),
    badge: p.isNewArrival ? 'NEW ARRIVAL' : (p.isBestSeller ? 'BEST SELLER' : ''),
  };
  return [
    { ...item, id: p.slug },
    { ...item, id: p.id },
  ];
});

export default function ProductDetailPage() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white flex flex-col">
      <AnnouncementBar />
      <Header />
      <main data-preview-page-key="products_detail" className="flex-1 pt-4 pb-16">
        <PlatformProductDetail products={DETAIL_PRODUCTS} backHref="/collections/t-shirts" />
      </main>
      <Footer />
    </div>
  );
}
