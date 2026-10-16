'use client';
import { useSiteData } from "@deneb-ui/ui";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function Footer() {
  const siteData = useSiteData();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#0B0B0B] text-white border-t border-white/10 pt-16 pb-12 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Top Section: Newsletter Club & Tagline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-6 space-y-4">
            <span
              className="text-xs font-mono tracking-widest text-[#D72626] font-semibold uppercase"
              data-preview-field-path="common.footer.vantaAthleticClubLabel"
              data-preview-style-target="common.footer.vantaAthleticClubLabel"
              data-preview-style-type="text">{siteData?.content?.common?.footer?.vantaAthleticClubLabel ?? "VANTA ATHLETIC CLUB"}</span>
            <h3
              className="text-2xl sm:text-3xl font-light tracking-tight text-white uppercase"
              data-preview-field-path="common.footer.joinClubPrivateReleasesSubheading"
              data-preview-style-target="common.footer.joinClubPrivateReleasesSubheading"
              data-preview-style-type="text">{siteData?.content?.common?.footer?.joinClubPrivateReleasesSubheading ?? "JOIN THE CLUB FOR PRIVATE RELEASES"}</h3>
            <p
              className="text-xs sm:text-sm text-[#A9A9A5] max-w-md"
              data-preview-field-path="common.footer.description"
              data-preview-style-target="common.footer.description"
              data-preview-style-type="text">{siteData?.content?.common?.footer?.description ?? "Receive private drop allocations, seasonal lookbooks, and priority access to limited 280 GSM heavyweight runs."}</p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            {subscribed ? (
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 text-xs font-mono text-[#C9C6BF]">
                <CheckCircle2 className="h-5 w-5 text-[#D72626]" />
                <span
                  data-preview-field-path="common.footer.welcomeClubCheckInboxConfirmation"
                  data-preview-style-target="common.footer.welcomeClubCheckInboxConfirmation"
                  data-preview-style-type="text">{siteData?.content?.common?.footer?.welcomeClubCheckInboxConfirmation ?? "WELCOME TO THE CLUB. CHECK YOUR INBOX FOR CONFIRMATION."}</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={siteData?.content?.common?.footer?.enterEmailPlaceholder ?? "ENTER YOUR EMAIL"}
                  required
                  className="flex-1 bg-white/5 border border-white/15 px-4 py-3.5 text-xs font-mono text-white placeholder-[#7A7A78] focus:border-white focus:outline-none transition-colors"
                  data-preview-field-path="common.footer.enterEmailPlaceholder" />
                <button
                  type="submit"
                  className="bg-white text-black px-6 py-3.5 text-xs font-mono font-bold tracking-widest uppercase hover:bg-[#D72626] hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <span
                    data-preview-field-path="common.footer.joinClubLabel"
                    data-preview-style-target="common.footer.joinClubLabel"
                    data-preview-style-type="text">{siteData?.content?.common?.footer?.joinClubLabel ?? "JOIN CLUB"}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
            <p
              className="text-[10px] font-mono text-[#7A7A78] mt-2"
              data-preview-field-path="common.footer.subtitle"
              data-preview-style-target="common.footer.subtitle"
              data-preview-style-type="text">{siteData?.content?.common?.footer?.subtitle ?? "By joining, you agree to our Terms and Privacy Policy. Unsubscribe at any time."}</p>
          </div>
        </div>

        {/* Middle Section: Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-14 border-b border-white/10">
          {/* Col 1 */}
          <div>
            <h4
              className="text-xs font-mono tracking-widest text-[#7A7A78] uppercase mb-4"
              data-preview-field-path="common.footer.collectionsSubheading"
              data-preview-style-target="common.footer.collectionsSubheading"
              data-preview-style-type="text">{siteData?.content?.common?.footer?.collectionsSubheading ?? "COLLECTIONS"}</h4>
            <ul className="space-y-2.5 text-xs font-medium text-[#C9C6BF]">
              <li>
                <Link
                  href={siteData?.content?.common?.footer?.newDropsUrl ?? "/collections/t-shirts?sort=newest"}
                  className="hover:text-white transition-colors"
                  data-preview-field-path={"common.footer.newDropsUrl"}
                  data-preview-style-target="common.footer.newDropsLabel"
                  data-preview-style-type="text">
                  <span
                    data-preview-field-path="common.footer.newDropsLabel"
                    data-preview-style-target="common.footer.newDropsLabel"
                    data-preview-style-type="text">{siteData?.content?.common?.footer?.newDropsLabel ?? "New Drops"}</span>
                </Link>
              </li>
              <li>
                <Link
                  href={siteData?.content?.common?.footer?.tShirtsHeroUrl ?? "/collections/t-shirts"}
                  className="hover:text-white transition-colors"
                  data-preview-field-path={"common.footer.tShirtsHeroUrl"}
                  data-preview-style-target="common.footer.tShirtsHeroLabel"
                  data-preview-style-type="text">
                  <span
                    data-preview-field-path="common.footer.tShirtsHeroLabel"
                    data-preview-style-target="common.footer.tShirtsHeroLabel"
                    data-preview-style-type="text">{siteData?.content?.common?.footer?.tShirtsHeroLabel ?? "T-Shirts (Hero)"}</span>
                </Link>
              </li>
              <li>
                <Link
                  href={siteData?.content?.common?.footer?.oversizedFit280GsmUrl ?? "/collections/t-shirts?fit=oversized"}
                  className="hover:text-white transition-colors"
                  data-preview-field-path={"common.footer.oversizedFit280GsmUrl"}
                  data-preview-style-target="common.footer.oversizedFit280GsmLabel"
                  data-preview-style-type="text">
                  <span
                    data-preview-field-path="common.footer.oversizedFit280GsmLabel"
                    data-preview-style-target="common.footer.oversizedFit280GsmLabel"
                    data-preview-style-type="text">{siteData?.content?.common?.footer?.oversizedFit280GsmLabel ?? "Oversized Fit (280 GSM)"}</span>
                </Link>
              </li>
              <li>
                <Link
                  href={siteData?.content?.common?.footer?.performanceSeriesUrl ?? "/collections/t-shirts?fit=performance"}
                  className="hover:text-white transition-colors"
                  data-preview-field-path={"common.footer.performanceSeriesUrl"}
                  data-preview-style-target="common.footer.performanceSeriesLabel"
                  data-preview-style-type="text">
                  <span
                    data-preview-field-path="common.footer.performanceSeriesLabel"
                    data-preview-style-target="common.footer.performanceSeriesLabel"
                    data-preview-style-type="text">{siteData?.content?.common?.footer?.performanceSeriesLabel ?? "Performance Series"}</span>
                </Link>
              </li>
              <li>
                <Link
                  href={siteData?.content?.common?.footer?.theClassicsUrl ?? "/collections/t-shirts?fit=classic"}
                  className="hover:text-white transition-colors"
                  data-preview-field-path={"common.footer.theClassicsUrl"}
                  data-preview-style-target="common.footer.theClassicsLabel"
                  data-preview-style-type="text">
                  <span
                    data-preview-field-path="common.footer.theClassicsLabel"
                    data-preview-style-target="common.footer.theClassicsLabel"
                    data-preview-style-type="text">{siteData?.content?.common?.footer?.theClassicsLabel ?? "The Classics"}</span>
                </Link>
              </li>
              <li>
                <Link
                  href={siteData?.content?.common?.footer?.blackSeriesUrl ?? "/collections/t-shirts?collection=black-series"}
                  className="hover:text-white transition-colors"
                  data-preview-field-path={"common.footer.blackSeriesUrl"}
                  data-preview-style-target="common.footer.blackSeriesLabel"
                  data-preview-style-type="text">
                  <span
                    data-preview-field-path="common.footer.blackSeriesLabel"
                    data-preview-style-target="common.footer.blackSeriesLabel"
                    data-preview-style-type="text">{siteData?.content?.common?.footer?.blackSeriesLabel ?? "Black Series"}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4
              className="text-xs font-mono tracking-widest text-[#7A7A78] uppercase mb-4"
              data-preview-field-path="common.footer.supportSubheading"
              data-preview-style-target="common.footer.supportSubheading"
              data-preview-style-type="text">{siteData?.content?.common?.footer?.supportSubheading ?? "SUPPORT"}</h4>
            <ul className="space-y-2.5 text-xs font-medium text-[#C9C6BF]">
              <li>
                <Link
                  href={siteData?.content?.common?.footer?.islandwideDeliveryUrl ?? "/collections/t-shirts"}
                  className="hover:text-white transition-colors"
                  data-preview-field-path={"common.footer.islandwideDeliveryUrl"}
                  data-preview-style-target="common.footer.islandwideDeliveryLabel"
                  data-preview-style-type="text">
                  <span
                    data-preview-field-path="common.footer.islandwideDeliveryLabel"
                    data-preview-style-target="common.footer.islandwideDeliveryLabel"
                    data-preview-style-type="text">{siteData?.content?.common?.footer?.islandwideDeliveryLabel ?? "Islandwide Delivery"}</span>
                </Link>
              </li>
              <li>
                <Link
                  href={siteData?.content?.common?.footer?.item14DayReturnsExchangesUrl ?? "/collections/t-shirts"}
                  className="hover:text-white transition-colors"
                  data-preview-field-path={"common.footer.item14DayReturnsExchangesUrl"}
                  data-preview-style-target="common.footer.item14DayReturnsExchangesLabel"
                  data-preview-style-type="text">
                  <span
                    data-preview-field-path="common.footer.item14DayReturnsExchangesLabel"
                    data-preview-style-target="common.footer.item14DayReturnsExchangesLabel"
                    data-preview-style-type="text">{siteData?.content?.common?.footer?.item14DayReturnsExchangesLabel ?? "14-Day Returns & Exchanges"}</span>
                </Link>
              </li>
              <li>
                <Link
                  href={siteData?.content?.common?.footer?.sizeFitGuideUrl ?? "/collections/t-shirts"}
                  className="hover:text-white transition-colors"
                  data-preview-field-path={"common.footer.sizeFitGuideUrl"}
                  data-preview-style-target="common.footer.sizeFitGuideLabel"
                  data-preview-style-type="text">
                  <span
                    data-preview-field-path="common.footer.sizeFitGuideLabel"
                    data-preview-style-target="common.footer.sizeFitGuideLabel"
                    data-preview-style-type="text">{siteData?.content?.common?.footer?.sizeFitGuideLabel ?? "Size & Fit Guide"}</span>
                </Link>
              </li>
              <li>
                <Link
                  href={siteData?.content?.common?.footer?.trackOrderUrl ?? "/collections/t-shirts"}
                  className="hover:text-white transition-colors"
                  data-preview-field-path={"common.footer.trackOrderUrl"}
                  data-preview-style-target="common.footer.trackOrderLabel"
                  data-preview-style-type="text">
                  <span
                    data-preview-field-path="common.footer.trackOrderLabel"
                    data-preview-style-target="common.footer.trackOrderLabel"
                    data-preview-style-type="text">{siteData?.content?.common?.footer?.trackOrderLabel ?? "Track Your Order"}</span>
                </Link>
              </li>
              <li>
                <Link
                  href={siteData?.content?.common?.footer?.clientConciergeUrl ?? "/collections/t-shirts"}
                  className="hover:text-white transition-colors"
                  data-preview-field-path={"common.footer.clientConciergeUrl"}
                  data-preview-style-target="common.footer.clientConciergeLabel"
                  data-preview-style-type="text">
                  <span
                    data-preview-field-path="common.footer.clientConciergeLabel"
                    data-preview-style-target="common.footer.clientConciergeLabel"
                    data-preview-style-type="text">{siteData?.content?.common?.footer?.clientConciergeLabel ?? "Client Concierge"}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4
              className="text-xs font-mono tracking-widest text-[#7A7A78] uppercase mb-4"
              data-preview-field-path="common.footer.brandSubheading"
              data-preview-style-target="common.footer.brandSubheading"
              data-preview-style-type="text">{siteData?.content?.common?.footer?.brandSubheading ?? "BRAND"}</h4>
            <ul className="space-y-2.5 text-xs font-medium text-[#C9C6BF]">
              <li>
                <Link
                  href={siteData?.content?.common?.footer?.ourPhilosophyUrl ?? "/collections/t-shirts"}
                  className="hover:text-white transition-colors"
                  data-preview-field-path={"common.footer.ourPhilosophyUrl"}
                  data-preview-style-target="common.footer.ourPhilosophyLabel"
                  data-preview-style-type="text">
                  <span
                    data-preview-field-path="common.footer.ourPhilosophyLabel"
                    data-preview-style-target="common.footer.ourPhilosophyLabel"
                    data-preview-style-type="text">{siteData?.content?.common?.footer?.ourPhilosophyLabel ?? "Our Philosophy"}</span>
                </Link>
              </li>
              <li>
                <Link
                  href={siteData?.content?.common?.footer?.materials280GsmCraftUrl ?? "/collections/t-shirts"}
                  className="hover:text-white transition-colors"
                  data-preview-field-path={"common.footer.materials280GsmCraftUrl"}
                  data-preview-style-target="common.footer.materials280GsmCraftLabel"
                  data-preview-style-type="text">
                  <span
                    data-preview-field-path="common.footer.materials280GsmCraftLabel"
                    data-preview-style-target="common.footer.materials280GsmCraftLabel"
                    data-preview-style-type="text">{siteData?.content?.common?.footer?.materials280GsmCraftLabel ?? "Materials & 280 GSM Craft"}</span>
                </Link>
              </li>
              <li>
                <Link
                  href={siteData?.content?.common?.footer?.flagshipStoreColomboUrl ?? "/collections/t-shirts"}
                  className="hover:text-white transition-colors"
                  data-preview-field-path={"common.footer.flagshipStoreColomboUrl"}
                  data-preview-style-target="common.footer.flagshipStoreColomboLabel"
                  data-preview-style-type="text">
                  <span
                    data-preview-field-path="common.footer.flagshipStoreColomboLabel"
                    data-preview-style-target="common.footer.flagshipStoreColomboLabel"
                    data-preview-style-type="text">{siteData?.content?.common?.footer?.flagshipStoreColomboLabel ?? "Flagship Store — Colombo"}</span>
                </Link>
              </li>
              <li>
                <Link
                  href={siteData?.content?.common?.footer?.sustainabilityStandardsUrl ?? "/collections/t-shirts"}
                  className="hover:text-white transition-colors"
                  data-preview-field-path={"common.footer.sustainabilityStandardsUrl"}
                  data-preview-style-target="common.footer.sustainabilityStandardsLabel"
                  data-preview-style-type="text">
                  <span
                    data-preview-field-path="common.footer.sustainabilityStandardsLabel"
                    data-preview-style-target="common.footer.sustainabilityStandardsLabel"
                    data-preview-style-type="text">{siteData?.content?.common?.footer?.sustainabilityStandardsLabel ?? "Sustainability Standards"}</span>
                </Link>
              </li>
              <li>
                <Link
                  href={siteData?.content?.common?.footer?.careersStudioUrl ?? "/collections/t-shirts"}
                  className="hover:text-white transition-colors"
                  data-preview-field-path={"common.footer.careersStudioUrl"}
                  data-preview-style-target="common.footer.careersStudioLabel"
                  data-preview-style-type="text">
                  <span
                    data-preview-field-path="common.footer.careersStudioLabel"
                    data-preview-style-target="common.footer.careersStudioLabel"
                    data-preview-style-type="text">{siteData?.content?.common?.footer?.careersStudioLabel ?? "Careers & Studio"}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4
              className="text-xs font-mono tracking-widest text-[#7A7A78] uppercase mb-4"
              data-preview-field-path="common.footer.connectSubheading"
              data-preview-style-target="common.footer.connectSubheading"
              data-preview-style-type="text">{siteData?.content?.common?.footer?.connectSubheading ?? "CONNECT"}</h4>
            <ul className="space-y-2.5 text-xs font-medium text-[#C9C6BF]">
              <li>
                <a
                  href={siteData?.content?.common?.footer?.instagramUrl ?? "https://instagram.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  data-preview-field-path="common.footer.instagramUrl"
                >
                  {siteData?.content?.common?.footer?.instagramVantaAthletics ?? "Instagram (@vanta.athletics)"}
                </a>
              </li>
              <li>
                <a
                  href={siteData?.content?.common?.footer?.tiktokUrl ?? "https://tiktok.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  data-preview-field-path="common.footer.tiktokUrl"
                >
                  {siteData?.content?.common?.footer?.tiktok ?? "TikTok"}
                </a>
              </li>
              <li>
                <a
                  href={siteData?.content?.common?.footer?.youtubeUrl ?? "https://youtube.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  data-preview-field-path="common.footer.youtubeUrl"
                >
                  {siteData?.content?.common?.footer?.youtube ?? "YouTube"}
                </a>
              </li>
              <li>
                <a
                  href={siteData?.content?.common?.footer?.vantaClubRadioUrl ?? "https://spotify.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  data-preview-field-path={"common.footer.vantaClubRadioUrl"}
                  data-preview-style-target="common.footer.vantaClubRadioLabel"
                  data-preview-style-type="text">
                  <span
                    data-preview-field-path="common.footer.vantaClubRadioLabel"
                    data-preview-style-target="common.footer.vantaClubRadioLabel"
                    data-preview-style-type="text">{siteData?.content?.common?.footer?.vantaClubRadioLabel ?? "Vanta Club Radio"}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Large Brand Wordmark Banner */}
        <div className="pt-16 pb-8 text-center select-none overflow-clip">
          <h1
            className="font-mono text-[14vw] font-black leading-none tracking-tighter text-white/10 uppercase pointer-events-none"
            data-preview-field-path="common.footer.title"
            data-preview-style-target="common.footer.title"
            data-preview-style-type="text">{siteData?.content?.common?.footer?.title ?? "VANTA"}</h1>
        </div>

        {/* Bottom Legal Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#7A7A78] pt-4 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            <span data-preview-static="chrome">© {new Date().getFullYear()}</span>
            <span
              data-preview-field-path="common.footer.vantaAthleticsIncBuiltMovement"
              data-preview-style-target="common.footer.vantaAthleticsIncBuiltMovement"
              data-preview-style-type="text">{siteData?.content?.common?.footer?.vantaAthleticsIncBuiltMovement ?? "VANTA ATHLETICS INC. BUILT FOR MOVEMENT. DESIGNED FOR EVERYWHERE."}</span>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href={siteData?.content?.common?.footer?.privacyPolicyUrl ?? "/collections/t-shirts"}
              className="hover:text-white transition-colors"
              data-preview-field-path={"common.footer.privacyPolicyUrl"}
              data-preview-style-target="common.footer.privacyPolicyLabel"
              data-preview-style-type="text">
              <span
                data-preview-field-path="common.footer.privacyPolicyLabel"
                data-preview-style-target="common.footer.privacyPolicyLabel"
                data-preview-style-type="text">{siteData?.content?.common?.footer?.privacyPolicyLabel ?? "Privacy Policy"}</span>
            </Link>
            <Link
              href={siteData?.content?.common?.footer?.termsServiceUrl ?? "/collections/t-shirts"}
              className="hover:text-white transition-colors"
              data-preview-field-path={"common.footer.termsServiceUrl"}
              data-preview-style-target="common.footer.termsServiceLabel"
              data-preview-style-type="text">
              <span
                data-preview-field-path="common.footer.termsServiceLabel"
                data-preview-style-target="common.footer.termsServiceLabel"
                data-preview-style-type="text">{siteData?.content?.common?.footer?.termsServiceLabel ?? "Terms of Service"}</span>
            </Link>
            <Link
              href={siteData?.content?.common?.footer?.cookiePreferencesUrl ?? "/collections/t-shirts"}
              className="hover:text-white transition-colors"
              data-preview-field-path={"common.footer.cookiePreferencesUrl"}
              data-preview-style-target="common.footer.cookiePreferencesLabel"
              data-preview-style-type="text">
              <span
                data-preview-field-path="common.footer.cookiePreferencesLabel"
                data-preview-style-target="common.footer.cookiePreferencesLabel"
                data-preview-style-type="text">{siteData?.content?.common?.footer?.cookiePreferencesLabel ?? "Cookie Preferences"}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
