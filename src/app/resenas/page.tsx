import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { reviews } from "@/data/reviews";

export const metadata: Metadata = {
  title: "Reseñas",
};

export default function ResenasPage() {
  return (
    <>
      <PageHero variant="cream" title="RESEÑAS" subtitle="LO QUE VIVEN NUESTROS CLIENTES" />
      <section className="bg-cream px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal key={review.id} delay={0.05 * i}>
              <article className="card-service flex h-full flex-col p-6">
                <div className="text-brown">{"★".repeat(review.rating)}</div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                  “{review.text}”
                </p>
                <div className="mt-5 border-t border-brown/15 pt-4">
                  <p className="font-semibold text-brown-deep">{review.name}</p>
                  <p className="text-xs text-muted">{review.date}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
