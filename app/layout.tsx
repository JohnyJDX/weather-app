import { ThemeProvider } from '@/providers/theme-provider'
import type { Metadata } from 'next'
import Header from '../components/header'
import './globals.css'
import { Grandstander } from 'next/font/google'
import TanstackProvider from '@/providers/tanstack-provider'
import { DotPatternLinearGradient } from '@/components/dot-pattern-linear-gradient'

const grandstander = Grandstander({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--font-grandstander',
})

export const metadata: Metadata = {
  title: 'Weather',
  description: 'Weather app',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`flex min-h-screen flex-col antialiased ${grandstander.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TanstackProvider>
            <DotPatternLinearGradient>
              <Header />
              <main className="container mx-auto flex flex-1 flex-col">
                {children}
              </main>
            </DotPatternLinearGradient>
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
