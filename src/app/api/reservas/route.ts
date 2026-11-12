import { NextResponse } from "next/server";
import { z } from "zod";
import { getServiceBySlug } from "@/data/services";
import { getProfessionalById } from "@/data/professionals";
import { createBookingId, isSlotTaken } from "@/lib/booking";
import { addBooking } from "@/lib/db";
import {
  bookingWhatsAppMessage,
  buildWhatsAppUrl,
} from "@/lib/whatsapp";

const schema = z
  .object({
    serviceSlug: z.string().min(1).optional(),
    serviceSlugs: z.array(z.string().min(1)).min(1).optional(),
    professionalId: z.string().min(1),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    time: z.string().regex(/^\d{2}:\d{2}$/),
    customerName: z.string().min(3),
    customerPhone: z.string().min(7),
  })
  .refine((d) => Boolean(d.serviceSlugs?.length || d.serviceSlug), {
    message: "Debes elegir al menos un servicio",
  });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Datos incompletos o inválidos" },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const slugs = Array.from(
      new Set(
        data.serviceSlugs?.length
          ? data.serviceSlugs
          : data.serviceSlug
            ? [data.serviceSlug]
            : [],
      ),
    );

    const selectedServices = slugs
      .map((slug) => getServiceBySlug(slug))
      .filter((s): s is NonNullable<typeof s> => Boolean(s));

    const professional = getProfessionalById(data.professionalId);

    if (selectedServices.length === 0 || !professional) {
      return NextResponse.json(
        { error: "Servicio o profesional no encontrado" },
        { status: 404 },
      );
    }

    if (selectedServices.length !== slugs.length) {
      return NextResponse.json(
        { error: "Uno o más servicios no son válidos" },
        { status: 400 },
      );
    }

    const durationMin = selectedServices.reduce(
      (sum, s) => sum + s.durationMin,
      0,
    );
    const price = selectedServices.reduce((sum, s) => sum + s.price, 0);
    const serviceNames = selectedServices.map((s) => s.name);

    if (
      isSlotTaken(data.professionalId, data.date, data.time, durationMin)
    ) {
      return NextResponse.json(
        {
          error:
            "Ese horario acaba de ocuparse. Elige otra hora o profesional.",
        },
        { status: 409 },
      );
    }

    const booking = addBooking({
      id: createBookingId(),
      serviceSlug: slugs[0],
      serviceSlugs: slugs,
      serviceName: serviceNames.join(" + "),
      serviceNames,
      professionalId: professional.id,
      professionalName: professional.name,
      date: data.date,
      time: data.time,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      durationMin,
      price,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    });

    const message = bookingWhatsAppMessage({
      id: booking.id,
      customerName: booking.customerName,
      customerPhone: booking.customerPhone,
      serviceNames: booking.serviceNames,
      professionalName: booking.professionalName,
      date: booking.date,
      time: booking.time,
      durationMin: booking.durationMin,
      price: booking.price,
    });

    const whatsappUrl = buildWhatsAppUrl(message);

    return NextResponse.json({ booking, whatsappUrl });
  } catch {
    return NextResponse.json(
      { error: "Error interno al crear la reserva" },
      { status: 500 },
    );
  }
}
