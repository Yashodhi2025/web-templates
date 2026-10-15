import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { X, Plus, Share2 } from "lucide-react";
import { toast } from "sonner";
import { phones, priceOf, getProduct } from "@/data/products";
import { useShop } from "@/lib/store";
import { formatPrice } from "@/lib/brand";
import { PageHeader, meta } from "@/components/sections/PageHeader";
import { PhoneImage } from "@/components/shop/PhoneImage";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/compare")({
  head: () => meta("Compare Phones", "Compare up to three phones side by side on camera, battery, display and price."),
  component: Compare,
});

type Row = { k: string; get: (p: ReturnType<typeof getProduct> & {}) => string | number; best?: "max" | "min" };
const rows: Row[] = [
  { k: "Price", get: (p) => priceOf(p), best: "min" },
  { k: "Camera (MP)", get: (p) => p.numeric.camera, best: "max" },
  { k: "Battery (mAh)", get: (p) => p.numeric.battery, best: "max" },
  { k: "Display (in)", get: (p) => p.numeric.display, best: "max" },
  { k: "RAM (GB)", get: (p) => p.numeric.ram, best: "max" },
  { k: "Rating", get: (p) => p.rating, best: "max" },
  { k: "Chip", get: (p) => p.specs.Chip },
  { k: "OS", get: (p) => p.specs.OS },
  { k: "Condition", get: (p) => p.condition },
];

function Compare() {
  const { compare, toggleCompare } = useShop();
  const [diff, setDiff] = useState(false);
  const list = compare.map(getProduct).filter((p): p is NonNullable<typeof p> => !!p);
  const visible = rows.filter((r) => !diff || new Set(list.map((p) => String(r.get(p)))).size > 1);

  return (
    <>
      <PageHeader eyebrow="Compare" title="Side by side. No guesswork." />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 text-sm"><Switch checked={diff} onCheckedChange={setDiff} /> Show differences only</label>
          {list.length < 3 && (
            <Select onValueChange={(s) => toggleCompare(s)} value="">
              <SelectTrigger className="w-56 rounded-full"><Plus className="h-4 w-4" /><SelectValue placeholder="Add a phone" /></SelectTrigger>
              <SelectContent>{phones.filter((p) => !compare.includes(p.slug)).map((p) => <SelectItem key={p.id} value={p.slug}>{p.name}</SelectItem>)}</SelectContent>
            </Select>
          )}
          <Button variant="ghost" className="ml-auto" onClick={() => { navigator.clipboard.writeText(location.href); toast.success("Link copied"); }}><Share2 className="h-4 w-4" /> Share</Button>
        </div>
        {list.length === 0 ? (
          <div className="glass rounded-3xl p-16 text-center"><p className="text-muted-foreground">Add phones from the shop to compare them here.</p><Button asChild className="mt-6 rounded-full bg-gradient-brand"><Link to="/phones">Browse phones</Link></Button></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-separate border-spacing-y-1">
              <thead className="sticky top-20">
                <tr>
                  <th className="w-40" />
                  {list.map((p) => (
                    <th key={p.id} className="glass rounded-3xl p-4 align-top animate-in fade-in zoom-in-95">
                      <button aria-label={`Remove ${p.name}`} onClick={() => toggleCompare(p.slug)} className="float-right text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>
                      <PhoneImage product={p} className="mx-auto h-40" />
                      <Link to="/phones/$slug" params={{ slug: p.slug }} className="mt-2 block font-display font-semibold">{p.name}</Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.map((r) => {
                  const vals = list.map((p) => r.get(p));
                  const nums = vals.filter((v): v is number => typeof v === "number");
                  const best = r.best && nums.length > 1 ? (r.best === "max" ? Math.max(...nums) : Math.min(...nums)) : null;
                  return (
                    <tr key={r.k}>
                      <td className="py-3 pr-4 text-sm text-muted-foreground">{r.k}</td>
                      {vals.map((v, i) => (
                        <td key={i} className={cn("rounded-xl p-3 text-center transition-colors duration-500", v === best && "bg-mint/15 font-semibold text-mint")}>
                          {r.k === "Price" ? formatPrice(v as number) : v}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
