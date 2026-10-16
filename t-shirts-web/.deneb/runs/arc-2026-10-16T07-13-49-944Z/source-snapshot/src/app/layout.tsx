import './globals.css';
import '../fonts/deneb-fonts.css';
import type { Metadata } from 'next';
import initialSiteData from '@/data/site-data.json';
import { SiteDataProvider, ThemeStyles, ThemeToggle } from '@/lib/siteDataContext';
import { Providers } from '@/components/providers';

export const metadata: Metadata = {
  title: 'VANTA ATHLETICS — Built for Movement. Designed for Everywhere.',
  description: 'Premium everyday athletic essentials and luxury heavyweight t-shirts engineered from 280 GSM combed cotton. Sport Performance × Quiet Luxury × Modern Streetwear.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <ThemeStyles theme={(initialSiteData as any)?.template?.structure?.theme || (initialSiteData as any)?.theme} enableDualMode />
      </head>
      <body className="min-h-full flex flex-col bg-[#0B0B0B] text-white" suppressHydrationWarning>
        <SiteDataProvider initialSiteData={initialSiteData}>
          <Providers>{children}</Providers>
        </SiteDataProvider>
        <ThemeToggle showLabel className="fixed bottom-6 left-6 z-40" />
      </body>
    </html>
  );
}
