import type { Metadata } from "next";
import { Archivo_Black, Playfair_Display, Montserrat } from "next/font/google";
import { SiteChrome } from "@/components/SiteChrome";
import { site } from "@/data/site";
import "./globals.css";

const archivoBlack = Archivo_Black({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | Barbershop Bogotá`,
    template: `%s | ${site.name}`,
  },
  description:
    "Barbería premium en Bogotá desde 2013. Cortes, rituales de barba, asesoría de imagen y experiencia The Bull House.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${archivoBlack.variable} ${playfair.variable} ${montserrat.variable} h-full`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
