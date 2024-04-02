'use client'
import axios from 'axios'
import styles from './forms.module.css'
import { User } from '@/types/user'
import { QrType } from '@/types/qr'
import { useContext } from 'react'
import { GlobalStateContext } from '@/components/context/context'
import { useUser } from '@auth0/nextjs-auth0/client'

type QrFormProps = {
    qr?: QrType
    abort: () => void
    refresh: (Qr: QrType) => void
}
type Response = {
    data: User[]
}
export default function NewQrForm(props: QrFormProps) {
    const user = useUser()
    const userId = useContext(GlobalStateContext).ownUser.id

    if (userId === null) return null
    const handleFormSubmit = async (event: any) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const name = formData.get('name')?.toString() ?? ''
        const amountValue: FormDataEntryValue | null = formData.get('amount')
        let amount = 0
        if (amountValue !== null && typeof amountValue === 'string') {
            const intValue: number = parseInt(amountValue)
            if (!isNaN(intValue)) {
                amount = intValue
            }
        }

        const dataSent = {
            payToId: userId,
            title: name,
            amount,
        }
        const dataUI: QrType = {
            id: props.qr ? props.qr.id : '',
            payTo: {
                id: userId,
                color: 'red',
                revTag: 'Te',
                name: 'Te',
            },
            title: name,
            amount: amount,
        }

        if (props.qr) {
            await axios.patch(process.env.NEXT_PUBLIC_BASE_URL + '/qr/' + props.qr.id, dataSent)
        } else {
            await axios.post(process.env.NEXT_PUBLIC_BASE_URL + '/qr', dataSent, {
                headers: {
                    Authorization: `Bearer ${user.user?.sub}`, // Assumes sub contains the JWT token
                },
            })
        }

        props.abort()
        props.refresh(dataUI)
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
