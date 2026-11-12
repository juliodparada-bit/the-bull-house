import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { services, getServiceBySlug, formatPrice } from "@/data/services";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  return { title: service?.name || "Servicio" };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <PageHero
        variant="cream"
        title="SERVICIOS"
        subtitle="CONOCE LA EXPERIENCIA"
        line2="EN NUESTRA BARBERIA"
      />

      <section className="bg-[#eceae7] px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <Reveal>
            <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br from-charcoal via-black to-brown-deep">
              <div className="flex h-full flex-col items-center justify-center p-8 text-center text-cream">
                <p className="font-display text-2xl tracking-[0.12em]">
                  THE BULL HOUSE
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.25em] text-cream/60">
                  Experiencia · {service.name}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="panel-box h-full !rounded-2xl !bg-[#cfcbc6] p-6 md:p-8">
              <div className="rounded-xl bg-cream px-4 py-3 text-center">
                <h2 className="font-sans text-sm font-extrabold uppercase tracking-[0.16em] text-brown-deep">
                  {service.name}
                </h2>
              </div>
              <p className="mt-5 text-sm font-bold uppercase tracking-wide text-ink">
                {service.includes.join(" + ")} :
              </p>
              <p className="font-serif mt-4 text-base leading-relaxed text-ink/85">
                {service.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-brown/20 pt-5">
                <p className="font-serif text-2xl text-brown-deep">
                  {formatPrice(service.price)}
                </p>
                <p className="text-sm text-muted">{service.durationMin} minutos</p>
              </div>
              <Link
                href={`/reservas?servicio=${service.slug}`}
                className="btn-brown mt-6 w-full"
              >
                Reservar este servicio
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
