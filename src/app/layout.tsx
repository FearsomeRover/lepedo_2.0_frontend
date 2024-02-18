'use client'
import Header from '@/components/Header/Header'
import './globals.css'
import { Inter } from 'next/font/google'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import React, { useState } from 'react'
import { useKeyboardShortcut } from '../../hooks/useKeyboardShorcut'
import NewSMPExpenseForm from '@/components/Forms/NewSMPExpenseForm'
import NewADVExpenseForm from '@/components/Forms/NewADVExpenseForm'
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
    const [SIMexpenseFormRevealed, setSIMExpenseFormRevealed] = useState(false)
    const [ADVexpenseFormRevealed, setADVExpenseFormRevealed] = useState(false)
    const [tranfserFormRevealed, setTranfserFormRevealed] = useState(false)

    useKeyboardShortcut(['e'], () => {
        if (
            !(
                tranfserFormRevealed ||
                SIMexpenseFormRevealed ||
                ADVexpenseFormRevealed
            )
        )
            setSIMExpenseFormRevealed(true)
    })
    useKeyboardShortcut(['r'], () => {
        if (
            !(
                tranfserFormRevealed ||
                SIMexpenseFormRevealed ||
                ADVexpenseFormRevealed
            )
        )
            setADVExpenseFormRevealed(true)
    })
    useKeyboardShortcut(['t'], () => {
        if (
            !(
                tranfserFormRevealed ||
                SIMexpenseFormRevealed ||
                ADVexpenseFormRevealed
            )
        )
            setTranfserFormRevealed(true)
    })

    useKeyboardShortcut(['esc'], () => {
        setTranfserFormRevealed(false)
        setSIMExpenseFormRevealed(false)
    })

    return (
        <html lang="hu">
            <UserProvider>
                <GlobalContext>
                    <body className={inter.className}>
                        <Header />
                        {SIMexpenseFormRevealed && (
                            <NewSMPExpenseForm
                                abort={() => {
                                    setSIMExpenseFormRevealed(false)
                                }}
                                refresh={() => {}}
                            />
                        )}
                        {ADVexpenseFormRevealed && (
                            <NewADVExpenseForm
                                abort={() => {
                                    setADVExpenseFormRevealed(false)
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
