'use client'
import { useContext, useState } from 'react'
import styles from './forms.module.css'
import { BasicExpenseType, ExpenseType } from '@/types/expenseType'
import Image from 'next/image'
import UserCardSimple from '@/components/UserCard/UserCardSimple'
import { BasicUser, User } from '@/types/user'
import { GlobalStateContext } from '../context/context'
import { Participation, ParticipationStatus } from '@/types/participation'
import { validateDate } from '@/utils/validateDate'
import { fetcher, postExpense } from '@/utils/fetcher'
import useSWR from 'swr'
import { createToast } from '@/utils/createToast'

type ExpenseFormProps = {
    abort: () => void
    expense?: ExpenseType
}
type Response = {
    data: User[]
}
export default function NewSMPExpenseForm(props: ExpenseFormProps) {
    const currentDate = new Date().toISOString().split('T')[0]
    const [selectedUsers, setSelectedUsers] = useState<BasicUser[]>([])
    const [searchPhrase, setSearchPhrase] = useState<string>('')
    const { users } = useContext(GlobalStateContext)

    const { data, mutate } = useSWR(process.env.NEXT_PUBLIC_BASE_URL + '/expense', fetcher)

    function extractFormData(formData: FormData) {
        const amountValue: FormDataEntryValue | null = formData.get('amount')
        let amount: number = 0
        if (amountValue !== null && typeof amountValue === 'string') {
            const intValue: number = parseInt(amountValue)
            if (!isNaN(intValue)) {
                amount = intValue
            }
        }
        const participants: Participation[] = []
        selectedUsers.forEach((user) => {
            participants.push({
                userId: user.id,
                amount: amount / selectedUsers.length,
                status: ParticipationStatus.NONE,
            })
        })
        console.log(participants)

        const dataSent = {
            items: [
                {
                    price: amount,
                    name: formData.get('name')?.toString() ?? 'nincs név',
                    participants: participants,
                },
            ],
            title: formData.get('name')?.toString() ?? 'nincs név',
            amount: amount,
            payerId: formData.get('payed'),
            date: formData.get('date')?.toString() ?? '1970-01-01',
        }
        return dataSent
    }

    const handleFormSubmit = async (event: any) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const dataSent = extractFormData(formData)

        const dataUI: BasicExpenseType = {
            id: 'NA',
            title: dataSent.title,
            amount: dataSent.amount,
            date: dataSent.date,
            payer: users.filter((user) => user.id === dataSent.payerId)[0],
            received: selectedUsers,
            items: [],
            final: false,
            optimisticPending: true,
        }
        for (let i = 0; i < dataSent.items.length; i++) {
            dataUI.items.push({
                id: 'NA',
                name: dataSent.items[i].name ?? 'nincs név',
                price: dataSent.items[i].price,
                participated: selectedUsers,
            })
        }

        try {
            mutate(postExpense(dataSent, props.expense?.id), {
                optimisticData: props.expense
                    ? [data].map((p: any) => (p.id === props.expense!.id ? dataUI : p))
                    : [...data, dataUI],
                rollbackOnError: true,
                revalidate: true,
            })
            createToast('Költség sikeresen hozzáadva', true)
        } catch (e) {
            createToast('Nem sikerült elmenteni a költést', false)
        }

        props.abort()
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
                            <h2>Új kiadás hozzáadása</h2>
                        </div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <h6>Név</h6>
                                        <input
                                            name="name"
                                            defaultValue={props.expense ? props.expense.title : ''}
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
                                            defaultValue={props.expense ? props.expense.date : currentDate}
                                            onChange={validateDate}
                                            onInvalid={(e) =>
                                                (e.target as HTMLInputElement).setCustomValidity(
                                                    'Normális dátumot írj be!',
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <div className={'w50-desktop middleself'}>
                                            <h6>Összeg</h6>
                                            <div className={'flex-row-space-between'}>
                                                <input
                                                    name="amount"
                                                    type="number"
                                                    className={'right podkova w90'}
                                                    defaultValue={props.expense ? props.expense.amount : ''}
                                                    min={50}
                                                    max={1_000_000}
                                                    required
                                                    onInvalid={(e) =>
                                                        (e.target as HTMLInputElement).setCustomValidity(
                                                            'Csak 50Ft és 1000000Ft közti érték lehet',
                                                        )
                                                    }
                                                />
                                                <span className={styles.currencytext}>Ft</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={2}>
                                        <h6 className={'w100 left'}>Leosztás</h6>
                                        <div className={styles.userarea}>
                                            <div className={styles.payed}>
                                                <h6 className={styles.userareatitle}>Fizetett</h6>
                                                {selectedUsers.map((user) => (
                                                    <label className={styles.radiolabel} key={user.id}>
                                                        <input
                                                            type="radio"
                                                            id={user.id}
                                                            value={user.id}
                                                            className="radio"
                                                            name="payed"
                                                            defaultChecked={props.expense?.payer.id === user.id}
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
                                                <h6 className={styles.userareatitle}>Részvett</h6>
                                                {selectedUsers.map((user) => (
                                                    <label className={styles.checklabel} key={user.id}>
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
                                                                    ? props.expense?.items[0].participations.some(
                                                                          (participation) =>
                                                                              participation.userId === user.id,
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
                                <tr>
                                    <td colSpan={2}>
                                        <details>
                                            <summary className={'left'}>
                                                <h6 className={'inline-block'}>Ismeretlen résztvevők hozzáadása</h6>
                                            </summary>
                                            <input
                                                className={'w50-desktop floatright right searchinput'}
                                                type="text"
                                                placeholder="Keresés..."
                                                onChange={(s) => setSearchPhrase(s.target.value)}
                                            />
                                            <div className={styles.userbucket}>
                                                {users
                                                    .filter((user) =>
                                                        user.name.toLowerCase().includes(searchPhrase.toLowerCase()),
                                                    )
                                                    .map((user) => (
                                                        <div key={user.id} className={'inline-block m4top m4right'}>
                                                            <UserCardSimple
                                                                name={user.name}
                                                                color={user.color}
                                                                revTag={user.revTag}
                                                                isSelected={selectedUsers.includes(user)}
                                                                isHoverable={false}
                                                                onClick={() => {
                                                                    setSelectedUsers((prevSelectedUsers) =>
                                                                        prevSelectedUsers.includes(user)
                                                                            ? prevSelectedUsers.filter(
                                                                                  (u) => u !== user,
                                                                              )
                                                                            : [...prevSelectedUsers, user],
                                                                    )
                                                                }}
                                                            />
                                                        </div>
                                                    ))}
                                            </div>
                                        </details>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <input className="sbtn" type="submit" value="Mentés" />
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
