import heroBurger from "@/assets/hero-burger.png";
import smoky from "@/assets/burger-smoky.jpg";
import chicken from "@/assets/burger-chicken.jpg";
import truffle from "@/assets/burger-truffle.jpg";
import veg from "@/assets/burger-veg.jpg";
import mojito from "@/assets/drink-mojito.jpg";
import berry from "@/assets/drink-berry.jpg";
import orange from "@/assets/drink-orange.jpg";
import sides from "@/assets/sides.jpg";

export type Category = "Burgers" | "Buns" | "Mojitos" | "Soft Drinks" | "Sides" | "Desserts";
export type Tag = "veg" | "spicy" | "new" | "bestseller";

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  image: string;
  tags: Tag[];
  calories: number;
  rating: number;
}

export const categories: Category[] = ["Burgers", "Buns", "Mojitos", "Soft Drinks", "Sides", "Desserts"];

export const menu: MenuItem[] = [
  { id: "og-double", name: "The OG Double", category: "Burgers", price: 14.5, image: heroBurger, tags: ["bestseller"], calories: 980, rating: 4.9, description: "Two dry-aged smash patties, double cheddar, crisp lettuce, vine tomato and our secret house sauce on a toasted sesame brioche." },
  { id: "smoke-show", name: "Smoke Show", category: "Burgers", price: 15.9, image: smoky, tags: ["bestseller"], calories: 1120, rating: 4.8, description: "Applewood bacon, bourbon-caramelised onions, smoked gouda and a lick of chipotle mayo." },
  { id: "hot-cluck", name: "Hot Cluck", category: "Burgers", price: 13.9, image: chicken, tags: ["spicy", "new"], calories: 890, rating: 4.7, description: "Buttermilk fried chicken thigh, sriracha honey glaze, pickled jalapeños and cooling ranch slaw." },
  { id: "truffle-boss", name: "Truffle Boss", category: "Burgers", price: 17.5, image: truffle, tags: ["new"], calories: 1040, rating: 4.9, description: "Black truffle aioli, wild mushrooms sautéed in brown butter, melted Swiss on a glossy brioche." },
  { id: "green-machine", name: "Green Machine", category: "Burgers", price: 13.5, image: veg, tags: ["veg"], calories: 640, rating: 4.6, description: "Herby pea & chickpea patty, smashed avocado, rocket, pickled red onion on a spinach-sesame bun." },
  { id: "bao-bun", name: "Sticky Pork Bao", category: "Buns", price: 9.5, image: smoky, tags: [], calories: 520, rating: 4.7, description: "Two pillowy steamed buns, gochujang-glazed pork belly, cucumber ribbons and crushed peanuts." },
  { id: "slider-trio", name: "Slider Trio", category: "Buns", price: 11.9, image: heroBurger, tags: ["bestseller"], calories: 760, rating: 4.8, description: "Three mini brioche sliders — classic cheese, smoky bacon, and hot honey chicken." },
  { id: "shroom-bun", name: "Shroom Bun", category: "Buns", price: 8.9, image: veg, tags: ["veg"], calories: 410, rating: 4.5, description: "Crispy king-oyster mushroom, miso mayo and pickled carrot in a soft milk bun." },
  { id: "classic-mojito", name: "Classic Lime Mojito", category: "Mojitos", price: 6.5, image: mojito, tags: ["veg", "bestseller"], calories: 140, rating: 4.9, description: "Hand-muddled lime and garden mint, cane sugar, crushed ice and sparkling soda." },
  { id: "berry-mojito", name: "Wild Berry Mojito", category: "Mojitos", price: 7, image: berry, tags: ["veg"], calories: 160, rating: 4.8, description: "Raspberries, blackberries and mint smashed over ice with a squeeze of lime." },
  { id: "spicy-mojito", name: "Chilli Mango Mojito", category: "Mojitos", price: 7.2, image: orange, tags: ["veg", "spicy", "new"], calories: 170, rating: 4.6, description: "Alphonso mango, lime, mint and a slow-burn of bird's eye chilli." },
  { id: "blood-orange", name: "Blood Orange Soda", category: "Soft Drinks", price: 4.5, image: orange, tags: ["veg"], calories: 110, rating: 4.7, description: "Our house-made blood orange cordial topped with sparkling water." },
  { id: "cola", name: "Craft Cola", category: "Soft Drinks", price: 3.9, image: orange, tags: ["veg"], calories: 130, rating: 4.4, description: "Small-batch cola with cane sugar, kola nut and a hint of vanilla." },
  { id: "lemonade", name: "Mint Lemonade", category: "Soft Drinks", price: 4.2, image: mojito, tags: ["veg"], calories: 120, rating: 4.6, description: "Cloudy lemonade blitzed with fresh mint and crushed ice." },
  { id: "fries", name: "Triple-Cooked Fries", category: "Sides", price: 4.9, image: sides, tags: ["veg", "bestseller"], calories: 420, rating: 4.9, description: "Crunchy outside, fluffy inside. Sea salt and rosemary." },
  { id: "loaded-fries", name: "Dirty Loaded Fries", category: "Sides", price: 7.9, image: sides, tags: ["spicy"], calories: 780, rating: 4.8, description: "Cheese sauce, crispy bacon bits, jalapeños and burger sauce drizzle." },
  { id: "rings", name: "Beer-Battered Rings", category: "Sides", price: 5.5, image: sides, tags: ["veg"], calories: 450, rating: 4.5, description: "Sweet onion rings in a crackling amber-ale batter with smoky ketchup." },
  { id: "choc-shake", name: "Triple Choc Shake", category: "Desserts", price: 6.9, image: sides, tags: ["veg", "bestseller"], calories: 690, rating: 4.9, description: "Belgian chocolate ice cream, fudge sauce, whipped cream and cocoa nibs." },
  { id: "cookie", name: "Brown Butter Cookie", category: "Desserts", price: 3.5, image: sides, tags: ["veg"], calories: 340, rating: 4.7, description: "Warm, gooey and flecked with sea salt. Baked every hour." },
];

export const signature = menu.filter((m) => m.category === "Burgers");
