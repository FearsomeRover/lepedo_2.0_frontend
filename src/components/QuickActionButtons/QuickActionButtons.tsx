import styles from './action.module.css'
import { useState } from 'react'
import NewSMPExpenseForm from '@/components/Forms/NewSMPExpenseForm'
import NewTransferForm from '@/components/Forms/NewTransferForm'

type QuickActionButtonProps = {
    revealed?: boolean[]
}

export default function QuickActionButtons(props: QuickActionButtonProps) {
    const [expensePopup, setExpensePopup] = useState(false)
    const [transferPopup, setTransferPopup] = useState(false)

    const refresh = () => {}

    return (
        <>
            <div className={styles.actionrow}>
                {(!props.revealed || props.revealed[0]) && (
                    <button
                        className="sbtn"
                        onClick={() => {
                            setExpensePopup(true)
                        }}>
                        Új tétel felvétele
                    </button>
                )}

                {(!props.revealed || props.revealed[1]) && (
                    <button className="sbtn" onClick={() => {}}>
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

            {expensePopup && (
                <NewSMPExpenseForm
                    abort={() => setExpensePopup(false)}
                    refresh={refresh}
                />
            )}

            {transferPopup && (
                <NewTransferForm
                    abort={() => setTransferPopup(false)}
                    refresh={refresh}
                />
            )}
        </>
    )
}
