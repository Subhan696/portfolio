import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";
import Navbar from "@/components/layout/navbar";
import { IntroGateway } from "@/components/effects/intro-gateway";
import { SoundEqualizer } from "@/components/effects/sound-equalizer";
import Footer from "@/components/layout/footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
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
    creator: "@your_handle",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#121212",
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
      <body className={`${dmSans.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="mx-auto max-w-xl px-6 lg:px-0 py-10 lg:py-16">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
          <IntroGateway />
          <SoundEqualizer />
          <Toaster
            position="bottom-right"
            theme="dark"
            toastOptions={{
              style: {
                background: "#1a1a1a",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#ffffff",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
