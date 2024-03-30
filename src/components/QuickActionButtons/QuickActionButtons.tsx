import styles from './action.module.css'
import React, { useState } from 'react'
import NewSMPExpenseForm from '@/components/Forms/NewSMPExpenseForm'
import NewADVExpenseForm from '@/components/Forms/NewADVExpenseForm'
import NewTransferForm from '@/components/Forms/NewTransferForm'
import NewQrForm from '@/components/Forms/NewQrForm'
import { useKeyboardShortcut } from '../../../hooks/useKeyboardShorcut'
import { QrType } from '@/types/qr'
import { BasicExpenseType } from '@/types/expenseType'
import { TransferType } from '@/types/transferType'

type QuickActionButtonProps = {
    revealed?: boolean[]
    SMPExpenseRefresh?: (Expense: BasicExpenseType) => void
    ADVExpenseRefresh?: (Expense: BasicExpenseType) => void
    TransferRefresh?: (Transfer: TransferType) => void
    QrRefresh?: (Qr: QrType) => void
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
            <div className={props.isVertical ? styles.quickactionssidebar : styles.quickactions}>
                {(!props.revealed || props.revealed[0]) && (
                    <button
                        className="sbtn"
                        onClick={() => {
                            setSMPExpensePopup(true)
                        }}>
                        + Új tétel
                    </button>
                )}

                {(!props.revealed || props.revealed[1]) && (
                    <button
                        className="sbtn"
                        onClick={() => {
                            setADVExpensePopup(true)
                        }}>
                        + Új számla
                    </button>
                )}

                {(!props.revealed || props.revealed[2]) && (
                    <button
                        className="sbtn"
                        onClick={() => {
                            setTransferPopup(true)
                        }}>
                        + Új utalás
                    </button>
                )}

                {(!props.revealed || props.revealed[3]) && (
                    <button
                        className="sbtn"
                        onClick={() => {
                            setqrPopup(true)
                        }}>
                        + Új QR kód
                    </button>
                )}
            </div>

            {/*form components*/}
            {SMPExpensePopup && (
                <NewSMPExpenseForm
                    abort={() => setSMPExpensePopup(false)}
                    refresh={props.SMPExpenseRefresh ? props.SMPExpenseRefresh : refresh}
                />
            )}

            {ADVExpensePopup && (
                <NewADVExpenseForm
                    abort={() => setADVExpensePopup(false)}
                    refresh={props.ADVExpenseRefresh ? props.ADVExpenseRefresh : refresh}
                />
            )}

            {transferPopup && (
                <NewTransferForm
                    abort={() => setTransferPopup(false)}
                    refresh={props.TransferRefresh ? props.TransferRefresh : refresh}
                />
            )}

            {qrPopup && (
                <NewQrForm
                    abort={() => {
                        setqrPopup(false)
                    }}
                    refresh={props.QrRefresh ? props.QrRefresh : refresh}
                />
            )}
        </>
    )
}
