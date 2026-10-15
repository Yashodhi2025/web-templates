import front from "@/assets/phone-hero.png";
import back from "@/assets/phone-back.png";
import accessories from "@/assets/accessories.png";

export type Colorway = { name: string; hex: string; hue: number };
export type Variant = { ram: number; storage: number; price: number; inStock: boolean };
export type Product = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  category: "phone" | "accessory";
  price: number;
  salePrice?: number;
  colorways: Colorway[];
  variants: Variant[];
  specs: Record<string, string>;
  numeric: { camera: number; battery: number; display: number; ram: number; storage: number; fiveG: boolean };
  highlights: string[];
  rating: number;
  reviews: number;
  condition: "New" | "Open box" | "Refurbished";
  tags: string[];
  createdAt: number;
};

export const images = { front, back, accessories };
export const brands = ["Apple", "Samsung", "Google", "OnePlus", "Xiaomi", "Nothing"];

type Seed = [string, string, number, number | undefined, number, number, number, number, string, string[], number, Product["condition"]];
// [brand, name, price, sale, camera MP, battery, display, ram, chip, tags, rating, condition]
const seeds: Seed[] = [
  ["Apple", "iPhone 16 Pro Max", 144900, 139900, 48, 4685, 6.9, 8, "A18 Pro", ["new", "best"], 4.8, "New"],
  ["Apple", "iPhone 16", 79900, 74900, 48, 3561, 6.1, 8, "A18", ["best"], 4.6, "New"],
  ["Apple", "iPhone 15", 69900, 59900, 48, 3349, 6.1, 6, "A16 Bionic", ["deal"], 4.5, "Open box"],
  ["Samsung", "Galaxy S25 Ultra", 129999, 119999, 200, 5000, 6.9, 12, "Snapdragon 8 Elite", ["new", "best"], 4.7, "New"],
  ["Samsung", "Galaxy S25", 80999, undefined, 50, 4000, 6.2, 12, "Snapdragon 8 Elite", ["new"], 4.5, "New"],
  ["Samsung", "Galaxy A56", 41999, 38999, 50, 5000, 6.7, 8, "Exynos 1580", ["deal"], 4.3, "New"],
  ["Google", "Pixel 9 Pro", 109999, 99999, 50, 4700, 6.3, 16, "Tensor G4", ["best"], 4.7, "New"],
  ["Google", "Pixel 9a", 49999, 46999, 48, 5100, 6.3, 8, "Tensor G4", ["new"], 4.4, "New"],
  ["OnePlus", "OnePlus 13", 69999, 64999, 50, 6000, 6.8, 12, "Snapdragon 8 Elite", ["best", "deal"], 4.6, "New"],
  ["OnePlus", "OnePlus Nord 4", 29999, 27999, 50, 5500, 6.7, 8, "Snapdragon 7+ Gen 3", ["deal"], 4.3, "New"],
  ["Xiaomi", "Xiaomi 15 Ultra", 109999, undefined, 50, 5410, 6.73, 16, "Snapdragon 8 Elite", ["new"], 4.6, "New"],
  ["Xiaomi", "Redmi Note 14 Pro", 24999, 21999, 200, 5500, 6.67, 8, "Dimensity 7300", ["deal", "best"], 4.2, "Refurbished"],
  ["Nothing", "Phone (3a)", 24999, 22999, 50, 5000, 6.77, 8, "Snapdragon 7s Gen 3", ["new"], 4.4, "New"],
  ["Nothing", "Phone (2)", 36999, 29999, 50, 4700, 6.7, 12, "Snapdragon 8+ Gen 1", ["deal"], 4.3, "Open box"],
];

const palettes: Colorway[][] = [
  [{ name: "Titanium", hex: "#9a9590", hue: 0 }, { name: "Midnight", hex: "#2b2f3a", hue: 40 }, { name: "Desert", hex: "#c7a27c", hue: 140 }],
  [{ name: "Ultramarine", hex: "#4f6bd8", hue: 0 }, { name: "Teal", hex: "#4fb3a9", hue: -50 }, { name: "Pink", hex: "#e6a1c4", hue: 90 }],
  [{ name: "Obsidian", hex: "#1f2126", hue: 0 }, { name: "Porcelain", hex: "#e9e4dc", hue: 160 }, { name: "Mint", hex: "#9ed8bd", hue: -80 }],
];

const slugify = (s: string) => s.toLowerCase().replace(/[()]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const phones: Product[] = seeds.map((s, i) => {
  const [b, name, price, sale, cam, bat, disp, ram, chip, tags, rating, condition] = s;
  const base = sale ?? price;
  const display = name.startsWith("Phone") ? `Nothing ${name}` : name;
  return {
    id: `p${i}`,
    slug: slugify(display),
    brand: b,
    name: display,
    category: "phone",
    price,
    salePrice: sale,
    colorways: palettes[i % 3],
    variants: [
      { ram, storage: 128, price: base, inStock: true },
      { ram, storage: 256, price: base + 10000, inStock: true },
      { ram: ram + 4 > 16 ? ram : ram + 4, storage: 512, price: base + 25000, inStock: i % 4 !== 0 },
    ],
    specs: {
      Display: `${disp}" AMOLED, 120Hz, HDR`,
      Chip: chip,
      Camera: `${cam}MP main + ultra-wide${cam >= 48 ? " + telephoto" : ""}`,
      Battery: `${bat} mAh, fast charging`,
      OS: b === "Apple" ? "iOS 18" : "Android 15",
      Connectivity: "5G, Wi‑Fi 7, Bluetooth 5.4, NFC, USB‑C",
      Build: "Aluminium / titanium frame, Gorilla glass, IP68",
    },
    numeric: { camera: cam, battery: bat, display: disp, ram, storage: 128, fiveG: true },
    highlights: [`${cam}MP pro camera`, `${bat} mAh all-day battery`, chip, `${disp}" 120Hz display`],
    rating,
    reviews: 120 + i * 37,
    condition,
    tags,
    createdAt: 2025 - i,
  };
});

const acc: [string, string, number, number | undefined][] = [
  ["Apple", "AirPods Pro 2", 24900, 21900],
  ["Samsung", "Galaxy Buds3 Pro", 19999, 16999],
  ["Apple", "Watch Series 10", 46900, undefined],
  ["Samsung", "Galaxy Watch7", 29999, 26999],
  ["PHONEX", "65W GaN Charger", 2999, 2199],
  ["PHONEX", "Braided USB‑C Cable 2m", 999, 699],
  ["PHONEX", "MagSafe Leather Case", 2499, 1999],
  ["PHONEX", "Tempered Glass Guard", 799, 499],
  ["Google", "Pixel Buds Pro 2", 22900, 19900],
  ["PHONEX", "10,000mAh Power Bank", 2499, 1899],
  ["OnePlus", "Buds 3", 5499, 4499],
];

export const accessoriesList: Product[] = acc.map(([b, name, price, sale], i) => ({
  id: `a${i}`,
  slug: slugify(name),
  brand: b,
  name,
  category: "accessory",
  price,
  salePrice: sale,
  colorways: palettes[(i + 1) % 3],
  variants: [{ ram: 0, storage: 0, price: sale ?? price, inStock: true }],
  specs: { Type: "Accessory", Warranty: "1 year PHONEX warranty", Compatibility: "Universal / USB‑C" },
  numeric: { camera: 0, battery: 0, display: 0, ram: 0, storage: 0, fiveG: false },
  highlights: ["Genuine product", "1 year warranty"],
  rating: 4.3 + (i % 5) / 10,
  reviews: 40 + i * 11,
  condition: "New",
  tags: i % 2 ? ["deal"] : ["best"],
  createdAt: 2024,
}));

export const allProducts = [...phones, ...accessoriesList];
export const getProduct = (slug: string) => allProducts.find((p) => p.slug === slug);
export const priceOf = (p: Product) => p.salePrice ?? p.price;
export const imageFor = (p: Product) => (p.category === "accessory" ? images.accessories : images.front);
