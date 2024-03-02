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
import NewQrForm from '@/components/Forms/NewQrForm'

const inter = Inter({ subsets: ['latin'] })

/*export const metadata: Metadata = {
    title: 'Lepedo',
    description: 'Lepedo',
}*/

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [shortcutsPopUpRevealed, setShortcutsPopUpRevealed] = useState(false)
    const [SIMexpenseFormRevealed, setSIMExpenseFormRevealed] = useState(false)
    const [ADVexpenseFormRevealed, setADVExpenseFormRevealed] = useState(false)
    const [tranfserFormRevealed, setTranfserFormRevealed] = useState(false)
    const [qrFormRevealed, setqrFormRevealed] = useState(false)

    const anyFormRevealed = SIMexpenseFormRevealed || ADVexpenseFormRevealed || tranfserFormRevealed || qrFormRevealed

    useKeyboardShortcut(['e'], () => {
        if (!anyFormRevealed) setSIMExpenseFormRevealed(true)
    })
    useKeyboardShortcut(['r'], () => {
        if (!anyFormRevealed) setADVExpenseFormRevealed(true)
    })
    useKeyboardShortcut(['t'], () => {
        if (!anyFormRevealed) setTranfserFormRevealed(true)
    })

    useKeyboardShortcut(['q'], () => {
        if (!anyFormRevealed) setqrFormRevealed(true)
    })

    useKeyboardShortcut(['esc'], () => {
        setTranfserFormRevealed(false)
        setSIMExpenseFormRevealed(false)
        setADVExpenseFormRevealed(false)
        setqrFormRevealed(false)
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
                        {qrFormRevealed && (
                            <NewQrForm
                                abort={() => {
                                    setqrFormRevealed(false)
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
