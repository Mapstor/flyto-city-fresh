import { Inter } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'FlyTo.city - Find Cheap Flights to Any City',
  description: 'Search and compare flights to 1000+ destinations worldwide',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <Script src="https://emrldtp.cc/NDUxMTU0.js?t=451154" strategy="afterInteractive" />
        {children}
      </body>
    </html>
  )
}
