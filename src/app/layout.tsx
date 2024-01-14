import Header from '@/components/Header/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { UserProvider } from '@auth0/nextjs-auth0/client'

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
            <UserProvider>
                <body className={inter.className}>
                    <Header />
                    {children}
                </body>
            </UserProvider>
        </html>
    )
}
