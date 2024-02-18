'use client'
import { useContext, useState } from 'react'
import styles from './forms.module.css'
import { ExpenseType } from '@/types/expense'
import UserCardSimple from '@/components/UserCard/UserCardSimple'
import { BasicUser, User } from '@/types/user'
import { Item } from '@/types/item'
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
    const [searchPhraseForFriends, setSearchPhraseForFriends] = useState<string>('')
    const [searchPhraseForAll, setSearchPhraseForAll] = useState<string>('')
    const { users } = useContext(GlobalStateContext)
    const [items, setItems] = useState<Item[]>([])

    const handleFormSubmit = async (event: any) => {
        event.preventDefault()
        /*const formData = new FormData(event.target)
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
        props.refresh()*/
    }
    const validateDate = (event: any) => {
        /*        if (new Date(event.target.value) > new Date()) {
            ;(event.target as HTMLInputElement).setCustomValidity('Really bro?')
        }*/
    }

    const addItem = () => {
        setItems((prevItems) => [
            ...prevItems,
            {
                id: (items.length + 1).toString(),
                name: '',
                price: 0,
                participated: [],
            },
        ])
    }

    const updateItem = (id: string, name: string, price: number, participated: BasicUser[]) => {
        setItems((prevItems) => {
            const newItems = prevItems.map((item) => {
                if (item.id === id) {
                    return {
                        id,
                        name,
                        price,
                        participated,
                    }
                }
                return item
            })
            return newItems
        })
    }

    return (
        <div className={styles.popup}>
            {users ? (
                <form onSubmit={handleFormSubmit} className={styles.expenseform}>
                    <h2>Új számla hozzáadása</h2>
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
                                            (e.target as HTMLInputElement).setCustomValidity('Normális dátumot írj be!')
                                        }
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <div className={'w50-desktop middleself'}>
                                        <h6>Összeg</h6>
                                        <input
                                            disabled
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
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    <details open={true}>
                                        <summary className={'left'}>
                                            <h6 className={'inline-block'}>Barátok hozzáadása</h6>
                                        </summary>
                                        <input
                                            className={'w50-desktop floatright right     searchinput'}
                                            type="text"
                                            placeholder="Keresés..."
                                            onChange={(s) => setSearchPhraseForFriends(s.target.value)}
                                        />
                                        <div className={styles.userbucket}>
                                            {users
                                                .filter((user) =>
                                                    user.name
                                                        .toLowerCase()
                                                        .includes(searchPhraseForFriends.toLowerCase()),
                                                )
                                                .map((user) => (
                                                    <div key={user.id} className={'inline-block m4top m4right'}>
                                                        <UserCardSimple
                                                            name={user.name}
                                                            color={user.color}
                                                            revTag={user.revTag}
                                                            isSelected={selectedUsers.includes(user)}
                                                            onClick={() => {
                                                                setSelectedUsers((prevSelectedUsers) =>
                                                                    prevSelectedUsers.includes(user)
                                                                        ? prevSelectedUsers.filter((u) => u !== user)
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
                                            onChange={(s) => setSearchPhraseForAll(s.target.value)}
                                        />
                                        <div className={styles.userbucket}>
                                            {users
                                                .filter((user) =>
                                                    user.name.toLowerCase().includes(searchPhraseForAll.toLowerCase()),
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
                                                                        ? prevSelectedUsers.filter((u) => u !== user)
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
                            <tr>
                                <td colSpan={2}>
                                    <h6 className={'w100 left'}>Tételek</h6>
                                    <table className={styles.itemtable}>
                                        <tbody>
                                            <tr>
                                                <th className={'minw300'}>Tételek</th>
                                                {selectedUsers.map((user) => (
                                                    <th key={user.id}>
                                                        <UserCardSimple
                                                            name={user.name}
                                                            color={user.color}
                                                            onClick={() => {}}
                                                        />
                                                    </th>
                                                ))}
                                            </tr>
                                            {items.map((item) => (
                                                <tr key={item.id}>
                                                    <td>
                                                        <div className={'flex-row-space-between'}>
                                                            <input
                                                                className={'searchinput m8right'}
                                                                defaultValue={item.name}
                                                                onBlur={(n) =>
                                                                    updateItem(
                                                                        item.id,
                                                                        n.target.value,
                                                                        item.price,
                                                                        item.participated,
                                                                    )
                                                                }
                                                            />
                                                            <input
                                                                className={'searchinput'}
                                                                type={'number'}
                                                                defaultValue={item.name}
                                                                onBlur={(n) =>
                                                                    updateItem(
                                                                        item.id,
                                                                        item.name,
                                                                        n.target.valueAsNumber,
                                                                        item.participated,
                                                                    )
                                                                }
                                                            />
                                                            <p className={'currencytext'}> Ft</p>
                                                        </div>
                                                    </td>
                                                    {selectedUsers.map((user) => (
                                                        <td key={user.id}>
                                                            <input
                                                                type="checkbox"
                                                                name="participated"
                                                                style={{ accentColor: user.color }}
                                                            />
                                                        </td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className={'w100 left m8top'}>
                                        <button className={'sbtn nomargin p48'} type={'button'} onClick={addItem}>
                                            +
                                        </button>
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
            ) : (
                <p>loading</p>
            )}
        </div>
    )
}
