'use client';

import React, { useState, useEffect } from 'react';
import { ANNOUNCEMENT_ITEMS } from '@/data/navigation';

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENT_ITEMS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative z-50 h-9 bg-[#0B0B0B] text-white border-b border-white/5 flex items-center justify-center px-4 overflow-clip">
      <div className="flex items-center gap-3">
        <span className="h-1.5 w-1.5 rounded-full bg-[#D72626] animate-pulse" />
        <p data-preview-static="announcement-item" className="text-[11px] font-mono tracking-widest uppercase text-[#C9C6BF] transition-all duration-500 text-center">
          {ANNOUNCEMENT_ITEMS[index]}
        </p>
      </div>
    </div>
  );
}
