import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import { AutoScroll } from '@/components/AutoScroll'
import { Navbar } from '@/components/Navbar'
import { SmoothScroll } from '@/components/SmoothScroll'
import { IntroGateway } from '@/components/effects/intro-gateway'
import { SoundEqualizer } from '@/components/effects/sound-equalizer'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const signifier = localFont({
  src: [
    {
      path: '../fonts/signifier-regular.otf',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Subhan Kashif',
  description: 'Personal portfolio of Subhan Kashif — AI Engineer & Full Stack Developer',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${signifier.variable} font-sans antialiased bg-white dark:bg-black text-black dark:text-white`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {/* Let's Go Interactive Intro Gateway */}
          <IntroGateway />

          <div className="selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black">
            <SmoothScroll />
            <AutoScroll />
            <div className="w-full md:w-[50%] min-h-screen flex flex-col p-6 lg:p-12 relative mx-auto">
              <Navbar />
              {children}
            </div>
          </div>

          {/* Sound Equalizer and Audio Player */}
          <SoundEqualizer />
        </ThemeProvider>
      </body>
    </html>
  )
}
