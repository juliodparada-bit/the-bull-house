import { NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/booking";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const professionalId = searchParams.get("professionalId");
  const date = searchParams.get("date");
  const durationMin = Number(searchParams.get("durationMin") || "45");

  if (!professionalId || !date) {
    return NextResponse.json(
      { error: "Faltan parámetros" },
      { status: 400 },
    );
  }

  const slots = getAvailableSlots(professionalId, date, durationMin);
  return NextResponse.json({ slots });
}
