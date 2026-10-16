import React from 'react';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/home/Hero';
import { LatestDrop } from '@/components/home/LatestDrop';
import { ShopByFit } from '@/components/home/ShopByFit';
import { CampaignSection } from '@/components/home/CampaignSection';
import { BestSellers } from '@/components/home/BestSellers';
import { ShopByColor } from '@/components/home/ShopByColor';
import { ClassicCollection } from '@/components/home/ClassicCollection';
import { SportCollection } from '@/components/home/SportCollection';
import { ProductStory } from '@/components/home/ProductStory';
import { Marquee } from '@/components/home/Marquee';
import { BlackSeries } from '@/components/home/BlackSeries';
import { LookbookSection } from '@/components/home/LookbookSection';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'VANTA ATHLETICS — Built for Movement. Designed for Everywhere.',
  description: 'Premium everyday athletic essentials and luxury heavyweight t-shirts engineered from 280 GSM combed cotton. Sport Performance × Quiet Luxury × Modern Streetwear.',
};

export default function Home() {
  return (
    <main data-preview-page-key="home" className="min-h-screen bg-[#0B0B0B] text-white flex flex-col">
      <AnnouncementBar />
      <Header />
      <Hero />
      <LatestDrop />
      <ShopByFit />
      <CampaignSection />
      <BestSellers />
      <ShopByColor />
      <ClassicCollection />
      <SportCollection />
      <ProductStory />
      <Marquee />
      <BlackSeries />
      <LookbookSection />
      <Footer />
    </main>
  );
}
