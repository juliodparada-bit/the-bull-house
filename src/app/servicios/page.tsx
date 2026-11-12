import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Conoce la experiencia The Bull House.",
};

const categories = [
  {
    href: "/servicios/categoria/individuales",
    label: "BARBERIA",
  },
  {
    href: "/servicios/categoria/combos",
    label: "PAQUETES BARBERIA",
  },
  {
    href: "/servicios/categoria/facial",
    label: "CUIDADO FACIAL",
  },
  {
    href: "/servicios/categoria/otros",
    label: "MANICURE Y PEDICURE",
  },
  {
    href: "/servicios/categoria/coloracion",
    label: "COLORACIÓN",
  },
];

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        variant="cream"
        title="SERVICIOS"
        subtitle="CONOCE LA EXPERIENCIA"
        line2="EN NUESTRA BARBERIA"
      />

      <section className="bg-gradient-to-r from-[#d7d3ce] to-white px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto flex max-w-xl flex-col gap-4">
          {categories.map((cat, i) => (
            <Reveal key={cat.href} delay={0.06 * i}>
              <Link
                href={cat.href}
                className="card-service block px-6 py-5 text-center font-sans text-sm font-extrabold tracking-[0.18em] md:text-base"
              >
                {cat.label}
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
