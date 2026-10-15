/** Brand placeholders — edit here to rebrand the whole store. */
export const brand = {
  name: "PHONEX",
  tagline: "Your next phone. Perfectly matched.",
  currency: "₹",
  phone: "+91 98765 43210",
  whatsapp: "919876543210",
  email: "hello@phonex.store",
  freeShippingAt: 999,
};

export const formatPrice = (n: number) => `${brand.currency}${Math.round(n).toLocaleString("en-IN")}`;
export const emi = (price: number, months = 12) => Math.ceil(price / months);
