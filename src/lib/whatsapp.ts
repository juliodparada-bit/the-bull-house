import { site } from "@/data/site";

export function buildWhatsAppUrl(message: string, phone = site.whatsapp) {
  const clean = phone.replace(/\D/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

export function bookingWhatsAppMessage(params: {
  id: string;
  customerName: string;
  customerPhone: string;
  serviceNames: string[];
  professionalName: string;
  date: string;
  time: string;
  durationMin: number;
  price: number;
}) {
  const servicesBlock =
    params.serviceNames.length === 1
      ? `Servicio: ${params.serviceNames[0]}`
      : [
          `Servicios (${params.serviceNames.length}):`,
          ...params.serviceNames.map((n) => `• ${n}`),
        ].join("\n");

  return [
    `*Nueva reserva — The Bull House*`,
    ``,
    `ID: ${params.id}`,
    `Cliente: ${params.customerName}`,
    `Teléfono: ${params.customerPhone}`,
    servicesBlock,
    `Profesional: ${params.professionalName}`,
    `Fecha: ${params.date}`,
    `Hora: ${params.time}`,
    `Duración aprox.: ${params.durationMin} min`,
    `Valor: $${params.price.toLocaleString("es-CO")}`,
    ``,
    `Enviada desde la web.`,
  ].join("\n");
}

export function productWhatsAppMessage(productName: string, price: number) {
  return [
    `Hola The Bull House 👋`,
    `Quiero pedir *${productName}* ($${price.toLocaleString("es-CO")}).`,
    `Pago contraentrega. ¿Me confirman disponibilidad?`,
  ].join("\n");
}
