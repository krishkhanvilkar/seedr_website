import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { RequestAccessProvider } from '@/components/request-access-dialog'
import './globals.css'

export const metadata: Metadata = {
  title: 'Seedr — Execution Favors the Verified',
  description:
    'Seedr is a closed, Proof-of-Work network where elite technical operators, product visionaries, and capital converge. Private beta now active.',
  generator: 'v0.app',
  icons: {
    icon: '/favicon19.png',
    apple: '/favicon19.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark bg-black ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="antialiased">
        <RequestAccessProvider>{children}</RequestAccessProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
