"use client";

import { MessageCircle } from "lucide-react";
import { site } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  const href = buildWhatsAppUrl(
    `Hola ${site.name}, quiero información sobre sus servicios.`,
  );

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/40 transition hover:scale-105 md:bottom-8 md:right-8"
    >
      <MessageCircle size={26} fill="currentColor" />
    </a>
  );
}
