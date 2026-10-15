'use client';

import React from 'react';

const PHRASES = [
  'BUILT FOR MOVEMENT',
  'DESIGNED FOR EVERYDAY',
  '280 GSM HEAVYWEIGHT COTTON',
  'PREMIUM ATHLETIC SILHOUETTES',
  'QUIET LUXURY ESSENTIALS',
  'ENGINEERED IN COLOMBO',
];

export function Marquee() {
  return (
    <div className="w-full bg-[#0B0B0B] text-white border-y border-white/10 py-5 overflow-clip select-none">
      <div className="flex w-max animate-marquee space-x-8 whitespace-nowrap">
        {[...PHRASES, ...PHRASES, ...PHRASES].map((phrase, i) => (
          <div key={i} className="flex items-center space-x-8">
            <span data-preview-static="marquee-phrase" className="text-xs sm:text-sm font-mono tracking-[0.3em] font-semibold text-[#C9C6BF] uppercase">
              {phrase}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#D72626]" />
          </div>
        ))}
      </div>
    </div>
  );
}
