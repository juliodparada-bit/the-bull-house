export type Review = {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
};

export const reviews: Review[] = [
  {
    id: "1",
    name: "Santiago Gómez",
    rating: 5,
    date: "2026-06-12",
    text: "Más que un corte: la experiencia completa. Salí renovado y con una asesoría que realmente se nota.",
  },
  {
    id: "2",
    name: "Mateo Ruiz",
    rating: 5,
    date: "2026-05-28",
    text: "El ritual de barba premium es otro nivel. Atención impecable y ambiente de primera en el centro.",
  },
  {
    id: "3",
    name: "Andrés Quintero",
    rating: 5,
    date: "2026-05-03",
    text: "Llevo años viniendo. Siempre consistentemente buenos, profesionales y con detalle en cada corte.",
  },
  {
    id: "4",
    name: "Felipe Castro",
    rating: 5,
    date: "2026-04-19",
    text: "Reservé online, llegué y todo fluyó. El combo corte + barba quedó perfecto.",
  },
  {
    id: "5",
    name: "Juan Sebastián",
    rating: 5,
    date: "2026-03-30",
    text: "Desde 2013 mantienen el estándar. The Bull House es mi barbería de confianza en Bogotá.",
  },
  {
    id: "6",
    name: "Nicolás Herrera",
    rating: 5,
    date: "2026-03-08",
    text: "Excelente asesoría de imagen. Me ayudaron a encontrar un estilo que sí va conmigo.",
  },
];
