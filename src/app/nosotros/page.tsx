import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "La historia de The Bull House Barbershop.",
};

export default function NosotrosPage() {
  return (
    <>
      <PageHero
        variant="black"
        title="THE BULL HOUSE"
        subtitle={site.claim.toUpperCase()}
        line2={`${site.claimSecondary.toUpperCase()} · SINCE ${site.since}`}
      />
      <section className="relative overflow-hidden bg-[#d9d4cd] px-5 py-16 md:px-8 md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[url('/logo.svg')] bg-[length:420px] bg-[right_-40px_center] bg-no-repeat opacity-10" />
        <Reveal>
          <div className="relative mx-auto max-w-3xl rounded-3xl bg-cream/80 p-8 shadow-lg backdrop-blur-md md:p-12">
            <div className="space-y-6 text-base leading-relaxed text-ink md:text-lg">
              {site.about.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
