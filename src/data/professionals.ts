export type Professional = {
  id: string;
  name: string;
  role: string;
  bio: string;
  specialties: string[];
};

/** Nombres del Canva — fotos pendientes del cliente */
export const professionals: Professional[] = [
  {
    id: "lian",
    name: "Lian",
    role: "Barber",
    bio: "Cortes clásicos, fades y acabados de precisión.",
    specialties: ["Fades", "Clásico", "Detalles"],
  },
  {
    id: "jhoan",
    name: "Jhoan",
    role: "Barber",
    bio: "Rituales de barba, pigmentación y estilo contemporáneo.",
    specialties: ["Barba", "Pigmentación", "Estilo"],
  },
  {
    id: "alejandro",
    name: "Alejandro",
    role: "Barber",
    bio: "Asesoría de imagen, combos premium y tendencias.",
    specialties: ["Asesoría", "Combos", "Tendencias"],
  },
];

export function getProfessionalById(id: string) {
  return professionals.find((p) => p.id === id);
}
