import Link from "next/link";
import { site, navItems } from "@/data/site";

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-line bg-bg-elevated">
      <div className="gold-line absolute inset-x-0 top-0" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-[10px] uppercase tracking-[0.35em] text-gold">
            {site.tagline}
          </p>
          <p className="font-display mt-2 text-2xl tracking-[0.08em] text-cream">
            {site.name}
          </p>
          <p className="mt-3 text-sm text-cream-muted">Since {site.since}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-muted">
            {site.claim}. {site.claimSecondary}.
          </p>
        </div>

        <div>
          <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-gold">
            Explorar
          </p>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-cream-muted transition hover:text-cream"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-[11px] uppercase tracking-[0.22em] text-gold">
            Visítanos
          </p>
          <p className="text-sm leading-relaxed text-cream-muted">
            {site.address}
            <br />
            {site.city}
          </p>
          <p className="mt-4 text-sm text-cream-muted">{site.phoneDisplay}</p>
          <div className="mt-5 flex gap-4 text-[11px] uppercase tracking-[0.18em]">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="text-gold transition hover:text-gold-light"
            >
              Instagram
            </a>
            <a
              href={site.social.tiktok}
              target="_blank"
              rel="noreferrer"
              className="text-gold transition hover:text-gold-light"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-line/60 px-5 py-5 text-center text-xs text-cream-muted md:px-8">
        © {new Date().getFullYear()} {site.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
