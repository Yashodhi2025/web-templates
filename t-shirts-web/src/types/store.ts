export type FitType = 'classic' | 'oversized' | 'performance' | 'relaxed';
export type ActivityType = 'training' | 'running' | 'court' | 'lifestyle' | 'rest-day';

export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface ProductSize {
  size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';
  stock: 'in-stock' | 'low-stock' | 'sold-out';
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  collection: string;
  fit: FitType;
  activity: ActivityType;
  price: number;
  compareAtPrice?: number;
  colors: ProductColor[];
  sizes: ProductSize[];
  images: {
    primary: string;
    secondary: string;
    modelFront?: string;
    modelBack?: string;
    fabricMacro?: string;
    lifestyle?: string;
  };
  gsm: number;
  materials: string;
  careInstructions: string[];
  features: string[];
  rating: number;
  reviewsCount: number;
  fitRating: 'runs-small' | 'true-to-size' | 'runs-large';
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface FilterState {
  fits: FitType[];
  sizes: string[];
  colors: string[];
  activities: ActivityType[];
  priceRange: [number, number];
  sortBy: 'featured' | 'newest' | 'price-low' | 'price-high';
}
