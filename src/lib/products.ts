import noir from "@/assets/p-noir.jpg";
import rose from "@/assets/p-rose.jpg";
import lumen from "@/assets/p-lumen.jpg";
import oud from "@/assets/p-oud.jpg";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  category: "Him" | "Her" | "Unisex";
  notes: string[];
  description: string;
  price: number;
  size: string;
  image: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "noir",
    name: "Noir Authority",
    tagline: "Smoked oud, leather, vetiver",
    category: "Him",
    notes: ["Oud", "Leather", "Vetiver", "Black Pepper"],
    description:
      "A structured blend of smoked oud, Italian leather and vetiver. Built for evenings that matter.",
    price: 15900,
    size: "100ml EDP",
    image: noir,
  },
  {
    id: "memine",
    name: "Memin'e Rose",
    tagline: "Damask rose, saffron, amber",
    category: "Her",
    notes: ["Damask Rose", "Saffron", "Amber", "Sandalwood"],
    description:
      "An offbeat floral with saffron warmth and crystalline rose. Soft, certain, unmistakable.",
    price: 13800,
    size: "75ml EDP",
    image: rose,
  },
  {
    id: "lumen",
    name: "Lumen Clair",
    tagline: "Bergamot, fig leaf, white musk",
    category: "Unisex",
    notes: ["Bergamot", "Fig Leaf", "White Musk", "Cedar"],
    description:
      "A profile of fresh citrus and dry cedar. Fits a clean shirt, a long flight, a quiet morning.",
    price: 12000,
    size: "100ml EDT",
    image: lumen,
  },
  {
    id: "oud-royal",
    name: "Oud Royal",
    tagline: "Cambodian oud, rose, incense",
    category: "Unisex",
    notes: ["Cambodian Oud", "Rose", "Incense", "Myrrh"],
    description:
      "Our signature bottle. Deep Cambodian oud bound with Bulgarian rose and temple incense.",
    price: 20500,
    size: "75ml Extrait",
    image: oud,
  },
];

export const findProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
