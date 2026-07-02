import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const display = Space_Grotesk({ variable: '--font-display', subsets: ['latin'] })
const body = Plus_Jakarta_Sans({ variable: '--font-body', subsets: ['latin'] })
const mono = JetBrains_Mono({ variable: '--font-jetbrains-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ali — Full Stack Developer',
  description: 'Portfolio of Ali, a full-stack developer building fast, reliable web products with Next.js, React and Tailwind CSS.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f6f7fb',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} bg-background`}
    >
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link rel="preconnect" href="https://cdn.simpleicons.org" />
      </head>
      <body className="font-sans antialiased bg-background" suppressHydrationWarning>
        {/* Sitewide ambient background — fixed, always animating, sits behind
           every section purely by DOM order (it's the very first thing painted,
           with no z-index — normal content painted after it sits on top). */}
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="drift-a absolute -top-32 -left-24 h-[36rem] w-[36rem] rounded-full bg-primary/30 blur-[90px]" />
          <div className="drift-b absolute top-1/4 -right-32 h-[30rem] w-[30rem] rounded-full bg-accent/25 blur-[80px]" />
          <div className="drift-c absolute bottom-0 left-1/3 h-[32rem] w-[32rem] rounded-full bg-blue-500/20 blur-[90px]" />
          <div className="drift-b absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-primary/25 blur-[70px]" />
        </div>

        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}