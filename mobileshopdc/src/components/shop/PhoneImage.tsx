import { imageFor, images, type Colorway, type Product } from "@/data/products";
import { cn } from "@/lib/utils";

/** Product shot on a colour-matched glow backdrop. Hue shift simulates colourways until real photos are added. */
export function PhoneImage({ product, color, className, eager, back }: { product: Product; color?: Colorway; className?: string; eager?: boolean; back?: boolean }) {
  const c = color ?? product.colorways[0];
  return (
    <div className={cn("relative flex items-center justify-center overflow-hidden", className)}>
      <div
        className="absolute inset-[15%] rounded-full blur-3xl opacity-60 transition-[background] duration-700"
        style={{ background: c.hex }}
        aria-hidden
      />
      <img
        src={back && product.category === "phone" ? images.back : imageFor(product)}
        alt={`${product.name} in ${c.name}`}
        loading={eager ? "eager" : "lazy"}
        width={product.category === "phone" ? 768 : 1024}
        height={product.category === "phone" ? 1280 : 768}
        className="relative h-full w-full object-contain transition-[filter] duration-700 drop-shadow-2xl"
        style={{ filter: `hue-rotate(${c.hue}deg)` }}
      />
    </div>
  );
}
