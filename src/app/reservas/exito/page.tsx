"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/PageHero";

function SuccessContent() {
  const params = useSearchParams();
  const id = params.get("id") || "";
  const wa = params.get("wa") || "";

  useEffect(() => {
    if (!wa) return;
    const timer = setTimeout(() => {
      window.open(wa, "_blank", "noopener,noreferrer");
    }, 800);
    return () => clearTimeout(timer);
  }, [wa]);

  return (
    <>
      <PageHero
        variant="brown"
        title="RESERVA CONFIRMADA"
        subtitle="TU CITA QUEDÓ AGENDADA"
      />
      <section className="bg-cream px-5 py-14">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="panel-box mx-auto max-w-xl text-center"
        >
          <CheckCircle2 className="mx-auto text-brown" size={52} />
          <p className="mt-5 text-sm text-muted">Número de reserva</p>
          <p className="mt-2 break-all font-serif text-xl text-brown-deep">{id}</p>
          <p className="mt-5 text-sm text-muted">
            Tu espacio quedó bloqueado en la agenda. Te abrimos WhatsApp para
            notificar al equipo.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            {wa ? (
              <a href={wa} target="_blank" rel="noreferrer" className="btn-brown">
                <MessageCircle size={16} /> Enviar por WhatsApp
              </a>
            ) : null}
            <Link href="/" className="btn-outline-brown">
              Volver al inicio
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}

export default function ReservaExitoPage() {
  return (
    <Suspense fallback={<p className="py-24 text-center text-muted">Cargando…</p>}>
      <SuccessContent />
    </Suspense>
  );
}
