import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { products } from "@/data/products";
import { formatPrice } from "@/data/services";
import { buildWhatsAppUrl, productWhatsAppMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Tienda",
  description: "A tu estilo — catálogo The Bull House. Pago contraentrega.",
};

export default function TiendaPage() {
  return (
    <>
      <PageHero
        variant="white"
        titleFont="display"
        title="TIENDA"
        subtitle="A tu estilo"
      />

      <section className="bg-[#ececec] px-5 py-8 text-center">
        <div className="mx-auto inline-block rounded-xl border-4 border-black bg-white px-8 py-4">
          <p className="font-sans text-sm font-extrabold uppercase tracking-[0.16em] text-black">
            Productos para el cabello
          </p>
        </div>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Pagos solo contraentrega
        </p>
      </section>

      <section className="watermark-pattern bg-white px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => {
            const wa = buildWhatsAppUrl(
              productWhatsAppMessage(product.name, product.price),
            );
            return (
              <Reveal key={product.slug} delay={0.05 * i}>
                <article className="text-center">
                  <div className="mx-auto flex aspect-square max-w-[260px] items-center justify-center rounded-2xl bg-gradient-to-br from-[#ddd] to-[#f5f5f5]">
                    <p className="font-display px-4 text-lg tracking-wider text-black/25">
                      THE BULL HOUSE
                    </p>
                  </div>
                  <p className="font-serif mt-4 text-2xl text-black">
                    {formatPrice(product.price)}
                  </p>
                  <h2 className="mt-2 text-sm font-bold uppercase tracking-wide text-ink">
                    {product.name}
                  </h2>
                  <p className="mx-auto mt-2 max-w-xs text-sm text-muted">
                    {product.description}
                  </p>
                  <a href={wa} target="_blank" rel="noreferrer" className="btn-brown mt-5">
                    Pedir por WhatsApp
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
