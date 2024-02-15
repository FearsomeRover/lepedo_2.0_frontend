'use client'
import axios from 'axios'
import { useContext, useState } from 'react'
import styles from './forms.module.css'
import { ExpenseType } from '@/types/expense'
import Image from 'next/image'
import UserCardSimple from '@/components/UserCard/UserCardSimple'
import { BasicUser, User } from '@/types/user'
import { GlobalStateContext } from '../context/context'

type ExpenseFormProps = {
    abort: () => void
    refresh: () => void
    expense?: ExpenseType
}
type Response = {
    data: User[]
}
export default function NewExpenseForm(props: ExpenseFormProps) {
    const currentDate = new Date().toISOString().split('T')[0]
    const [selectedUsers, setSelectedUsers] = useState<BasicUser[]>([])
    const [searchPhrase, setSearchPhrase] = useState<string>('')
    const { users } = useContext(GlobalStateContext)

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
            title: formData.get('name'),
            payerId: formData.get('payed'),
            amount,
            received: formData.getAll('payedto'),
            date: formData.get('date'),
        }
        if (props.expense) {
            await axios.patch(
                process.env.NEXT_PUBLIC_BASE_URL +
                    '/expense/' +
                    props.expense.id,
                data,
            )
        } else {
            await axios.post(
                process.env.NEXT_PUBLIC_BASE_URL + '/expense',
                data,
            )
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
        <div className={styles.popup}>
            {users ? (
                <form
                    onSubmit={handleFormSubmit}
                    className={styles.expenseform}>
                    <h2>Új kiadás hozzáadása</h2>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <h6>Név</h6>
                                    <input
                                        name="name"
                                        defaultValue={
                                            props.expense
                                                ? props.expense.title
                                                : ''
                                        }
                                        minLength={3}
                                        maxLength={15}
                                        required
                                    />
                                </td>
                                <td>
                                    <h6>Dátum</h6>
                                    <input
                                        name="date"
                                        type="date"
                                        defaultValue={
                                            props.expense
                                                ? props.expense.date
                                                : currentDate
                                        }
                                        onChange={validateDate}
                                        onInvalid={(e) =>
                                            (
                                                e.target as HTMLInputElement
                                            ).setCustomValidity(
                                                'Normális dátumot írj be!',
                                            )
                                        }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <div className={'w50 middleself'}>
                                        <h6>Összeg</h6>
                                        <input
                                            name="amount"
                                            type="number"
                                            className={'right podkova w90'}
                                            defaultValue={
                                                props.expense
                                                    ? props.expense.amount
                                                    : ''
                                            }
                                            min={50}
                                            max={1_000_000}
                                            required
                                            onInvalid={(e) =>
                                                (
                                                    e.target as HTMLInputElement
                                                ).setCustomValidity(
                                                    'Csak 50Ft és 1000000Ft közti érték lehet',
                                                )
                                            }
                                        />
                                        <span className={styles.currencytext}>
                                            Ft
                                        </span>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <details>
                                        <summary className={'left'}>
                                            <h6 className={'inline-block'}>
                                                Ismeretlen résztvevők
                                            </h6>
                                        </summary>
                                        <input
                                            className={'w50 right searchinput'}
                                            type="text"
                                            placeholder="Keresés..."
                                            onChange={(s) =>
                                                setSearchPhrase(s.target.value)
                                            }
                                        />
                                        <div className={styles.userbucket}>
                                            {users
                                                .filter((user) =>
                                                    user.name
                                                        .toLowerCase()
                                                        .includes(
                                                            searchPhrase.toLowerCase(),
                                                        ),
                                                )
                                                .map((user) => (
                                                    <UserCardSimple
                                                        name={user.name}
                                                        color={user.color}
                                                        revTag={user.revTag}
                                                        isSelected={selectedUsers.includes(
                                                            user,
                                                        )}
                                                        isHoverable={false}
                                                        onClick={() => {
                                                            setSelectedUsers(
                                                                (
                                                                    prevSelectedUsers,
                                                                ) =>
                                                                    prevSelectedUsers.includes(
                                                                        user,
                                                                    )
                                                                        ? prevSelectedUsers.filter(
                                                                              (
                                                                                  u,
                                                                              ) =>
                                                                                  u !==
                                                                                  user,
                                                                          )
                                                                        : [
                                                                              ...prevSelectedUsers,
                                                                              user,
                                                                          ],
                                                            )
                                                        }}
                                                        key={user.id}
                                                    />
                                                ))}
                                        </div>
                                    </details>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <h6 className={'w100 left'}>Leosztás</h6>
                                    <div className={styles.userarea}>
                                        <div className={styles.payed}>
                                            <h6
                                                className={
                                                    styles.userareatitle
                                                }>
                                                Fizetett
                                            </h6>
                                            {selectedUsers.map((user) => (
                                                <label
                                                    className={
                                                        styles.radiolabel
                                                    }
                                                    key={user.id}>
                                                    <input
                                                        type="radio"
                                                        id={user.id}
                                                        value={user.id}
                                                        className="radio"
                                                        name="payed"
                                                        defaultChecked={
                                                            props.expense
                                                                ?.payerId ===
                                                            user.id
                                                        }
                                                    />
                                                    <UserCardSimple
                                                        name={user.name}
                                                        color={user.color}
                                                        onClick={() => {}}
                                                        revTag={user.revTag}
                                                        key={user.id}
                                                    />
                                                </label>
                                            ))}
                                        </div>
                                        <div className={'imageContainer'}>
                                            <Image
                                                className={'arrow'}
                                                src="/images/arrow-right.svg"
                                                alt="arrow-right"
                                                fill></Image>
                                        </div>
                                        <div className={styles.payedto}>
                                            <h6
                                                className={
                                                    styles.userareatitle
                                                }>
                                                Részvett
                                            </h6>
                                            {selectedUsers.map((user) => (
                                                <label
                                                    className={
                                                        styles.checklabel
                                                    }
                                                    key={user.id}>
                                                    <UserCardSimple
                                                        name={user.name}
                                                        color={user.color}
                                                        onClick={() => {}}
                                                        revTag={user.revTag}
                                                        key={user.id}
                                                    />
                                                    <input
                                                        type="checkbox"
                                                        id={user.id}
                                                        value={user.id}
                                                        className="radio"
                                                        name="payedto"
                                                        defaultChecked={
                                                            props.expense
                                                                ? props.expense?.received.some(
                                                                      (
                                                                          curruser,
                                                                      ) =>
                                                                          curruser.id ===
                                                                          user.id,
                                                                  )
                                                                : true
                                                        }
                                                        //onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('És akkor ezt most kinek írjam be?')}
                                                    />
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div>
                        <input
                            className="sbtn_with_h4"
                            type="submit"
                            value="Mentés"
                        />
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
