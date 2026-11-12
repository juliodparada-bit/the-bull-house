"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { site } from "@/data/site";
import { SocialLinks } from "@/components/SocialLinks";

const bands = [
  {
    href: "/",
    kind: "brand" as const,
    title: "THE BULL HOUSE",
    subtitle: "BARBERSHOP",
    bg: "bg-black text-cream",
    titleClass: "band-title-display text-cream",
  },
  {
    href: "/servicios",
    kind: "link" as const,
    title: "SERVICIOS",
    subtitle: "CONOCE LA EXPERIENCIA",
    bg: "bg-cream text-brown-deep",
    titleClass: "band-title-serif text-brown-deep",
  },
  {
    href: "/reservas",
    kind: "link" as const,
    title: "RESERVAS",
    subtitle: "VIVE LA EXPERIENCIA",
    bg: "bg-brown text-cream",
    titleClass: "band-title-serif text-cream",
  },
  {
    href: "/tienda",
    kind: "link" as const,
    title: "TIENDA",
    subtitle: "A tu estilo",
    bg: "bg-white text-black",
    titleClass: "band-title-display text-black",
    showLogo: true,
  },
];

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-black">
      {bands.map((band, i) => {
        const content = (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            <h1 className={band.titleClass}>{band.title}</h1>
            <p
              className={
                band.kind === "brand"
                  ? "band-sub-brand"
                  : `band-sub ${
                      band.bg.includes("cream") || band.bg.includes("white")
                        ? "text-brown-deep/80"
                        : "text-cream/85"
                    }`
              }
            >
              {band.subtitle}
            </p>
          </motion.div>
        );

        if (band.kind === "brand") {
          return (
            <section key={band.title} className={`band ${band.bg}`}>
              {content}
            </section>
          );
        }

        return (
          <Link
            key={band.title}
            href={band.href}
            className={`band group ${band.bg}`}
          >
            {band.showLogo ? (
              <Image
                src="/logo.svg"
                alt=""
                width={220}
                height={220}
                className="pointer-events-none absolute -bottom-8 -right-6 opacity-20 transition duration-500 group-hover:opacity-30 group-hover:scale-105 md:bottom-0 md:right-8"
              />
            ) : null}
            <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/[0.03]" />
            {content}
            <span className="mt-4 text-[10px] uppercase tracking-[0.3em] opacity-0 transition group-hover:opacity-70">
              Entrar →
            </span>
          </Link>
        );
      })}

      <section className="border-t border-white/10 bg-black px-5 py-12 text-center text-cream md:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto flex max-w-4xl flex-col items-center gap-8"
        >
          <div className="flex flex-wrap justify-center gap-8 text-[11px] font-semibold uppercase tracking-[0.22em] text-cream/75">
            <Link href="/contacto" className="transition hover:text-cream">
              Contáctanos
            </Link>
            <Link href="/ubicacion" className="transition hover:text-cream">
              Ubicación
            </Link>
            <Link href="/resenas" className="transition hover:text-cream">
              Reseñas
            </Link>
            <Link href="/nosotros" className="transition hover:text-cream">
              Nosotros
            </Link>
          </div>

          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-cream/55">
              Síguenos
            </p>
            <SocialLinks variant="light" size="lg" />
          </div>

          <div>
            <p className="font-serif text-2xl tracking-[0.08em] text-cream md:text-4xl">
              {site.claim.toUpperCase()}
            </p>
            <p className="mt-3 text-xs uppercase tracking-[0.28em] text-cream/65">
              {site.claimSecondary.toUpperCase()}
            </p>
            <p className="mt-5 text-[11px] uppercase tracking-[0.3em] text-cream/45">
              Since {site.since}
            </p>
          </div>
          <p className="text-[10px] text-cream/35">
            {site.address} · {site.city}
          </p>
        </motion.div>
      </section>
    </div>
  );
}
