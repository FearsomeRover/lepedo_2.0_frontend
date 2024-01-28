'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import UserCard from '@/components/UserCard/UserCard'
import styles from './forms.module.css'
import { ExpenseType } from '@/types/expense'
import Image from 'next/image'
import UserCardSimple from '@/components/UserCard/UserCardSimple'

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
    const [users, setUsers] = useState<User[] | null>()
    const [selectedUsers, setSelectedUsers] = useState<User[]>([])
    const getAllUsers = async () => {
        const response: Response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/user')
        setUsers(response.data)
    }
    const [searchPhrase, setSearchPhrase] = useState<string>('')

    useEffect(() => {
        getAllUsers()
    }, [])
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
            await axios.patch(process.env.NEXT_PUBLIC_BASE_URL + '/expense/' + props.expense.id, data)
        } else {
            await axios.post(process.env.NEXT_PUBLIC_BASE_URL + '/expense', data)
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
                <form onSubmit={handleFormSubmit} className={styles.expenseform}>
                    <h3>Új kiadás hozzáadása</h3>
                    <h5>Név</h5>
                    <input
                        name='name'
                        defaultValue={props.expense ? props.expense.title : ''}
                        minLength={3}
                        maxLength={15}
                        required
                    />
                    <h5>Dátum</h5>
                    <input
                        name='date'
                        type='date'
                        defaultValue={props.expense ? props.expense.date : currentDate}
                        onChange={validateDate}
                        onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('Csak 50Ft és 1000000Ft közti érték lehet')}
                    />
                    <h5>Összeg</h5>
                    <input
                        name='amount'
                        type='number'
                        defaultValue={props.expense ? props.expense.amount : ''}
                        min={50}
                        max={1_000_000}
                        //required
                        //onInvalid={e => (e.target as HTMLInputElement).setCustomValidity("Csak 50Ft és 1000000Ft közti érték lehet")}
                    />
                    <h5>Résztvevők</h5>
                    <input
                        className={"w50 right searchinput"}
                        type='text'
                        placeholder='Keresés...'
                        onChange={s => setSearchPhrase(s.target.value)}
                    />
                    <div className={styles.userbucket} title={"Válaszd ki a költésben résztvevőket!"}>
                        {users.filter(user => (user.name.toLowerCase().includes(searchPhrase.toLowerCase()))).map(user => (
                            <UserCardSimple name={user.name}
                                            color={user.color}
                                            revTag={user.revTag}
                                            isSelected={selectedUsers.includes(user)}
                                            onClick={() => {
                                                setSelectedUsers((prevSelectedUsers) => prevSelectedUsers.includes(user) ? prevSelectedUsers.filter(u => u !== user) : [...prevSelectedUsers, user])
                                            }}
                                            key={user.id}
                            />
                        ))}
                    </div>

                    <h5>Leosztás</h5>
                    <div className={styles.userarea}>
                        <div className={styles.payed}>
                            <h5 className={styles.userareatitle}>Fizetett</h5>
                            {selectedUsers.map(user => (
                                <label className={styles.radiolabel} key={user.id}>
                                    <input
                                        type='radio'
                                        id={user.id}
                                        value={user.id}
                                        className='radio'
                                        name='payed'
                                        defaultChecked={props.expense?.payerId === user.id}
                                    />
                                    <UserCard user={user} key={user.id} />
                                </label>
                            ))}
                        </div>
                        <div className={styles.imageContainer}>
                            <Image className={styles.arrow} src='/images/arrow-right.svg' alt='arrow-right'
                                   fill></Image>
                        </div>
                        <div className={styles.payedto}>
                            <h5 className={styles.userareatitle}>Részvett</h5>
                            {selectedUsers.map(user => (
                                <label className={styles.checklabel} key={user.id}>
                                    <UserCard user={user} key={user.id} />
                                    <input
                                        type='checkbox'
                                        id={user.id}
                                        value={user.id}
                                        className='radio'
                                        name='payedto'
                                        defaultChecked={props.expense ? props.expense?.received.some(curruser => curruser.id === user.id) : true}
                                        //onInvalid={e => (e.target as HTMLInputElement).setCustomValidity('És akkor ezt most kinek írjam be?')}
                                    />
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <input className='sbtn_with_h4' type='submit' value='Mentés' />
                        <button
                            className='sbtn'
                            onClick={() => {
                                props.abort()
                            }}
                        >
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
