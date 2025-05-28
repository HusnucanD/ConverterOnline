import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Converter.Online",
  description:
    "Convert between over 500 units of length, mass, volume, pressure and more — fast, reliable & SEO‑friendly.",
  keywords: [
    "units converter",
    "Acceleration",
    "Area",
    "Capacitance",
    "Charge",
    "Conductance",
    "Current",
    "Data",
    "Density",
    "Energy",
    "Flow",
    "Force",
    "Frequency",
    "Illuminance",
    "InfoRate",
    "Length",
    "LuminousFlux",
    "MagneticFlux",
    "MagneticFluxDensity",
    "Mass",
    "Power",
    "Pressure",
    "Resistance",
    "Speed",
    "Temperature",
    "Time",
    "Viscosity",
    "Voltage",
    "Volume",
  ],
  openGraph: {
    type: "website",
    title: "Converter.Online",
    description: "Convert between over 500 units in one click.",
    url: "https://converter.online",
    images: [{ url: "/logo.png", width: 1200, height: 630, alt: "Converter Online" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-background text-foreground">
        <div className="md:h-screen antialiased flex md:pt-8">{children}</div>
      </body>
    </html>
  );
}
