'use client'
import axios from 'axios'
import { useContext } from 'react'
import styles from './forms.module.css'
import { TransferType } from '@/types/transferType'
import Image from 'next/image'
import { User } from '@/types/user'
import { GlobalStateContext } from '../context/context'
import UserCardSimple from '@/components/UserCard/UserCardSimple'

type TransferFormProps = {
    transfer?: TransferType
    abort: () => void
    refresh: (Transfer: TransferType) => void
}
type Response = {
    data: User[]
}
export default function NewTransferForm(props: TransferFormProps) {
    const currentDate = new Date().toISOString().split('T')[0]
    const { users } = useContext(GlobalStateContext)
    const handleFormSubmit = async (event: any) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const name = formData.get('name') ?? ''
        const amountValue: FormDataEntryValue | null = formData.get('amount')
        const title = formData.get('comment') ?? ''
        let amount = 0
        if (amountValue !== null && typeof amountValue === 'string') {
            const intValue: number = parseInt(amountValue)
            if (!isNaN(intValue)) {
                amount = intValue
            }
        }
        const data = {
            amount,
            title,
            userFromId: formData.get('payed'),
            userToId: formData.get('payedto'),
            date: formData.get('date'),
        }
        if (props.transfer) {
            await axios.patch(process.env.NEXT_PUBLIC_BASE_URL + '/transfer/' + props.transfer.id, data)
        } else {
            await axios.post(process.env.NEXT_PUBLIC_BASE_URL + '/transfer', data)
        }
        props.abort()
        //props.refresh()
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
            {users ? (
                <form onSubmit={handleFormSubmit} className={`w500px-desktop ${styles.popupform}`}>
                    <div>
                        <div className={'middleinside m16topdown'}>
                            <h2>Új utalás hozzáadása</h2>
                        </div>
                        <table>
                            <tbody>
                                <tr>
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
                                                defaultValue={props.transfer ? props.transfer.amount : ''}
                                                //onInvalid={e => (e.target as HTMLInputElement).setCustomValidity("Csak 50Ft és 1000000Ft közti érték lehet")}
                                            />
                                            <span className={styles.currencytext}>Ft</span>
                                        </div>
                                    </td>
                                    <td>
                                        <h6>Dátum</h6>
                                        <input
                                            name="date"
                                            type="date"
                                            defaultValue={props.transfer ? props.transfer.date : currentDate}
                                            onChange={validateDate}
                                            onInvalid={(e) =>
                                                (e.target as HTMLInputElement).setCustomValidity(
                                                    'Csak 50Ft és 1000000Ft közti érték lehet',
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <h6>Komment</h6>
                                        <input
                                            name="comment"
                                            type="text"
                                            defaultValue={props.transfer ? props.transfer.title : ''}
                                            className={'inter'}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className={styles.userarea}>
                            <div className={styles.payed}>
                                <h6 className={'m8'}>Utaló</h6>
                                {users.map((user) => (
                                    <label className={styles.radiolabel} key={user.id}>
                                        <input
                                            type="radio"
                                            id={user.id}
                                            value={user.id}
                                            className="radio"
                                            name="payed"
                                            defaultChecked={props.transfer?.userFrom.id === user.id}
                                            //onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('És akkor ezt most kinek írjam be?')}
                                        />
                                        <div className={'m4left'}>
                                            <UserCardSimple name={user.name} color={user.color} key={user.id} />
                                        </div>
                                    </label>
                                ))}
                            </div>
                            <div className={'imageContainer'}>
                                <Image className={'arrow'} src="/images/arrow-right.svg" alt="arrow-right" fill></Image>
                            </div>
                            <div className={styles.payedto}>
                                <h6 className={'m8 right'}>Kedvezményezett</h6>
                                {users.map((user) => (
                                    <label className={styles.checklabel} key={user.id}>
                                        <UserCardSimple name={user.name} color={user.color} key={user.id} />
                                        <input
                                            type="radio"
                                            id={user.id}
                                            value={user.id}
                                            className="radio"
                                            name="payedto"
                                            defaultChecked={props.transfer?.userFrom.id === user.id}
                                            //onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('És akkor ezt most kinek írjam be?')}
                                        />
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
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
            ) : (
                <p>loading</p>
            )}
        </div>
    )
}
