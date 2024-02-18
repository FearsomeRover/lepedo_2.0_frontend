import styles from './action.module.css'
import { useState } from 'react'
import NewSMPExpenseForm from '@/components/Forms/NewSMPExpenseForm'
import NewADVExpenseForm from '@/components/Forms/NewADVExpenseForm'
import NewTransferForm from '@/components/Forms/NewTransferForm'

type QuickActionButtonProps = {
    revealed?: boolean[]
}

export default function QuickActionButtons(props: QuickActionButtonProps) {
    const [SMPExpensePopup, setSMPExpensePopup] = useState(false)
    const [ADVExpensePopup, setADVExpensePopup] = useState(false)
    const [transferPopup, setTransferPopup] = useState(false)

    const refresh = () => {}

    return (
        <>
            <div className={styles.actionrow}>
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

            {SMPExpensePopup && <NewSMPExpenseForm abort={() => setSMPExpensePopup(false)} refresh={refresh} />}

            {ADVExpensePopup && <NewADVExpenseForm abort={() => setADVExpensePopup(false)} refresh={refresh} />}

            {transferPopup && <NewTransferForm abort={() => setTransferPopup(false)} refresh={refresh} />}
        </>
    )
}
