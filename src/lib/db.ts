import fs from "fs";
import path from "path";

export type Booking = {
  id: string;
  /** @deprecated use serviceSlugs — se mantiene por compatibilidad */
  serviceSlug: string;
  serviceSlugs: string[];
  serviceName: string;
  serviceNames: string[];
  professionalId: string;
  professionalName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  customerName: string;
  customerPhone: string;
  durationMin: number;
  price: number;
  status: "confirmed" | "cancelled";
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "bookings.json");

function ensureDb() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, "[]", "utf8");
  }
}

export function getBookings(): Booking[] {
  ensureDb();
  const raw = fs.readFileSync(DB_PATH, "utf8");
  try {
    const list = JSON.parse(raw) as Booking[];
    return list.map(normalizeBooking);
  } catch {
    return [];
  }
}

function normalizeBooking(b: Booking): Booking {
  const slugs =
    b.serviceSlugs?.length > 0
      ? b.serviceSlugs
      : b.serviceSlug
        ? [b.serviceSlug]
        : [];
  const names =
    b.serviceNames?.length > 0
      ? b.serviceNames
      : b.serviceName
        ? [b.serviceName]
        : [];
  return {
    ...b,
    serviceSlugs: slugs,
    serviceNames: names,
    serviceSlug: slugs[0] || b.serviceSlug || "",
    serviceName: names.join(" + ") || b.serviceName || "",
  };
}

export function saveBookings(bookings: Booking[]) {
  ensureDb();
  fs.writeFileSync(DB_PATH, JSON.stringify(bookings, null, 2), "utf8");
}

export function addBooking(booking: Booking) {
  const bookings = getBookings();
  bookings.push(normalizeBooking(booking));
  saveBookings(bookings);
  return booking;
}

export function getBookingById(id: string) {
  return getBookings().find((b) => b.id === id);
}
