'use client'
import Header from '@/components/Header/Header'
import './globals.css'
import { Inter } from 'next/font/google'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import React, { useState } from 'react'
import { useKeyboardShortcut } from '../../hooks/useKeyboardShorcut'
import NewExpenseForm from '@/components/Forms/NewExpenseForm'
import NewTransferForm from '@/components/Forms/NewTransferForm'
import ShortcutsPopUp from '@/components/Forms/shortcutsPopUp'
import GlobalContext from '@/components/context/context'

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
    const [shortcutsPopUpRevealed, setShortcutsPopUpRevealed] = useState(false)
    const [expenseFormRevealed, setExpenseFormRevealed] = useState(false)
    const [tranfserFormRevealed, setTranfserFormRevealed] = useState(false)

    useKeyboardShortcut(['e'], () => {
        if (tranfserFormRevealed == false) setExpenseFormRevealed(true)
    })
    useKeyboardShortcut(['t'], () => {
        if (expenseFormRevealed == false) setTranfserFormRevealed(true)
    })

    useKeyboardShortcut(['esc'], () => {
        setTranfserFormRevealed(false)
        setExpenseFormRevealed(false)
    })

    return (
        <html lang="hu">
            <UserProvider>
                <GlobalContext>
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
                        {shortcutsPopUpRevealed && <ShortcutsPopUp />}
                        {children}
                    </body>
                </GlobalContext>
            </UserProvider>
        </html>
    )
}
