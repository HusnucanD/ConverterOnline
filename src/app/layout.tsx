import type { Metadata } from "next";
import { Toaster } from "sonner";
import "@/app/globals.css";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return {
    title: {
      default: "Converter Online – Free Unit Converter",
      template: "%s | Converter.online",
    },
    description:
      "Convert over 500 units of length, mass, volume, pressure and more in one click. Fast, free & accurate",
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
    openGraph: {
      type: "website",
      url: "https://converter.online",
      siteName: "Converter Online",
      title: "Converter Online – Convert 500+ Units Instantly",
      description:
        "Convert over 500 units of length, mass, volume, pressure and more in one click. Fast, free & accurate",
      locale: "en_US",
      images: [
        {
          url: "https://converter.online/logo.svg",
          width: 1200,
          height: 1200,
          alt: "Converter Online – Free Unit Converter",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@converteronline",
      creator: "@converteronline",
      title: "Converter Online – Free Unit Converter",
      description:
        "Convert over 500 units of length, mass, volume, pressure and more in one click. Fast, free & accurate",
      images: ["https://converter.online/logo.svg"],
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        nocache: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico",
    },
    alternates: {
      canonical: `/blog/${params.slug}`,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://converter.online"),
    manifest: "/site.webmanifest",
  };
}

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
              backgroundColor: "var(--custom-card)",
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
