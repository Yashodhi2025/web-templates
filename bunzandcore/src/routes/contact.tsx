import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, MapPin, Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SplitText } from "@/components/animations/primitives";
import { faqs } from "@/data/content";
import { brand } from "@/lib/brand";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — BUNZ & CO." },
      { name: "description", content: "Questions, catering, collabs or compliments — get in touch with BUNZ & CO. FAQ included." },
      { property: "og:title", content: "Contact — BUNZ & CO." },
      { property: "og:description", content: "Questions, catering or compliments — get in touch." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Tell us your name").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  message: z.string().trim().min(10, "A little more detail, please").max(1000),
});

function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });
  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 600));
    toast.success("Message sent! We'll reply within a day.");
    reset();
  };
  return (
    <div className="pt-32 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        <SplitText as="h1" onScroll={false} text="Let's talk burgers." className="display-xl text-6xl md:text-9xl" />
        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 rounded-3xl glass p-6 md:p-8">
            {(["name", "email"] as const).map((f) => (
              <div key={f}>
                <label htmlFor={f} className="mb-1.5 block text-sm font-semibold capitalize">{f}</label>
                <Input id={f} type={f === "email" ? "email" : "text"} {...register(f)} aria-invalid={!!errors[f]} className="h-12 rounded-xl bg-secondary" />
                {errors[f] && <p className="mt-1 text-sm text-ketchup">{errors[f]?.message}</p>}
              </div>
            ))}
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-semibold">Message</label>
              <Textarea id="message" rows={5} {...register("message")} aria-invalid={!!errors.message} className="rounded-xl bg-secondary" />
              {errors.message && <p className="mt-1 text-sm text-ketchup">{errors.message.message}</p>}
            </div>
            <Button type="submit" variant="hero" size="xl" disabled={isSubmitting} className="w-full">{isSubmitting ? "Sending…" : "Send message"}</Button>
          </form>
          <div className="space-y-6">
            <div className="relative grid aspect-video place-items-center overflow-hidden rounded-3xl bg-secondary [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:32px_32px]" aria-label="Map">
              <MapPin className="h-12 w-12 animate-bounce fill-sauce text-charcoal" />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[{ I: Mail, v: brand.email }, { I: Phone, v: brand.phone }, { I: MapPin, v: "2190 Valencia St, SF" }].map(({ I, v }) => (
                <div key={v} className="rounded-2xl glass p-4 text-sm"><I className="mb-2 h-5 w-5 text-sauce" />{v}</div>
              ))}
            </div>
          </div>
        </div>
        <section aria-labelledby="faq-h" className="mx-auto mt-28 max-w-3xl">
          <h2 id="faq-h" className="display-xl mb-8 text-5xl md:text-6xl">FAQ</h2>
          <Accordion type="single" collapsible>
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`f${i}`}>
                <AccordionTrigger className="text-left font-display text-xl font-bold hover:text-sauce hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-base text-cream/75">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </div>
  );
}
