import Header from '@/components/Header/Header'
import './globals.css'
import { Inter } from 'next/font/google'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import React from 'react'
import GlobalContext from '@/components/context/context'

const inter = Inter({ subsets: ['latin'] })

/*export const metadata: Metadata = {
    title: 'Lepedo',
    description: 'Lepedo',
}*/

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="hu">
            <UserProvider>
                <GlobalContext>
                    {/*<SWRConfig
                        value={{ fetcher: (resource, init) => axios.get(resource, init).then((res) => res.data) }}>*/}
                    <body className={inter.className}>
                        <Header />
                        {children}
                    </body>
                    {/*</SWRConfig>*/}
                </GlobalContext>
            </UserProvider>
        </html>
    )
}
