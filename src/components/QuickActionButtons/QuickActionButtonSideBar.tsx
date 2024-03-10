import styles from './action.module.css'
import { useState } from 'react'
import NewSMPExpenseForm from '@/components/Forms/NewSMPExpenseForm'
import NewADVExpenseForm from '@/components/Forms/NewADVExpenseForm'
import NewTransferForm from '@/components/Forms/NewTransferForm'

type QuickActionButtonProps = {
    revealed?: boolean[]
    refreshes?: (() => void)[]
}

export default function QuickActionButtonSideBar(props: QuickActionButtonProps) {
    const [SMPExpensePopup, setSMPExpensePopup] = useState(false)
    const [ADVExpensePopup, setADVExpensePopup] = useState(false)
    const [transferPopup, setTransferPopup] = useState(false)
    const [qrPopUp, setQrPopUp] = useState(false)

    const refresh = () => {}

    return (
        <>
            <div className={styles.quickactionssidebar}>
                {(!props.revealed || props.revealed[0]) && (
                    <>
                        <button
                            className="sbtn"
                            onClick={() => {
                                setSMPExpensePopup(true)
                            }}>
                            + Új tétel
                        </button>
                    </>
                )}

                {(!props.revealed || props.revealed[1]) && (
                    <button
                        className="sbtn m8"
                        onClick={() => {
                            setADVExpensePopup(true)
                        }}>
                        + Új számla
                    </button>
                )}

                {(!props.revealed || props.revealed[2]) && (
                    <button
                        className="sbtn m8"
                        onClick={() => {
                            setTransferPopup(true)
                        }}>
                        + Új utalás
                    </button>
                )}

                {(!props.revealed || props.revealed[3]) && (
                    <button className="sbtn m8" onClick={() => {}}>
                        + Új QR kód
                    </button>
                )}
            </div>

            {SMPExpensePopup && (
                <NewSMPExpenseForm
                    abort={() => setSMPExpensePopup(false)}
                    refresh={props.refreshes ? props.refreshes[0] : refresh}
                />
            )}

            {ADVExpensePopup && <NewADVExpenseForm abort={() => setADVExpensePopup(false)} refresh={refresh} />}

            {transferPopup && <NewTransferForm abort={() => setTransferPopup(false)} refresh={refresh} />}
        </>
    )
}
