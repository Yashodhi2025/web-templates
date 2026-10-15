/** Edit brand details here — used across the whole site. */
export const brand = {
  name: "BUNZ & CO.",
  short: "BUNZ",
  tagline: "Stacked right. Served bold.",
  description:
    "Gourmet smash burgers, pillowy brioche buns and hand-muddled mojitos. A premium street-food burger bar.",
  phone: "+1 (415) 555-0142",
  email: "hello@bunzandco.com",
  socials: { instagram: "#", tiktok: "#", x: "#" },
  currency: "$",
};

export const navLinks = [
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export const money = (n: number) => `${brand.currency}${n.toFixed(2)}`;
