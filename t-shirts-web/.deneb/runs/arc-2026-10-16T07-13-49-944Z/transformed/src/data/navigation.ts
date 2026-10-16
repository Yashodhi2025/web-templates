export interface MegaMenuColumn {
  title: string;
  items: { label: string; href: string; badge?: string }[];
}

export interface MegaMenuData {
  featured: { label: string; href: string; badge?: string }[];
  shop: { label: string; href: string; badge?: string }[];
  activity: { label: string; href: string }[];
  promo: {
    title: string;
    subtitle: string;
    cta: string;
    href: string;
    image: string;
  };
}

export const MEGA_MENU_MEN: MegaMenuData = {
  featured: [
    { label: 'New Arrivals', href: '/collections/t-shirts?sort=newest', badge: 'NEW' },
    { label: 'Best Sellers', href: '/collections/t-shirts?sort=bestseller' },
    { label: 'Core Collection', href: '/collections/t-shirts' },
    { label: 'Black Series', href: '/collections/t-shirts?collection=black-series', badge: 'POPULAR' },
    { label: 'The Classics', href: '/collections/t-shirts?fit=classic' },
    { label: 'Performance 01', href: '/collections/t-shirts?fit=performance' },
  ],
  shop: [
    { label: 'T-Shirts (All)', href: '/collections/t-shirts', badge: 'HERO' },
    { label: 'Oversized Tees', href: '/collections/t-shirts?fit=oversized' },
    { label: 'Classic Fit Tees', href: '/collections/t-shirts?fit=classic' },
    { label: 'Performance Tees', href: '/collections/t-shirts?fit=performance' },
    { label: 'Polo Shirts', href: '/collections/t-shirts?category=polos' },
    { label: 'Tanks', href: '/collections/t-shirts?category=tanks' },
    { label: 'Long Sleeves', href: '/collections/t-shirts?category=long-sleeves' },
    { label: 'Hoodies', href: '/collections/t-shirts?category=hoodies' },
    { label: 'Shorts & Bottoms', href: '/collections/t-shirts?category=shorts' },
  ],
  activity: [
    { label: 'Training & Gym', href: '/collections/t-shirts?activity=training' },
    { label: 'Road Running', href: '/collections/t-shirts?activity=running' },
    { label: 'Court Sports', href: '/collections/t-shirts?activity=court' },
    { label: 'Everyday Lifestyle', href: '/collections/t-shirts?activity=lifestyle' },
    { label: 'Rest Day & Recovery', href: '/collections/t-shirts?activity=rest-day' },
  ],
  promo: {
    title: 'PERFORMANCE SERIES 02',
    subtitle: 'Ultralight micro-matrix technical knit. Designed for max velocity.',
    cta: 'Shop Collection →',
    href: '/collections/t-shirts?fit=performance',
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop',
  },
};

export const ANNOUNCEMENT_ITEMS = [
  'FREE ISLANDWIDE DELIVERY ON ORDERS OVER LKR 15,000',
  'NEW SEASON / PERFORMANCE SERIES 02 NOW LIVE',
  'COMPLIMENTARY 14-DAY HASSLE-FREE RETURNS & EXCHANGES',
  'ENGINEERED IN COLOMBO • CRAFTED FOR WORLDWIDE MOVEMENT',
];

export const NAV_LINKS = [
  { label: 'NEW', href: '/collections/t-shirts?sort=newest', hasMega: false },
  { label: 'MEN', href: '/collections/t-shirts', hasMega: true },
  { label: 'T-SHIRTS', href: '/collections/t-shirts', hasMega: true, highlight: true },
  { label: 'COLLECTIONS', href: '/collections/t-shirts', hasMega: false },
  { label: 'SPORT', href: '/collections/t-shirts?fit=performance', hasMega: false },
  { label: 'THE CLASSICS', href: '/collections/t-shirts?fit=classic', hasMega: false },
];
