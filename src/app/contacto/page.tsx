import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SocialLinks } from "@/components/SocialLinks";
import { site } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contáctanos",
};

export default function ContactoPage() {
  const wa = buildWhatsAppUrl(`Hola ${site.name}, quiero más información.`);

  return (
    <>
      <PageHero variant="brown" title="CONTÁCTANOS" subtitle="ESTAMOS PARA ATENDERTE" />
      <section className="bg-cream px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
          <Reveal>
            <a href={wa} target="_blank" rel="noreferrer" className="card-service block p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em]">WhatsApp</p>
              <p className="mt-3 font-serif text-2xl">{site.phoneDisplay}</p>
            </a>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card-service p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em]">Correo</p>
              <a href={`mailto:${site.email}`} className="mt-3 block font-serif text-xl">
                {site.email}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="card-service p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em]">Horarios</p>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {site.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-3">
                    <span>{h.day}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-12 max-w-xl text-center">
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.28em] text-brown">
            Redes sociales
          </p>
          <SocialLinks variant="brown" size="lg" />
          <p className="mt-4 text-xs text-muted">
            Los enlaces se actualizarán cuando el cliente facilite sus perfiles oficiales.
          </p>
        </Reveal>
      </section>
    </>
  );
}
