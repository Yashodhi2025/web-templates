"use client";
"use client";
import { useSiteData } from "@deneb-ui/ui";
import siteData from "@/data/site-data.json";
import Link from 'next/link';

export default function NotFound() {
  const siteData = useSiteData();
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white flex flex-col items-center justify-center p-6 text-center">
      <span
        className="text-xs font-mono tracking-[0.25em] text-[#D72626] font-semibold uppercase mb-2"
        data-preview-field-path="home.error404Label"
        data-preview-style-target="home.error404Label"
        data-preview-style-type="text">{siteData?.content?.home?.error404Label ?? "Error 404"}</span>
      <h1
        className="text-4xl sm:text-6xl font-light uppercase tracking-tight text-white mb-4"
        data-preview-field-path="home.title"
        data-preview-style-target="home.title"
        data-preview-style-type="text">{siteData?.content?.home?.title ?? "Page Not Found"}</h1>
      <p
        className="text-xs sm:text-sm text-stone-400 max-w-md font-light leading-relaxed mb-8"
        data-preview-field-path="home.description"
        data-preview-style-target="home.description"
        data-preview-style-type="text">{siteData?.content?.home?.description ?? "The piece or collection you are looking for has been moved, archived, or is no longer in circulation."}</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-xs font-semibold uppercase tracking-widest hover:bg-stone-200 transition-colors"
      >
        <span
          data-preview-field-path="home.returnHomeLabel"
          data-preview-style-target="home.returnHomeLabel"
          data-preview-style-type="text">{siteData?.content?.home?.returnHomeLabel ?? "← Return to Home"}</span>
      </Link>
    </div>
  );
}
