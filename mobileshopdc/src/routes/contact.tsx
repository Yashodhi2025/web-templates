import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Phone, MessageCircle, MapPin } from "lucide-react";
import { PageHeader, meta } from "@/components/sections/PageHeader";
import { brand } from "@/lib/brand";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => meta("Contact & Stores", "Visit a PHONEX store, call, WhatsApp or send us a message."),
  component: Contact,
});

const stores = [{ n: "Bandra West, Mumbai", o: 10, c: 21 }, { n: "Koramangala, Bengaluru", o: 10, c: 22 }, { n: "Connaught Place, Delhi", o: 11, c: 21 }];
const schema = z.object({ name: z.string().trim().min(2).max(80), email: z.string().trim().email(), message: z.string().trim().min(10).max(1000) });

function Contact() {
  const [hour, setHour] = useState<number | null>(null);
  const [f, setF] = useState({ name: "", email: "", message: "", subject: "sales" });
  useEffect(() => setHour(new Date().getHours()), []);
  return (
    <>
      <PageHeader eyebrow="Contact" title="Talk to a human." sub="Average reply time: 8 minutes." />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2">
        <form className="glass space-y-4 rounded-3xl p-6" onSubmit={(e) => { e.preventDefault(); const r = schema.safeParse(f); if (!r.success) return toast.error("Please fill in your name, a valid email and a message (10+ chars)"); toast.success("Message sent — we'll be in touch shortly"); setF({ ...f, name: "", email: "", message: "" }); }}>
          <Input aria-label="Name" placeholder="Name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
          <Input aria-label="Email" type="email" placeholder="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
          <Select value={f.subject} onValueChange={(s) => setF({ ...f, subject: s })}>
            <SelectTrigger aria-label="Subject"><SelectValue /></SelectTrigger>
            <SelectContent><SelectItem value="sales">Buying a phone</SelectItem><SelectItem value="repair">Repair</SelectItem><SelectItem value="order">Existing order</SelectItem><SelectItem value="other">Something else</SelectItem></SelectContent>
          </Select>
          <Textarea aria-label="Message" placeholder="How can we help?" rows={5} value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
          <Button type="submit" className="w-full rounded-full bg-gradient-brand">Send message</Button>
          <div className="flex gap-2">
            <Button asChild variant="secondary" className="flex-1 rounded-full"><a href={`tel:${brand.phone.replace(/\s/g, "")}`}><Phone className="h-4 w-4" /> Call</a></Button>
            <Button asChild variant="secondary" className="flex-1 rounded-full"><a href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" /> WhatsApp</a></Button>
          </div>
        </form>
        <div className="space-y-4">
          {stores.map((s) => {
            const open = hour !== null && hour >= s.o && hour < s.c;
            return (
              <div key={s.n} className="glass flex items-center gap-4 rounded-3xl p-6">
                <MapPin className="h-6 w-6 text-primary" />
                <div className="flex-1"><p className="font-display text-lg font-semibold">{s.n}</p><p className="text-sm text-muted-foreground">{s.o}:00 – {s.c}:00, all days</p></div>
                {hour !== null && <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", open ? "bg-mint/15 text-mint" : "bg-destructive/15 text-destructive")}>{open ? "Open now" : "Closed"}</span>}
              </div>
            );
          })}
          <div className="glass grid h-56 place-items-center rounded-3xl bg-aurora text-muted-foreground">Map coming soon</div>
        </div>
      </div>
    </>
  );
}
