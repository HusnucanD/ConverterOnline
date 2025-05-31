import "@/app/globals.css";
import type { Metadata } from "next";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "Converter.online – Free Unit Converter",
    template: "%s | Converter.online",
  },
  description:
    "Convert over 500 units of length, mass, volume, pressure and more in one click. Accurate, ad-free & mobile-friendly.",
  keywords: [
    "unit converter",
    "unit conversion",
    "convert units",
    "online unit converter",
    "length converter",
    "mass converter",
    "volume converter",
    "temperature converter",
    "pressure converter",
    "area converter",
    "speed converter",
    "power converter",
    "energy converter",
    "force converter",
    "frequency converter",
    "density converter",
    "time converter",
    "data converter",
    "viscosity converter",
    "magnetic flux converter",
    "magnetic field converter",
    "capacitance converter",
    "conductance converter",
    "resistance converter",
    "voltage converter",
    "luminous flux converter",
    "illumination converter",
    "flow rate converter",
    "acceleration converter",
    "engineering tools",
    "scientific calculator",
    "physics constants",
    "unit conversion table",
    "metric converter",
    "imperial to metric",
    "SI units",
    "conversion chart",
  ],
  alternates: {
    canonical: "https://converter.online",
  },
  openGraph: {
    type: "website",
    url: "https://converter.online",
    siteName: "Converter.online",
    title: "Converter.online – Convert 500+ Units Instantly",
    description:
      "Convert over 500 units of length, mass, volume, pressure and more — fast, reliable & ad-free.",
    locale: "en_US",
    images: [
      {
        url: "https://converter.online/og-image.png",
        width: 1200,
        height: 630,
        alt: "Converter.online – Free Unit Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@converteronline",
    creator: "@converteronline",
    title: "Converter.online – Free Unit Converter",
    description: "Convert over 500 units in one click. Accurate, ad-free & mobile-friendly.",
    images: ["https://converter.online/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-striped text-foreground selection:bg-primary selection:text-primary-foreground">
        <div className="md:min-h-screen antialiased flex md:pt-3">{children}</div>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 1000,
            style: {
              backgroundColor: "var(--custom-card",
              boxShadow: "var(--shadow)",
              borderRadius: "calc(var(--radius) + 4px)",
              borderStyle: "var(--tw-border-style)",
              borderWidth: "1px",
              borderColor: "var(--border)",
            },
          }}
          expand={false}
          richColors
        />
      </body>
    </html>
  );
}
