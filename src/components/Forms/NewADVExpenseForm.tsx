'use client'
import { useContext, useState } from 'react'
import styles from './forms.module.css'
import { BasicExpenseType, ExpenseType } from '@/types/expenseType'
import UserCardSimple from '@/components/UserCard/UserCardSimple'
import { BasicUser, User } from '@/types/user'
import { Item } from '@/types/item'
import { GlobalStateContext } from '../context/context'
import { useKeyboardShortcut } from '../../../hooks/useKeyboardShorcut'
import { Participation, ParticipationStatus } from '@/types/participation'
import axios from 'axios'
import UserPlayground from '@/components/playrounds/UserPlayground'

type ExpenseFormProps = {
    abort: () => void
    refresh: (Expense: BasicExpenseType) => void
    expense?: ExpenseType
}
type Response = {
    data: User[]
}

const keyboardShortcuts = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']

export default function NewADVExpenseForm(props: ExpenseFormProps) {
    const currentDate = new Date().toISOString().split('T')[0]
    const [selectedUsers, setSelectedUsers] = useState<BasicUser[]>([])
    const [searchPhraseForFriends, setSearchPhraseForFriends] = useState<string>('')
    const [searchPhraseForAll, setSearchPhraseForAll] = useState<string>('')
    const { users } = useContext(GlobalStateContext)
    const [items, setItems] = useState<Item[]>([
        {
            id: '0',
            name: '',
            price: 0,
            participations: [],
        },
    ])
    const [selectedItem, setSelectedItem] = useState<number>(-1)

    useKeyboardShortcut(['ctrl', 'arrowdown'], () => {
        setSelectedItem((selectedItem + 1) % items.length)
    })
    useKeyboardShortcut(['ctrl', 'arrowup'], () => {
        setSelectedItem((selectedItem + items.length - 1) % items.length)
    })
    /*    useEffect(() => {
        if (selectedItem !== -1) {
            const tableRow = document.getElementById(`${selectedItem}`)
            if (tableRow) {
                const inputField = tableRow.querySelector('input[type="text"]') as HTMLInputElement | null
                if (inputField) {
                    inputField.focus()
                }
            }
        }
    }, [selectedItem])*/

    useKeyboardShortcut(keyboardShortcuts, (index) => {
        if (selectedItem !== -1 && index !== undefined && index > -1 && selectedUsers[index] !== undefined) {
            toggleParticipation(items[selectedItem], selectedUsers[index])
        }
    })

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
    }
    const validateDate = (event: any) => {}

    const addItem = () => {
        setItems((prevItems) => [
            ...prevItems,
            {
                id: (items.length + 1).toString(),
                name: '',
                price: 0,
                participations: [],
            },
        ])
    }

    const updateItem = (id: string, name: string, price: number, participations: Participation[]) => {
        setItems((prevItems) => {
            const newItems = prevItems.map((item) => {
                if (item.id === id) {
                    return {
                        id,
                        name,
                        price,
                        participations,
                    }
                }
                return item
            })
            console.log('update> ', newItems)
            return newItems
        })
    }

    const updateParticipation = (editedItem: Item, user: BasicUser, amount: number) => {
        setItems((prevItems) => {
            const newItems = prevItems.map((item) => {
                if (item.id === editedItem.id) {
                    const newParticipations = item.participations.map((p) => {
                        if (p.userId === user.id) {
                            return {
                                userId: user.id,
                                amount,
                                status: ParticipationStatus.NONE,
                            }
                        }
                        return p
                    })
                    return {
                        ...item,
                        participations: newParticipations, // Update the participations array
                    }
                }
                return item
            })
            return newItems
        })
        console.log('updateParticipation> ', editedItem.participations)
    }

    const recalculateParticipationAmounts = (item: Item) => {
        const updatedParticipations = item.participations.slice()
        const manualAmounts = updatedParticipations.some(
            (p) => p.updatedManually !== undefined && p.updatedManually > 0,
        )
        if (manualAmounts) {
            const amountRemaining = item.price - updatedParticipations.reduce((acc, p) => acc + p.amount, 0)
            let leastPrio: Participation = updatedParticipations[0]
            leastPrio.updatedManually = 0
            updatedParticipations.forEach((p) => {
                if (
                    p.updatedManually === undefined ||
                    leastPrio.updatedManually === undefined ||
                    p.updatedManually > leastPrio.updatedManually
                ) {
                    leastPrio = p
                }
            })
            leastPrio.amount += amountRemaining
        } else {
            //update all prices
            updatedParticipations.map((p) => {
                p.amount = Math.round(item.price / updatedParticipations.length)
            })
        }

        return updatedParticipations
    }

    const toggleParticipation = (item: Item, user: BasicUser) => {
        const updatedParticipations = item.participations.slice()
        const participationIndex = updatedParticipations.findIndex((p) => p.userId === user.id)

        //if torles
        if (participationIndex !== -1) {
            updatedParticipations.splice(participationIndex, 1)
        } else {
            updatedParticipations.push({
                userId: user.id,
                amount: 0,
                status: ParticipationStatus.NONE,
            })
        }
        updateItem(item.id, item.name, item.price, recalculateParticipationAmounts(item))
    }

    return (
        <div
            className={styles.popup}
            onClick={(event) => {
                if (event.target === event.currentTarget) props.abort()
            }}>
            {users ? (
                <form onSubmit={handleFormSubmit} className={`w700px-desktop ${styles.popupform} ${styles.wideform} `}>
                    <div>
                        <div className={'middleinside m16topdown'}>
                            <h2>Új számla hozzáadása</h2>
                        </div>
                        <div className={'h3'}></div>
                        <table>
                            <tbody>
                                <tr>
                                    <td className={'flex-row-space-between gap8 flex1-inside'}>
                                        <div>
                                            <h6>Név</h6>
                                            <input
                                                name="name"
                                                defaultValue={props.expense ? props.expense.title : ''}
                                                minLength={3}
                                                maxLength={15}
                                                required
                                            />
                                        </div>
                                        <div>
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
                                        </div>
                                        <div>
                                            <h6>Összeg</h6>
                                            <div className={'flex-row-space-between'}>
                                                <input
                                                    disabled
                                                    name="amount"
                                                    type="amount"
                                                    className={'right podkova w90'}
                                                    defaultValue={props.expense ? props.expense.amount : 0}
                                                    min={50}
                                                    max={1_000_000}
                                                    placeholder={'számított mező'}
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
                                <div className={'h3'}></div>
                                <tr>
                                    <td>
                                        <details open={true}>
                                            <summary className={'left'}>
                                                <h6 className={'inline-block'}>Barátok hozzáadása</h6>
                                            </summary>
                                            <UserPlayground
                                                selectedUsers={selectedUsers}
                                                users={users}
                                                onClickCallback={(user) =>
                                                    setSelectedUsers((prevSelectedUsers) =>
                                                        prevSelectedUsers.includes(user)
                                                            ? prevSelectedUsers.filter((u) => u !== user)
                                                            : [...prevSelectedUsers, user],
                                                    )
                                                }
                                            />
                                        </details>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <details>
                                            <summary className={'left'}>
                                                <h6 className={'inline-block'}>Ismeretlen résztvevők hozzáadása</h6>
                                            </summary>
                                            <UserPlayground
                                                selectedUsers={selectedUsers}
                                                users={users}
                                                onClickCallback={(user) =>
                                                    setSelectedUsers((prevSelectedUsers) =>
                                                        prevSelectedUsers.includes(user)
                                                            ? prevSelectedUsers.filter((u) => u !== user)
                                                            : [...prevSelectedUsers, user],
                                                    )
                                                }
                                            />
                                        </details>
                                    </td>
                                </tr>
                                <div className={'h3'}></div>
                                <tr>
                                    <td>
                                        <h6 className={'m16topdown'}>Tételek</h6>
                                        <div className={styles.itemtablecontainer}>
                                            <table className={styles.itemtable}>
                                                <tbody>
                                                    <tr>
                                                        <td className={'w200px-desktop'}>
                                                            <button
                                                                className={'sbtn nomargin p48 w100 nomargin'}
                                                                type={'button'}
                                                                onClick={addItem}>
                                                                + Tétel
                                                            </button>
                                                        </td>
                                                        {selectedUsers.map((user, _index) => (
                                                            <td key={user.id} className={'wfitcontent'}>
                                                                <div className={'m4 inline-block overflow-hidden'}>
                                                                    <UserCardSimple
                                                                        name={
                                                                            user.name.length > 12
                                                                                ? user.name.slice(0, 9) + '...'
                                                                                : user.name
                                                                        }
                                                                        color={user.color}
                                                                        onClick={() => {}}
                                                                    />
                                                                </div>
                                                            </td>
                                                        ))}
                                                    </tr>
                                                    {items.map((item, _index) => (
                                                        <tr
                                                            key={item.id}
                                                            id={_index.toString()}
                                                            className={selectedItem === _index ? 'highlight' : ''}>
                                                            <td className={'w200px inline-block'}>
                                                                <div className={'flex-row-space-between m8right'}>
                                                                    <input
                                                                        type={'text'}
                                                                        className={'searchinput left m8right'}
                                                                        defaultValue={item.name}
                                                                        placeholder={'Tétel neve'}
                                                                        onBlur={(n) =>
                                                                            updateItem(
                                                                                item.id,
                                                                                n.target.value,
                                                                                item.price,
                                                                                item.participations,
                                                                            )
                                                                        }
                                                                    />
                                                                    <div>/</div>
                                                                    <input
                                                                        className={'searchinput right podkova'}
                                                                        type={'number'}
                                                                        defaultValue={item.name}
                                                                        placeholder={'Ára'}
                                                                        onBlur={(n) =>
                                                                            updateItem(
                                                                                item.id,
                                                                                item.name,
                                                                                n.target.valueAsNumber,
                                                                                item.participations,
                                                                            )
                                                                        }
                                                                    />
                                                                    <p className={'currencytext'}> Ft</p>
                                                                </div>
                                                            </td>
                                                            {selectedUsers.map((user) => (
                                                                <td key={user.id} className={''}>
                                                                    {item.participations.some(
                                                                        (p) => p.userId === user.id,
                                                                    ) ? (
                                                                        <div
                                                                            className={styles.checkbigboxselected}
                                                                            onClick={() =>
                                                                                toggleParticipation(item, user)
                                                                            }>
                                                                            <div className={'flex-row-space-between'}>
                                                                                <input
                                                                                    type={'number'}
                                                                                    value={
                                                                                        item.participations.find(
                                                                                            (p) => p.userId === user.id,
                                                                                        )?.amount
                                                                                    }
                                                                                    onClick={(e) => e.stopPropagation()}
                                                                                    onChange={(e) => {
                                                                                        const newValue = parseInt(
                                                                                            e.target.value,
                                                                                        )
                                                                                        if (isNaN(newValue)) return
                                                                                        updateParticipation(
                                                                                            item,
                                                                                            user,
                                                                                            newValue,
                                                                                        )
                                                                                    }}
                                                                                    contentEditable={true}
                                                                                    className={'right podkova'}
                                                                                />{' '}
                                                                                <span className={styles.currencytext}>
                                                                                    Ft
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div
                                                                            className={styles.checkbigbox}
                                                                            onClick={() =>
                                                                                toggleParticipation(item, user)
                                                                            }></div>
                                                                    )}
                                                                </td>
                                                            ))}
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
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
