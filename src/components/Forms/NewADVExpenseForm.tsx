'use client'
import { useContext, useEffect, useState } from 'react'
import styles from './forms.module.css'
import { BasicExpenseType, ExpenseType } from '@/types/expenseType'
import UserCardSimple from '@/components/UserCard/UserCardSimple'
import { BasicUser, User } from '@/types/user'
import { Item } from '@/types/item'
import { GlobalStateContext } from '../context/context'
import { useKeyboardShortcut } from '../../../hooks/useKeyboardShorcut'
import { Participation, ParticipationStatus } from '@/types/participation'
import UserPlayground from '@/components/playrounds/UserPlayground'
import { fetcher, postExpense } from '@/utils/fetcher'
import { createToast } from '@/utils/createToast'
import useSWR from 'swr'

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
    const { data, mutate } = useSWR(process.env.NEXT_PUBLIC_BASE_URL + '/expense', fetcher)

    const currentDate = new Date().toISOString().split('T')[0]
    const [selectedUsers, setSelectedUsers] = useState<BasicUser[]>([])
    const [searchPhraseForFriends, setSearchPhraseForFriends] = useState<string>('')
    const [searchPhraseForAll, setSearchPhraseForAll] = useState<string>('')
    const { users } = useContext(GlobalStateContext)
    const ownUser = useContext(GlobalStateContext).ownUser
    const [calculatedAmount, setCalculatedAmount] = useState<number>(0)
    const [items, setItems] = useState<Item[]>([
        {
            id: '0',
            name: '',
            price: 0,
            participations: [],
        },
    ])
    const [selectedItem, setSelectedItem] = useState<number>(-1)

    useEffect(() => {
        if (props.expense && props.expense.items[0].participations) {
            setSelectedUsers(
                props.expense.items
                    .map((item) => item.participations.map((p) => p.userId))
                    .flat()
                    .map((id) => users.find((u) => u.id === id)!),
            )
            setItems(props.expense.items)
        }
    }, [])

    useKeyboardShortcut(['ctrl', 'arrowdown'], () => {
        setSelectedItem((selectedItem + 1) % items.length)
    })
    useKeyboardShortcut(['ctrl', 'arrowup'], () => {
        setSelectedItem((selectedItem + items.length - 1) % items.length)
    })

    useKeyboardShortcut(keyboardShortcuts, (index) => {
        if (selectedItem !== -1 && index !== undefined && index > -1 && selectedUsers[index] !== undefined) {
            toggleParticipation(items[selectedItem], selectedUsers[index])
        }
    })

    function extractFormData(formData: FormData) {
        const name = formData.get('name') ?? ''
        const amountValue: FormDataEntryValue | null = formData.get('amount')
        let amount = 0
        if (amountValue !== null && typeof amountValue === 'string') {
            const intValue: number = parseInt(amountValue)
            if (!isNaN(intValue)) {
                amount = intValue
            }
        }
        const dataSent = {
            title: formData.get('name')?.toString() ?? 'nincs név',
            payerId: ownUser.id,
            amount: calculatedAmount,
            date: formData.get('date')?.toString() ?? '1970-01-01',
            items: items.map((item) => {
                return {
                    name: item.name,
                    price: item.price,
                    participants: item.participations.map((p) => {
                        return {
                            userId: p.userId,
                            amount: p.amount,
                        }
                    }),
                }
            }),
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
            payer: ownUser,
            items: [],
            received: selectedUsers,
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
            mutate(postExpense(dataSent), {
                optimisticData: props.expense ? [data] : [...data, dataUI],
                rollbackOnError: true,
                revalidate: true,
            })
            createToast('Költség sikeresen hozzáadva', true)
        } catch (e) {
            createToast('Nem sikerült elmenteni a költést', false)
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
                        participations: recalculateParticipationAmounts({ id, name, price, participations }),
                    }
                }
                return item
            })
            return newItems
        })
        setCalculatedAmount(items.reduce((acc, item) => acc + item.price, 0))
    }

    const updateParticipation = (editedItem: Item, user: BasicUser, amount: number) => {
        if (amount > editedItem.price) return
        const newParticipations = editedItem.participations.map((p) => {
            if (p.userId === user.id) {
                return {
                    userId: user.id,
                    amount,
                    status: ParticipationStatus.NONE,
                    updatedManually: 1,
                }
            } else {
                return {
                    userId: p.userId,
                    amount: p.amount,
                    status: p.status,
                    updatedManually: p.updatedManually ? p.updatedManually + 1 : undefined,
                }
            }
        })
        updateItem(editedItem.id, editedItem.name, editedItem.price, newParticipations)
    }

    const recalculateParticipationAmounts = (item: Item) => {
        const updatedParticipations = item.participations.slice()
        const manualAmounts = updatedParticipations.some(
            (p) => p.updatedManually !== undefined && p.updatedManually > 0,
        )
        if (manualAmounts) {
            let leastPrio: Participation[] = []
            let leastPrioValue: number = 0
            updatedParticipations.forEach((p) => {
                if (p.updatedManually === undefined) {
                    leastPrio.push(p)
                }
            })
            if (leastPrio.length === 0) {
                updatedParticipations.forEach((p) => {
                    if (p.updatedManually === leastPrioValue) {
                        leastPrio.push(p)
                    } else if (p.updatedManually! > leastPrioValue) {
                        leastPrio = [p]
                        leastPrioValue = p.updatedManually!
                    }
                })
            }

            let amountRemaining = item.price
            updatedParticipations.map((p) => {
                if (!leastPrio.includes(p)) amountRemaining -= p.amount
            })
            updatedParticipations.map((p) => {
                if (leastPrio.includes(p)) p.amount = Math.round(amountRemaining / leastPrio.length)
            })
        } else {
            updatedParticipations.map((p) => {
                p.amount = Math.round(item.price / updatedParticipations.length)
            })
        }

        return updatedParticipations
    }

    const toggleParticipation = (item: Item, user: BasicUser) => {
        const participationIndex = item.participations.findIndex((p) => p.userId === user.id)

        if (participationIndex !== -1) {
            item.participations.splice(participationIndex, 1)
        } else {
            item.participations.push({
                userId: user.id,
                amount: 0,
                status: ParticipationStatus.NONE,
            })
        }
        updateItem(item.id, item.name, item.price, item.participations)
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
                                                    value={calculatedAmount}
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
                                                                        defaultValue={item.price}
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
                                                                            style={{
                                                                                borderColor: user.color,
                                                                            }}
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
                                                                                        let newValue = 0
                                                                                        if (e.target.value !== '') {
                                                                                            newValue = parseInt(
                                                                                                e.target.value,
                                                                                            )
                                                                                        }
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
