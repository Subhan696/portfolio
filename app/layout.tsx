import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ScrollProgress from "@/components/effects/scroll-progress";
import ParticleField from "@/components/effects/particle-field";
import { SoundEqualizer } from "@/components/effects/sound-equalizer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.title}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#08090D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${jetbrainsMono.variable} font-sans min-h-screen bg-[#08090D] text-white antialiased selection:bg-sky-500/30 selection:text-sky-200`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* Scroll Progress Indicator Effect */}
          <ScrollProgress />

          {/* Dynamic Ambient Particle Background */}
          <ParticleField />

          {/* Ambient Top Light Beam */}
          <div className="pointer-events-none fixed inset-x-0 -top-40 z-0 h-96 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.08),transparent_70%)]" />

          {/* Main Content Container with comfortable reading width */}
          <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8 py-4 sm:py-6 min-h-screen flex flex-col justify-between">
            <div>
              <Navbar />
              <main>{children}</main>
            </div>
            <Footer />
          </div>

          <SoundEqualizer />

          <Toaster
            position="bottom-right"
            theme="dark"
            toastOptions={{
              style: {
                background: "#0E1320",
                border: "1px solid rgba(56,189,248,0.2)",
                color: "#F8FAFC",
                fontFamily: "var(--font-mono), monospace",
                fontSize: "12px",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
