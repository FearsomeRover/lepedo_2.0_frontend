import styles from './action.module.css'
import { useState } from 'react'
import NewExpenseForm from '@/components/Forms/NewExpenseForm'
import NewTransferForm from '@/components/Forms/NewTransferForm'

type QuickActionButtonProps = {}

export default function QuickActionButton(props: QuickActionButtonProps) {
    const [expensePopup, setExpensePopup] = useState(false)
    const [transferPopup, setTransferPopup] = useState(false)

    const refresh = () => {
    }


    return (
        <div className={styles.actionrow}>
            <button
                className='sbtn'
                onClick={() => {
                    setExpensePopup(true)
                }}>
                Új tétel felvétele
            </button>
            {expensePopup &&
                <NewExpenseForm abort={() => setExpensePopup(false)} refresh={refresh} />
            }
            <button
                className='sbtn'
                onClick={() => {
                }}>
                Új számla felvétele [haladó]
            </button>
            <button
                className='sbtn'
                onClick={() => {
                    setTransferPopup(true)
                }}>
                Új utalás rögzítése
            </button>
            {transferPopup &&
                <NewTransferForm abort={() => setTransferPopup(false)} refresh={refresh} />
            }
            <button
                className='sbtn'
                onClick={() => {
                }}>
                Új QR kód generálása
            </button>
        </div>
    )
}