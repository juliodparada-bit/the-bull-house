import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-5 py-24 text-center">
      <p className="font-display text-5xl text-brown">404</p>
      <h1 className="font-serif mt-4 text-3xl text-brown-deep">Esta página no existe</h1>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="btn-brown">
          Inicio
        </Link>
        <Link href="/reservas" className="btn-outline-brown">
          Reservas
        </Link>
      </div>
    </div>
  );
}
