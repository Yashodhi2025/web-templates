'use client';
import { useSiteData } from "@deneb-ui/ui";

import React, { useState } from 'react';
import Image from 'next/image';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  productName: string;
  images: {
    primary: string;
    secondary: string;
    modelFront?: string;
    modelBack?: string;
    fabricMacro?: string;
    lifestyle?: string;
  };
}

export function ProductGallery({ productName, images }: ProductGalleryProps) {
  const siteData = useSiteData();
  // Extract all available images into an ordered array of 6 editorial views
  const galleryList = [
    { label: 'Model Front', src: images.modelFront || images.primary },
    { label: 'Model Rear', src: images.modelBack || images.secondary },
    { label: 'Product Front', src: images.primary },
    { label: 'Product Rear', src: images.secondary },
    {
      label: 'Fabric Macro / 280 GSM',
      src:
        images.fabricMacro ||
        'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1200&auto=format&fit=crop',
    },
    {
      label: 'Lifestyle Editorial',
      src:
        images.lifestyle ||
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop',
    },
  ];

  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => ((prev ?? 0) + 1) % galleryList.length);
    }
  };

  const prevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => ((prev ?? 0) - 1 + galleryList.length) % galleryList.length);
    }
  };

  return (
    <div className="w-full">
      {/* DESKTOP 2-COLUMN EDITORIAL GRID */}
      <div className="[display:none] lg:grid grid-cols-2 gap-3">
        {galleryList.map((item: any, idx: number) => (
          <div
            key={idx}
            onClick={() => openLightbox(idx)}
            className="group relative aspect-[3/4] bg-[#141414] overflow-clip cursor-zoom-in"
          >
            <Image
              src={(item.src && typeof item.src === 'string' && item.src.trim() !== '') ? item.src : '/images/showcase-phone.jpg'}
              alt={`${productName} — ${item.label}`}
              fill
              sizes="(min-width: 1024px) 35vw, 100vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              priority={idx < 2}
            />
            {/* View label tag */}
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-md text-[10px] uppercase tracking-widest text-stone-300 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {item.label}
            </div>
            {/* Zoom icon hint */}
            <div className="absolute bottom-3 right-3 p-2 bg-black/60 backdrop-blur-md text-stone-300 rounded-none pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Maximize2 className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* MOBILE / TABLET SWIPEABLE CAROUSEL & THUMBNAILS */}
      <div className="lg:hidden">
        {/* Main Active Image Viewport */}
        <div
          onClick={() => openLightbox(activeMobileIndex)}
          className="relative aspect-[3/4] w-full bg-[#141414] overflow-clip cursor-pointer"
        >
          <Image
            src={galleryList[activeMobileIndex].src}
            alt={`${productName} — View ${activeMobileIndex + 1}`}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
          {/* Label */}
          <div className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 backdrop-blur-md text-[9px] uppercase tracking-widest text-stone-300 pointer-events-none">
            {galleryList[activeMobileIndex].label}
          </div>
          {/* Counter pill */}
          <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-md text-[10px] tracking-wider text-white font-mono">
            {activeMobileIndex + 1} <span data-preview-static="chrome">/</span> {galleryList.length}
          </div>

          {/* Quick Prev / Next overlay buttons */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveMobileIndex((prev) => (prev - 1 + galleryList.length) % galleryList.length);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/40 text-white rounded-full hover:bg-black/80 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveMobileIndex((prev) => (prev + 1) % galleryList.length);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/40 text-white rounded-full hover:bg-black/80 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Thumbnail Track */}
        <div className="flex gap-2 overflow-x-auto py-3 scrollbar-none">
          {galleryList.map((item: any, idx: number) => (
            <button
              key={idx}
              onClick={() => setActiveMobileIndex(idx)}
              className={`relative flex-shrink-0 w-16 aspect-[3/4] bg-[#141414] border transition-all ${
                activeMobileIndex === idx
                  ? 'border-white opacity-100'
                  : 'border-white/10 opacity-50 hover:opacity-80'
              }`}
            >
              <Image
                src={(item.src && typeof item.src === 'string' && item.src.trim() !== '') ? item.src : '/images/showcase-phone.jpg'}
                alt={`Thumbnail ${idx + 1}`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Controls */}
          <div className="absolute top-4 right-4 flex items-center gap-3 z-50">
            <span
              className="text-xs uppercase tracking-widest text-stone-400 font-mono"
              data-preview-field-path="home.gallery.ofLabel"
              data-preview-style-target="home.gallery.ofLabel"
              data-preview-style-type="text">
              {lightboxIndex + 1}{siteData?.content?.home?.gallery?.ofLabel ?? "of"}{galleryList.length}
            </span>
            <button
              onClick={closeLightbox}
              className="p-2.5 bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close zoom preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevLightbox}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextLightbox}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Zoomed Image Container */}
          <div
            className="relative max-w-4xl max-h-[85vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-h-[85vh]">
              <Image
                src={galleryList[lightboxIndex].src}
                alt={`${productName} — ${galleryList[lightboxIndex].label}`}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain"
                priority
              />
            </div>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-black/80 text-xs tracking-wider uppercase text-stone-300 pointer-events-none">
              {galleryList[lightboxIndex].label}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
