'use client';
import { useSiteData } from "@deneb-ui/ui";

import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, MessageSquarePlus } from 'lucide-react';
import { Product } from '@/types/store';

interface ProductReviewsProps {
  product: Product;
}

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  verified: boolean;
  sizePurchased: string;
  usualSize: string;
  fitFeedback: 'Runs Small' | 'True to Size' | 'Runs Large';
  title: string;
  comment: string;
  helpfulCount: number;
}

export function ProductReviews({ product }: ProductReviewsProps) {
  const siteData = useSiteData();
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({});
  const [hasVoted, setHasVoted] = useState<Record<string, boolean>>({});

  const sampleReviews: Review[] = siteData?.content?.home?.sampleReviews ?? [
    {
      id: 'rev-01',
      author: 'Marcus K.',
      rating: 5,
      date: 'September 18, 2026',
      verified: true,
      sizePurchased: 'L',
      usualSize: 'L',
      fitFeedback: 'True to Size',
      title: 'Unbelievable drape and weight. The collar stays crisp.',
      comment:
        'Finally a heavyweight tee that doesn’t feel boxy like cardboard. The 280 GSM combed cotton has a luxurious, cool-to-the-touch hand feel and the 1.25” bound rib collar does not bacon or stretch after washing. Perfect everyday luxury piece.',
      helpfulCount: 42,
    },
    {
      id: 'rev-02',
      author: 'Julian D.',
      rating: 5,
      date: 'September 12, 2026',
      verified: true,
      sizePurchased: 'XL',
      usualSize: 'L',
      fitFeedback: 'Runs Large',
      title: 'Best athletic silhouette I have ever worn.',
      comment:
        'I am 6’2” 88kg with broad shoulders. Usually tees either cling uncomfortably to my lats or bag out around the waist. This cut nails the proportions with dropped shoulders and a clean vertical fall. Incredible work.',
      helpfulCount: 29,
    },
    {
      id: 'rev-03',
      author: 'Devinda P.',
      rating: 5,
      date: 'September 4, 2026',
      verified: true,
      sizePurchased: 'M',
      usualSize: 'M',
      fitFeedback: 'True to Size',
      title: 'Subtle quiet luxury branding at its finest.',
      comment:
        'The deep carbon black pigment is striking in person. No obnoxious logos everywhere, just impeccable stitching and heavyweight durability. Already ordered two more in bone and graphite.',
      helpfulCount: 17,
    },
  ];

  const handleVote = (id: string, initialCount: number) => {
    if (hasVoted[id]) return;
    setHelpfulVotes((prev) => ({
      ...prev,
      [id]: (prev[id] ?? initialCount) + 1,
    }));
    setHasVoted((prev) => ({ ...prev, [id]: true }));
  };

  // Fit percentage indicator
  const fitPercentage =
    product.fitRating === 'runs-small'
      ? 15
      : product.fitRating === 'runs-large'
      ? 85
      : 50;

  return (
    <section className="py-16 md:py-24 border-t border-white/10 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/10">
          <div>
            <span
              className="text-[10px] tracking-[0.25em] uppercase text-[#D72626] font-semibold"
              data-preview-field-path="home.testimonials.verifiedFeedbackLabel"
              data-preview-style-target="home.testimonials.verifiedFeedbackLabel"
              data-preview-style-type="text">{siteData?.content?.home?.testimonials?.verifiedFeedbackLabel ?? "Verified Feedback"}</span>
            <h2
              className="text-2xl md:text-3xl font-light uppercase tracking-tight text-white mt-1"
              data-preview-field-path="home.testimonials.heading"
              data-preview-style-target="home.testimonials.heading"
              data-preview-style-type="text">{siteData?.content?.home?.testimonials?.heading ?? "Customer Reviews"}</h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <span className="text-3xl font-light text-white font-mono">{product.rating.toFixed(1)}</span>
            <div className="flex flex-col">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_: any, i: number) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                ))}
              </div>
              <span
                className="text-[11px] text-stone-400 tracking-wider"
                data-preview-field-path="home.testimonials.basedVerifiedPurchasesLabel"
                data-preview-style-target="home.testimonials.basedVerifiedPurchasesLabel"
                data-preview-style-type="text">{siteData?.content?.home?.testimonials?.basedVerifiedPurchasesLabel ?? "Based on verified purchases"}{product.reviewsCount} verified purchases
              </span>
            </div>
          </div>
        </div>

        {/* Fit Rating Spectrum Meter */}
        <div className="max-w-xl mb-14 p-6 bg-stone-900/40 border border-white/10">
          <div className="flex items-center justify-between mb-3">
            <span
              className="text-xs uppercase tracking-wider text-stone-300 font-medium"
              data-preview-field-path="home.testimonials.communityFitAssessmentLabel"
              data-preview-style-target="home.testimonials.communityFitAssessmentLabel"
              data-preview-style-type="text">{siteData?.content?.home?.testimonials?.communityFitAssessmentLabel ?? "Community Fit Assessment"}</span>
            <span
              className="text-xs text-[#D72626] font-mono uppercase tracking-wider font-medium"
              data-preview-field-path="home.testimonials.item94RateTrueSizeLabel"
              data-preview-style-target="home.testimonials.item94RateTrueSizeLabel"
              data-preview-style-type="text">{siteData?.content?.home?.testimonials?.item94RateTrueSizeLabel ?? "94% Rate True to Size"}</span>
          </div>

          {/* Bar */}
          <div className="relative h-2 bg-stone-800 rounded-none w-full my-4">
            {/* 3 Zones */}
            <div className="absolute inset-y-0 left-0 w-1/3 border-r border-stone-700/60" />
            <div className="absolute inset-y-0 left-1/3 w-1/3 border-r border-stone-700/60" />
            <div className="absolute inset-y-0 right-0 w-1/3" />

            {/* Marker Indicator */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-[#D72626] shadow-lg"
              style={{ left: `${fitPercentage}%` }}
            />
          </div>

          <div className="flex justify-between text-[11px] uppercase tracking-wider text-stone-400">
            <span
              data-preview-field-path="home.testimonials.runsSmallLabel"
              data-preview-style-target="home.testimonials.runsSmallLabel"
              data-preview-style-type="text">{siteData?.content?.home?.testimonials?.runsSmallLabel ?? "Runs Small"}</span>
            <span
              className="font-semibold text-white"
              data-preview-field-path="home.testimonials.trueSizeLabel"
              data-preview-style-target="home.testimonials.trueSizeLabel"
              data-preview-style-type="text">{siteData?.content?.home?.testimonials?.trueSizeLabel ?? "True to Size"}</span>
            <span
              data-preview-field-path="home.testimonials.runsLargeLabel"
              data-preview-style-target="home.testimonials.runsLargeLabel"
              data-preview-style-type="text">{siteData?.content?.home?.testimonials?.runsLargeLabel ?? "Runs Large"}</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          data-preview-list-path="home.sampleReviews"
          data-preview-style-target="home.sampleReviews.grid"
          data-preview-style-type="grid">
          {sampleReviews.map((review: any, index: number) => {
            const siteData = useSiteData();
            const count = helpfulVotes[review.id] ?? review.helpfulCount;
            const voted = hasVoted[review.id];

            return (
              <div
                key={review.id}
                className="p-6 bg-stone-900/25 border border-white/10 flex flex-col justify-between"
                data-preview-item-path={`home.sampleReviews[${index}]`}
                data-preview-style-target={`home.sampleReviews[${index}].card`}
                data-preview-style-type="card">
                <div>
                  {/* Star Rating & Verified */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-amber-400">
                      {[...Array(review.rating)].map((_: any, i: number) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                      ))}
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] text-stone-400 uppercase tracking-widest ${review.verified ? '' : 'hidden'}`}
                      data-preview-field-path="home.testimonials.verifiedBuyerLabel"
                      data-preview-style-target="home.testimonials.verifiedBuyerLabel"
                      data-preview-style-type="text">
                      <CheckCircle className="w-3 h-3 text-[#D72626]" />{siteData?.content?.home?.testimonials?.verifiedBuyerLabel ?? "Verified Buyer"}</span>
                  </div>

                  {/* Review Title */}
                  <h4
                    className="text-sm font-medium text-white mb-2 leading-snug"
                    data-preview-field-path={`home.sampleReviews[${index}].title`}>
                    {review.title}
                  </h4>

                  {/* Comment */}
                  <p
                    className="text-xs text-stone-400 leading-relaxed font-light mb-4"
                    data-preview-field-path={`home.sampleReviews[${index}].comment`}>
                    {review.comment}
                  </p>

                  {/* Sizing badges */}
                  <div className="flex flex-wrap gap-2 text-[10px] uppercase font-mono tracking-wider text-stone-300 pb-4 border-b border-white/5">
                    <span
                      className="px-2 py-0.5 bg-white/5 border border-white/10"
                      data-preview-field-path="home.testimonials.sizeLabel"
                      data-preview-style-target="home.testimonials.sizeLabel"
                      data-preview-style-type="text">{siteData?.content?.home?.testimonials?.sizeLabel ?? "Size:"}{review.sizePurchased}
                    </span>
                    <span
                      className="px-2 py-0.5 bg-white/5 border border-white/10"
                      data-preview-field-path="home.testimonials.fitLabel"
                      data-preview-style-target="home.testimonials.fitLabel"
                      data-preview-style-type="text">{siteData?.content?.home?.testimonials?.fitLabel ?? "Fit:"}{review.fitFeedback}
                    </span>
                  </div>
                </div>

                {/* Footer metadata */}
                <div className="pt-4 flex items-center justify-between text-[11px] text-stone-500">
                  <span data-preview-field-path={`home.sampleReviews[${index}].author`}>{review.author}</span>
                  <button
                    onClick={() => handleVote(review.id, review.helpfulCount)}
                    disabled={voted}
                    className={`inline-flex items-center gap-1.5 transition-colors ${
                      voted ? 'text-white' : 'hover:text-stone-300'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span
                      data-preview-field-path="home.testimonials.helpfulLabel"
                      data-preview-style-target="home.testimonials.helpfulLabel"
                      data-preview-style-type="text">{siteData?.content?.home?.testimonials?.helpfulLabel ?? "Helpful ()"}{count})</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
