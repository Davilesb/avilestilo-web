import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AVILESTILO — Future is Wearable",
  description: "Moda urbana reinterpretada mediante diseño, tecnología e inteligencia artificial.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
