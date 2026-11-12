import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  title: string;
  subtitle?: string;
  line2?: string;
  variant?: "brown" | "cream" | "black" | "white";
  titleFont?: "serif" | "display";
  children?: ReactNode;
  className?: string;
  showLogo?: boolean;
};

export function PageHero({
  title,
  subtitle,
  line2,
  variant = "brown",
  titleFont = "serif",
  children,
  className,
  showLogo = true,
}: Props) {
  const shell =
    variant === "cream" || variant === "white"
      ? "page-header-cream"
      : variant === "black"
        ? "page-header-black"
        : "page-header-brown";

  const titleColor =
    variant === "cream" || variant === "white"
      ? variant === "white"
        ? "text-black"
        : "text-brown-deep"
      : "text-cream";

  return (
    <section
      className={cn(shell, variant === "white" && "!bg-white", className)}
    >
      {showLogo ? (
        <Image
          src="/logo.svg"
          alt=""
          width={160}
          height={160}
          className="pointer-events-none absolute -right-4 top-1/2 hidden -translate-y-1/2 opacity-40 md:block"
        />
      ) : null}
      <div className="relative mx-auto max-w-4xl pt-4">
        <h1
          className={cn(
            titleFont === "display"
              ? "font-display text-5xl tracking-[0.06em] md:text-7xl"
              : "font-serif text-4xl tracking-[0.08em] md:text-6xl",
            titleColor,
          )}
        >
          {title}
        </h1>
        {subtitle ? (
          <p
            className={cn(
              "mt-3 text-xs font-semibold uppercase tracking-[0.28em] md:text-sm",
              variant === "cream" || variant === "white"
                ? "text-brown-deep/80"
                : "text-cream/85",
              variant === "white" && "!text-black/70",
            )}
          >
            {subtitle}
          </p>
        ) : null}
        {line2 ? (
          <p
            className={cn(
              "mt-2 text-[11px] uppercase tracking-[0.22em]",
              variant === "cream" || variant === "white"
                ? "text-brown-deep/65"
                : "text-cream/65",
              variant === "white" && "!text-black/55",
            )}
          >
            {line2}
          </p>
        ) : null}
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </section>
  );
}
