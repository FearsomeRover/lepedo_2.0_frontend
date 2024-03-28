import styles from './action.module.css'
import React, { useState } from 'react'
import NewSMPExpenseForm from '@/components/Forms/NewSMPExpenseForm'
import NewADVExpenseForm from '@/components/Forms/NewADVExpenseForm'
import NewTransferForm from '@/components/Forms/NewTransferForm'
import NewQrForm from '@/components/Forms/NewQrForm'
import { useKeyboardShortcut } from '../../../hooks/useKeyboardShorcut'

type QuickActionButtonProps = {
    revealed?: boolean[]
    refreshes?: (() => void)[]
    isVertical?: boolean
}

export default function QuickActionButtons(props: QuickActionButtonProps) {
    const [SMPExpensePopup, setSMPExpensePopup] = useState(false)
    const [ADVExpensePopup, setADVExpensePopup] = useState(false)
    const [transferPopup, setTransferPopup] = useState(false)
    const [qrPopup, setqrPopup] = useState(false)

    const anyFormRevealed = SMPExpensePopup || ADVExpensePopup || transferPopup || qrPopup

    useKeyboardShortcut(['e'], () => {
        if (!anyFormRevealed) setSMPExpensePopup(true)
    })
    useKeyboardShortcut(['r'], () => {
        if (!anyFormRevealed) setADVExpensePopup(true)
    })
    useKeyboardShortcut(['t'], () => {
        if (!anyFormRevealed) setTransferPopup(true)
    })

    useKeyboardShortcut(['q'], () => {
        if (!anyFormRevealed) setqrPopup(true)
    })

    useKeyboardShortcut(['esc'], () => {
        setTransferPopup(false)
        setSMPExpensePopup(false)
        setADVExpensePopup(false)
        setqrPopup(false)
    })

    const refresh = () => {}

    return (
        <>
            <div className={styles.quickactions}>
                {(!props.revealed || props.revealed[0]) && (
                    <button
                        className="sbtn"
                        onClick={() => {
                            setSMPExpensePopup(true)
                        }}>
                        Új tétel felvétele
                    </button>
                )}

                {(!props.revealed || props.revealed[1]) && (
                    <button
                        className="sbtn"
                        onClick={() => {
                            setADVExpensePopup(true)
                        }}>
                        Új számla felvétele [haladó]
                    </button>
                )}

                {(!props.revealed || props.revealed[2]) && (
                    <button
                        className="sbtn"
                        onClick={() => {
                            setTransferPopup(true)
                        }}>
                        Új utalás rögzítése
                    </button>
                )}

                {(!props.revealed || props.revealed[3]) && (
                    <button className="sbtn" onClick={() => {}}>
                        Új QR kód generálása
                    </button>
                )}
            </div>

            {/*form components*/}
            {SMPExpensePopup && (
                <NewSMPExpenseForm
                    abort={() => setSMPExpensePopup(false)}
                    refresh={props.refreshes ? props.refreshes[0] : refresh}
                />
            )}

            {ADVExpensePopup && <NewADVExpenseForm abort={() => setADVExpensePopup(false)} refresh={refresh} />}

            {transferPopup && <NewTransferForm abort={() => setTransferPopup(false)} refresh={refresh} />}

            {qrPopup && (
                <NewQrForm
                    abort={() => {
                        setqrPopup(false)
                    }}
                    refresh={() => {}}
                />
            )}
        </>
    )
}
