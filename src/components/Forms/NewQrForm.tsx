'use client'
import axios from 'axios'
import styles from './forms.module.css'
import { User } from '@/types/user'
import { QrType } from '@/types/qr'
import { Simulate } from 'react-dom/test-utils'
import abort = Simulate.abort
import { useUser } from '@auth0/nextjs-auth0/client'
import { useContext } from 'react'
import { GlobalStateContext } from '@/components/context/context'

type QrFormProps = {
    qr?: QrType
    abort: () => void
    refresh: () => void
}
type Response = {
    data: User[]
}
export default function NewQrForm(props: QrFormProps) {
    const userId = useContext(GlobalStateContext).ownUser.id
    const handleFormSubmit = async (event: any) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const name = formData.get('name') ?? ''
        const amountValue: FormDataEntryValue | null = formData.get('amount')
        let amount = 0
        if (amountValue !== null && typeof amountValue === 'string') {
            const intValue: number = parseInt(amountValue)
            if (!isNaN(intValue)) {
                amount = intValue
            }
        }
        const data = {
            payToId: userId,
            title: name,
            amount,
        }
        if (props.qr) {
            await axios.patch(process.env.NEXT_PUBLIC_BASE_URL + '/qr/' + props.qr.id, data)
        } else {
            await axios.post(process.env.NEXT_PUBLIC_BASE_URL + '/qr', data)
        }
        props.abort()
        props.refresh()
    }
    const validateDate = (event: any) => {
        if (new Date(event.target.value) > new Date()) {
            ;(event.target as HTMLInputElement).setCustomValidity('Really bro?')
        }
    }
    return (
        <div
            className={styles.popup}
            onClick={(event) => {
                if (event.target === event.currentTarget) props.abort()
            }}>
            <form onSubmit={handleFormSubmit} className={`w500px-desktop ${styles.popupform} hunset`}>
                <div className={'middleinside m16topdown'}>
                    <h2>Új QR létrehozása</h2>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <h6>Név</h6>
                                <input
                                    name="name"
                                    type="text"
                                    defaultValue={props.qr ? props.qr.title : ''}
                                    className={'inter'}
                                />
                            </td>
                            <td>
                                <h6>Összeg</h6>
                                <div className={'left'}>
                                    <input
                                        name="amount"
                                        type="number"
                                        className={'right podkova w80'}
                                        min={50}
                                        max={1_000_000}
                                        required
                                        defaultValue={props.qr ? props.qr.amount : ''}
                                        //onInvalid={e => (e.target as HTMLInputElement).setCustomValidity("Csak 50Ft és 1000000Ft közti érték lehet")}
                                    />
                                    <span className={styles.currencytext}>Ft</span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div>
                    <input className="sbtn_with_h4" type="submit" value="Mentés" />
                    <button
                        className="sbtn"
                        onClick={() => {
                            props.abort()
                        }}>
                        <h4>Mégse</h4>
                    </button>
                </div>
            </form>
        </div>
    )
}
