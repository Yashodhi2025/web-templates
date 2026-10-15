export const testimonials = [
  { name: "Maya R.", role: "Food blogger", quote: "The OG Double is the best smash burger in the city. Crispy edges, molten cheese, zero regrets.", stars: 5 },
  { name: "Jordan K.", role: "Regular since day one", quote: "I come for the Truffle Boss and stay for the berry mojitos. Staff remember my order.", stars: 5 },
  { name: "Priya S.", role: "Vegetarian", quote: "Finally a burger bar where the veg option isn't an afterthought. Green Machine slaps.", stars: 5 },
  { name: "Leo M.", role: "Late-night eater", quote: "Hot Cluck at 11pm after a gig? Unbeatable. The chilli mango mojito is dangerous.", stars: 4 },
  { name: "Ana T.", role: "Office lunch hero", quote: "Ordered for 14 people, everything arrived hot and perfectly packed. Instant hero status.", stars: 5 },
];

export interface Location {
  id: string;
  name: string;
  address: string;
  phone: string;
  open: number; // hour 0-23
  close: number; // hour 0-24
}
export const locations: Location[] = [
  { id: "mission", name: "Mission District", address: "2190 Valencia St, San Francisco", phone: "(415) 555-0142", open: 11, close: 23 },
  { id: "soho", name: "SoHo", address: "88 Spring St, New York", phone: "(212) 555-0199", open: 11, close: 24 },
  { id: "shoreditch", name: "Shoreditch", address: "41 Redchurch St, London", phone: "+44 20 5555 0110", open: 12, close: 22 },
];

export const faqs = [
  { q: "Do you take reservations?", a: "We're walk-in only, but parties of 8+ can book a table by emailing us at least 48 hours ahead." },
  { q: "Are your patties halal?", a: "Our beef and chicken are sourced from certified halal suppliers. Bacon is, of course, the exception." },
  { q: "Do you have vegan options?", a: "Yes — the Green Machine and Shroom Bun can be made fully vegan. Just ask for the vegan mayo swap." },
  { q: "How long does delivery take?", a: "Most orders arrive within 25–35 minutes inside our 3-mile delivery zone." },
  { q: "Can you cater events?", a: "Absolutely. We do slider bars, mojito stations and full burger trucks. Reach out via the contact form." },
];
