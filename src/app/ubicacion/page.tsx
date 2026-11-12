import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Ubicación",
};

export default function UbicacionPage() {
  const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`;

  return (
    <>
      <PageHero variant="brown" title="UBICACIÓN" subtitle="ENCUÉNTRANOS EN BOGOTÁ" />
      <section className="bg-cream px-5 py-12 md:px-8 md:py-16">
        <Reveal>
          <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-brown/15">
            <iframe
              title="Mapa The Bull House"
              src={mapsEmbed}
              className="h-[400px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Reveal>
        <div className="mx-auto mt-8 max-w-5xl text-center">
          <p className="font-serif text-2xl text-brown-deep">{site.address}</p>
          <p className="mt-2 text-muted">{site.city}</p>
          <a href={mapsLink} target="_blank" rel="noreferrer" className="btn-brown mt-6 inline-flex">
            Cómo llegar
          </a>
        </div>
      </section>
    </>
  );
}
