import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import './globals.css'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TravelEase - Booking Management Portal',
  description: 'Manage your travel agency bookings with ease. Create and manage trip templates, customer bookings, and more.',
  keywords: 'travel, booking, management, templates, customers, trips',
  authors: [{ name: 'TravelEase Team' }],
  openGraph: {
    title: 'TravelEase - Booking Management Portal',
    description: 'Manage your travel agency bookings with ease. Create and manage trip templates, customer bookings, and more.',
    url: 'https://travelease.com',
    siteName: 'TravelEase',
    images: [
      {
        url: 'https://travelease.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TravelEase - Booking Management Portal',
    description: 'Manage your travel agency bookings with ease. Create and manage trip templates, customer bookings, and more.',
    images: ['https://travelease.com/twitter-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow px-4 sm:px-6 lg:px-8">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

