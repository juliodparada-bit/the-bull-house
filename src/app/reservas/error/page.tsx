"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { PageHero } from "@/components/PageHero";

function ErrorContent() {
  const params = useSearchParams();
  const reason =
    params.get("reason") ||
    "Ocurrió un problema al procesar tu reserva. Inténtalo de nuevo.";

  return (
    <>
      <PageHero variant="brown" title="RESERVA" subtitle="NO PUDIMOS COMPLETARLA" />
      <section className="bg-cream px-5 py-14">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="panel-box mx-auto max-w-xl text-center"
        >
          <AlertTriangle className="mx-auto text-brown" size={48} />
          <p className="mt-5 text-sm text-muted">{reason}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/reservas" className="btn-brown">
              Intentar de nuevo
            </Link>
            <Link href="/contacto" className="btn-outline-brown">
              Contáctanos
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}

export default function ReservaErrorPage() {
  return (
    <Suspense fallback={<p className="py-24 text-center text-muted">Cargando…</p>}>
      <ErrorContent />
    </Suspense>
  );
}
