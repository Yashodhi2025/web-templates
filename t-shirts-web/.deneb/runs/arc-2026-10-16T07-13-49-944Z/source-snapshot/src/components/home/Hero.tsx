'use client';
import { useSiteData } from "@deneb-ui/ui";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';

export function Hero() {
  const siteData = useSiteData();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Image scale in
      tl.fromTo(
        imageRef.current,
        { scale: 1.08 },
        { scale: 1, duration: 1.8, ease: 'power2.out' },
        0
      );

      // Eyebrow
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.3
      );

      // Headline
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 },
        0.5
      );

      // Copy
      tl.fromTo(
        copyRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.8
      );

      // CTAs
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        1.0
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90svh] lg:min-h-[95svh] w-full overflow-clip bg-[#0B0B0B] text-white flex items-end pb-12 sm:pb-20"
    >
      {/* Background Campaign Image with smooth cinematic lighting */}
      <div ref={imageRef} className="absolute inset-0 z-0">
        <Image
          src={siteData?.content?.home?.hero?.image ?? "/images/hero/hero-campaign.jpg"}
          alt={siteData?.content?.home?.hero?.imageAlt ?? "Vanta Athletics Campaign - Premium Heavyweight T-Shirt"}
          fill
          priority
          className="object-cover object-center lg:object-[center_35%]"
          sizes="100vw"
          data-preview-field-path="home.hero.image" />
        {/* Editorial gradient overlays for high contrast readability without washing out photographic depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/30 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/85 via-[#0B0B0B]/40 to-transparent lg:w-2/3 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <p
            ref={eyebrowRef}
            className="flex items-center gap-2 text-xs sm:text-[13px] font-mono tracking-[0.25em] text-[#C9C6BF] uppercase mb-4"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#D72626]" />
            <span
              data-preview-field-path="home.hero.newSeason2026Drop01"
              data-preview-style-target="home.hero.newSeason2026Drop01"
              data-preview-style-type="text">{siteData?.content?.home?.hero?.newSeason2026Drop01 ?? "NEW SEASON / 2026 DROP 01"}</span>
          </p>

          {/* Large Headline */}
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white uppercase leading-[0.95] mb-6"
            data-preview-field-path="home.hero.title"
            data-preview-style-target="home.hero.title"
            data-preview-style-type="text">{siteData?.content?.home?.hero?.title ?? "BUILT TO MOVE."}<br />
            <span
              className="font-black tracking-tighter text-white"
              data-preview-field-path="home.hero.madeStayLabel"
              data-preview-style-target="home.hero.madeStayLabel"
              data-preview-style-type="text">{siteData?.content?.home?.hero?.madeStayLabel ?? "MADE TO STAY."}</span>
          </h1>

          {/* Supporting Copy */}
          <p
            ref={copyRef}
            className="text-sm sm:text-base font-light text-[#C9C6BF] max-w-lg mb-8 leading-relaxed"
            data-preview-field-path="home.hero.description"
            data-preview-style-target="home.hero.description"
            data-preview-style-type="text">{siteData?.content?.home?.hero?.description ?? "High-grade everyday athletic essentials engineered from 280 GSM combed cotton. Proportioned for movement, comfort and effortless quiet luxury."}</p>

          {/* Dual CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/collections/t-shirts?sort=newest"
              data-preview-static="hero-cta"
              className="group inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 text-xs font-mono font-bold tracking-widest uppercase hover:bg-[#D72626] hover:text-white transition-all duration-300 shadow-xl"
            >
              <span>{siteData?.content?.home?.hero?.shopNewArrivalsLabel ?? "SHOP NEW ARRIVALS"}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href={siteData?.content?.home?.hero?.exploreTShirtsHeroUrl ?? "/collections/t-shirts"}
              className="inline-flex items-center justify-center border border-white/30 bg-black/40 backdrop-blur-sm px-8 py-4 text-xs font-mono tracking-widest text-white uppercase hover:border-white hover:bg-white hover:text-black transition-all duration-300"
              data-preview-field-path={"home.hero.exploreTShirtsHeroUrl"}
              data-preview-style-target="home.hero.exploreTShirtsHeroLabel"
              data-preview-style-type="text">
              <span
                data-preview-field-path="home.hero.exploreTShirtsHeroLabel"
                data-preview-style-target="home.hero.exploreTShirtsHeroLabel"
                data-preview-style-type="text">{siteData?.content?.home?.hero?.exploreTShirtsHeroLabel ?? "EXPLORE T-SHIRTS (HERO)"}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
