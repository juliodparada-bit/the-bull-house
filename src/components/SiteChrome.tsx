"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { navItems, site } from "@/data/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { SocialLinks } from "@/components/SocialLinks";
import { cn } from "@/lib/cn";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      {!isHome && <InnerHeader />}
      <main className="flex-1">{children}</main>
      {!isHome && <Footer />}
      <WhatsAppFloat />
    </>
  );
}

function InnerHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-brown/15 bg-cream/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="The Bull House" width={42} height={42} />
          <div className="leading-none">
            <p className="font-display text-sm tracking-[0.08em] text-brown-deep">
              THE BULL HOUSE
            </p>
            <p className="mt-1.5 text-[11px] font-extrabold uppercase tracking-[0.32em] text-brown">
              Barbershop
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition",
                  active ? "text-brown" : "text-muted hover:text-brown-deep",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/reservas" className="btn-brown ml-2 !py-2.5 !text-[10px]">
            Reservar
          </Link>
        </nav>

        <button
          type="button"
          className="border border-brown/30 p-2 text-brown-deep lg:hidden"
          aria-label="Menú"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-t border-brown/10 bg-cream px-4 pb-6 lg:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block border-b border-brown/10 py-3 font-serif text-xl uppercase tracking-wide text-brown-deep"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-auto border-t border-brown/15 bg-black text-cream">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-xl tracking-[0.08em]">THE BULL HOUSE</p>
          <p className="mt-2 text-sm font-extrabold uppercase tracking-[0.28em] text-cream">
            Barbershop
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.22em] text-cream/55">
            Since {site.since}
          </p>
          <p className="mt-4 max-w-xs text-sm text-cream/65">
            {site.claim}. {site.claimSecondary}.
          </p>
          <SocialLinks variant="light" size="sm" className="mt-6 !justify-start" />
        </div>
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-cream/55">
            Menú
          </p>
          <ul className="space-y-2 text-sm text-cream/75">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-cream/55">
            Visítanos
          </p>
          <p className="text-sm leading-relaxed text-cream/75">
            {site.address}
            <br />
            {site.city}
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-cream/45">
        © {new Date().getFullYear()} The Bull House
      </div>
    </footer>
  );
}

function WhatsAppFloat() {
  const href = buildWhatsAppUrl(
    `Hola ${site.name}, quiero información sobre sus servicios.`,
  );
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
    >
      <MessageCircle size={24} fill="currentColor" />
    </a>
  );
}
