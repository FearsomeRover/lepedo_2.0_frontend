import Header from '@/components/Header/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Head } from 'next/document'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lepedo',
  description: 'Lepedo', 
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        </body>
    </html>
  )
}
