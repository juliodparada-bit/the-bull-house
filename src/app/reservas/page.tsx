import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { BookingWizard } from "@/components/BookingWizard";

export const metadata: Metadata = {
  title: "Reservas",
  description: "Agenda tu experiencia The Bull House.",
};

export default function ReservasPage() {
  return (
    <>
      <PageHero
        variant="brown"
        title="RESERVAS"
        subtitle="VIVE LA EXPERIENCIA"
        line2="DE VERTE Y SENTIRTE MEJOR"
      />
      <section className="bg-cream">
        <Suspense
          fallback={
            <p className="py-20 text-center text-muted">Cargando reservas…</p>
          }
        >
          <BookingWizard />
        </Suspense>
      </section>
    </>
  );
}
