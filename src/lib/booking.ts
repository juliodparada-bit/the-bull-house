import { addMinutes, format, parse, isBefore, startOfDay } from "date-fns";
import { getBookings, type Booking } from "./db";

export const BUSINESS_HOURS = {
  start: 10, // 10:00
  end: 20, // 20:00 last possible start depends on duration
  slotIntervalMin: 30,
  closedWeekdays: [] as number[], // 0=Sun
};

export function generateTimeSlots(durationMin: number, dateStr: string) {
  const slots: string[] = [];
  const base = parse(
    `${dateStr} ${String(BUSINESS_HOURS.start).padStart(2, "0")}:00`,
    "yyyy-MM-dd HH:mm",
    new Date(),
  );
  const endLimit = parse(
    `${dateStr} ${String(BUSINESS_HOURS.end).padStart(2, "0")}:00`,
    "yyyy-MM-dd HH:mm",
    new Date(),
  );

  let cursor = base;
  while (true) {
    const slotEnd = addMinutes(cursor, durationMin);
    if (isBefore(endLimit, slotEnd)) break;
    slots.push(format(cursor, "HH:mm"));
    cursor = addMinutes(cursor, BUSINESS_HOURS.slotIntervalMin);
  }
  return slots;
}

export function isSlotTaken(
  professionalId: string,
  date: string,
  time: string,
  durationMin: number,
  excludeId?: string,
) {
  const bookings = getBookings().filter(
    (b) =>
      b.status === "confirmed" &&
      b.professionalId === professionalId &&
      b.date === date &&
      b.id !== excludeId,
  );

  const start = parse(`${date} ${time}`, "yyyy-MM-dd HH:mm", new Date());
  const end = addMinutes(start, durationMin);

  return bookings.some((b) => {
    const bStart = parse(`${b.date} ${b.time}`, "yyyy-MM-dd HH:mm", new Date());
    const bEnd = addMinutes(bStart, b.durationMin);
    return start < bEnd && end > bStart;
  });
}

export function getAvailableSlots(
  professionalId: string,
  date: string,
  durationMin: number,
) {
  const today = startOfDay(new Date());
  const selected = startOfDay(parse(date, "yyyy-MM-dd", new Date()));
  if (isBefore(selected, today)) return [];

  return generateTimeSlots(durationMin, date).filter(
    (time) => !isSlotTaken(professionalId, date, time, durationMin),
  );
}

export function createBookingId() {
  return `tbh_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export type CreateBookingInput = Omit<Booking, "id" | "status" | "createdAt">;
