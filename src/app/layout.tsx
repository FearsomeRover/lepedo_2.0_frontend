'use client'
import Header from '@/components/Header/Header'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import React from 'react'
import { DBUserProvider } from './dbUserContext'
import { useKeyboardShortcut } from '../../hooks/useKeyboardShorcut'
import NewExpenseForm from '@/components/Forms/NewExpenseForm'
import NewTransferForm from '@/components/Forms/NewTransferForm'

const inter = Inter({ subsets: ['latin'] })

/*export const metadata: Metadata = {
    title: 'Lepedo',
    description: 'Lepedo',
}*/

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [expenseFormRevealed, setExpenseFormRevealed] = React.useState(false)
    const [tranfserFormRevealed, setTranfserFormRevealed] =
        React.useState(false)
    useKeyboardShortcut(['e'], () => setExpenseFormRevealed(true))
    useKeyboardShortcut(['t'], () => setTranfserFormRevealed(true))

    return (
        <html lang="hu">
            <UserProvider>
                <body className={inter.className}>
                    <Header />
                    {expenseFormRevealed && (
                        <NewExpenseForm
                            abort={() => {
                                setExpenseFormRevealed(false)
                            }}
                            refresh={() => {}}
                        />
                    )}
                    {tranfserFormRevealed && (
                        <NewTransferForm
                            abort={() => {
                                setTranfserFormRevealed(false)
                            }}
                            refresh={() => {}}
                        />
                    )}
                    {children}
                </body>
            </UserProvider>
        </html>
    )
}
