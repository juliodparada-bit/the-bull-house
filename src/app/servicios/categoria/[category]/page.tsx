import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import {
  categoryLabels,
  formatPrice,
  getServicesByCategory,
  type ServiceCategory,
} from "@/data/services";

const valid: ServiceCategory[] = [
  "individuales",
  "combos",
  "facial",
  "coloracion",
  "otros",
];

type Props = { params: Promise<{ category: string }> };

export async function generateStaticParams() {
  return valid.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  if (!valid.includes(category as ServiceCategory)) return { title: "Servicios" };
  return { title: categoryLabels[category as ServiceCategory] };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  if (!valid.includes(category as ServiceCategory)) notFound();
  const items = getServicesByCategory(category as ServiceCategory);

  return (
    <>
      <PageHero
        variant="cream"
        title="SERVICIOS"
        subtitle="CONOCE LA EXPERIENCIA"
        line2={categoryLabels[category as ServiceCategory].toUpperCase()}
      />
      <section className="bg-cream px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2">
          {items.map((service, i) => (
            <Reveal key={service.slug} delay={0.04 * i}>
              <Link
                href={`/servicios/${service.slug}`}
                className="card-service block p-5"
              >
                <h2 className="font-sans text-sm font-extrabold uppercase tracking-[0.12em]">
                  {service.name}
                </h2>
                <p className="mt-2 text-sm text-muted">{service.shortDescription}</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="font-semibold text-brown">{formatPrice(service.price)}</span>
                  <span className="text-xs text-muted">{service.durationMin} min</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/servicios" className="btn-outline-brown">
            Volver a categorías
          </Link>
        </div>
      </section>
    </>
  );
}
