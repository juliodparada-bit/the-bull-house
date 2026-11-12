export type Product = {
  slug: string;
  name: string;
  price: number;
  description: string;
  category: string;
  featured?: boolean;
};

/** Catálogo de ejemplo — se actualizará cuando el cliente suministre productos reales */
export const products: Product[] = [
  {
    slug: "pomada-matte",
    name: "Pomada Matte Bull House",
    price: 60000,
    category: "Styling",
    featured: true,
    description:
      "Fijación media-alta con acabado mate. Ideal para peinados texturizados del día a día.",
  },
  {
    slug: "aceite-barba",
    name: "Aceite de barba premium",
    price: 55000,
    category: "Barba",
    featured: true,
    description:
      "Mezcla nutritiva que suaviza, hidrata y da brillo natural a la barba.",
  },
  {
    slug: "balm-barba",
    name: "Bálsamo modelador de barba",
    price: 48000,
    category: "Barba",
    description:
      "Control y definición sin resecar. Perfecto para barbas medianas y largas.",
  },
  {
    slug: "shampoo-hombre",
    name: "Shampoo masculino fortificante",
    price: 45000,
    category: "Cabello",
    description:
      "Limpieza profunda que fortalece la fibra capilar y mantiene el cuero cabelludo equilibrado.",
  },
  {
    slug: "cera-fibra",
    name: "Cera fibra texturizante",
    price: 52000,
    category: "Styling",
    description:
      "Textura flexible y reworkable para looks con movimiento y volumen.",
  },
  {
    slug: "kit-ritual",
    name: "Kit ritual de barba",
    price: 120000,
    category: "Kits",
    featured: true,
    description:
      "Aceite + bálsamo + peine de madera. El ritual Bull House para casa.",
  },
];
