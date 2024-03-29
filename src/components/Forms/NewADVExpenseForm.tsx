'use client'
import { useContext, useState } from 'react'
import styles from './forms.module.css'
import { ExpenseType } from '@/types/expenseType'
import UserCardSimple from '@/components/UserCard/UserCardSimple'
import { BasicUser, User } from '@/types/user'
import { Item } from '@/types/item'
import { GlobalStateContext } from '../context/context'
import { useKeyboardShortcut } from '../../../hooks/useKeyboardShorcut'
import KeyCap from '@/components/KeyCap/KeyCap'
import { Simulate } from 'react-dom/test-utils'
import { Participation, ParticipationStatus } from '@/types/participation'
import input = Simulate.input

type ExpenseFormProps = {
    abort: () => void
    refresh: () => void
    expense?: ExpenseType
}
type Response = {
    data: User[]
}

const keyboardShortcuts = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']

export default function NewExpenseForm(props: ExpenseFormProps) {
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
        if (selectedItem !== -1 && index !== undefined && index > -1) {
            updateItemParticipation(items[selectedItem].id, selectedUsers[index])
        }
    })

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
            return newItems
        })
    }

    const updateItemParticipation = (itemId: string, user: BasicUser) => {
        setItems((prevItems) => {
            const index = prevItems.findIndex((item) => item.id === itemId)
            if (index !== -1) {
                const updatedItems = [...prevItems]
                const item = { ...updatedItems[index] }
                const userParticipationIndex = item.participations.findIndex((p) => p.userId === user.id)
                if (userParticipationIndex !== -1) {
                    // User participation exists, remove it
                    item.participations.splice(userParticipationIndex, 1)
                } else {
                    // Add user participation
                    item.participations.push({
                        userId: user.id,
                        amount: 0,
                        status: ParticipationStatus.NONE,
                    })
                }
                // Update participation amounts
                const participationCount = item.participations.length
                item.participations.forEach((participation) => {
                    participation.amount = Math.round(item.price / participationCount)
                })
                updatedItems[index] = item
                return updatedItems
            }
            return prevItems
        })
    }

    return (
        <div
            className={styles.popup}
            onClick={(event) => {
                if (event.target === event.currentTarget) props.abort()
            }}>
            {users ? (
                <form onSubmit={handleFormSubmit} className={`w700px-desktop ${styles.popupform} `}>
                    <div>
                        <div className={'middleinside m16topdown'}>
                            <h2>Új számla hozzáadása</h2>
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
                                            <input
                                                disabled
                                                name="amount"
                                                type="number"
                                                className={'right podkova w90'}
                                                defaultValue={props.expense ? props.expense.amount : ''}
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
                                                        user.name
                                                            .toLowerCase()
                                                            .includes(searchPhraseForAll.toLowerCase()),
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
                                <tr>
                                    <td colSpan={2}>
                                        <h6 className={'w100 left'}>
                                            Tételek{' '}
                                            <button type={'button'} onClick={addItem}>
                                                Új tétel
                                            </button>
                                        </h6>
                                        <div className={'w100 left m8top'}></div>
                                        <div className={styles.itemtablecontainer}>
                                            <table className={styles.itemtable}>
                                                <tbody>
                                                    <tr>
                                                        <td className={'w200px-desktop'}>
                                                            {/*                                                        <button
                                                            className={'sbtn nomargin p48 w100'}
                                                            type={'button'}
                                                            onClick={addItem}>
                                                            +
                                                        </button>*/}
                                                        </td>
                                                        {selectedUsers.map((user, _index) => (
                                                            <td key={user.id}>
                                                                <div className={'m4'}>
                                                                    {/*<KeyCap keya={'Ctrl'} />*/}
                                                                    <KeyCap
                                                                        keya={keyboardShortcuts[_index].toUpperCase()}
                                                                    />
                                                                    <UserCardSimple
                                                                        name={user.name}
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
                                                            <td className={'p8right'}>
                                                                <div className={'flex-row-space-between'}>
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
                                                                <td key={user.id}>
                                                                    <label htmlFor={user.id + '/' + item.id}>
                                                                        <input
                                                                            id={user.id + '/' + item.id}
                                                                            type="checkbox"
                                                                            name="participated"
                                                                            className={'w20px'}
                                                                            checked={item.participations.some(
                                                                                (p) => p.userId === user.id,
                                                                            )}
                                                                            onChange={() =>
                                                                                updateItemParticipation(item.id, user)
                                                                            }
                                                                            style={{ accentColor: user.color }}
                                                                        />

                                                                        {item.participations.some(
                                                                            (p) => p.userId === user.id,
                                                                        ) ? (
                                                                            <input
                                                                                type={'number'}
                                                                                value={
                                                                                    item.participations.find(
                                                                                        (p) => p.userId === user.id,
                                                                                    )?.amount
                                                                                }
                                                                                onChange={(e) => {
                                                                                    const newValue = parseInt(
                                                                                        e.target.value,
                                                                                    )
                                                                                    if (!isNaN(newValue)) {
                                                                                        // Update the amount in state
                                                                                        const updatedItems = [...items]
                                                                                        const itemIndex =
                                                                                            updatedItems.findIndex(
                                                                                                (i) => i.id === item.id,
                                                                                            )
                                                                                        if (itemIndex !== -1) {
                                                                                            updatedItems[
                                                                                                itemIndex
                                                                                            ].participations.find(
                                                                                                (p) =>
                                                                                                    p.userId ===
                                                                                                    user.id,
                                                                                            )!.amount = newValue
                                                                                            setItems(updatedItems)
                                                                                        }
                                                                                    }
                                                                                }}
                                                                                contentEditable={true}
                                                                                className={
                                                                                    'searchinput w60px right podkova'
                                                                                }
                                                                            />
                                                                        ) : (
                                                                            <div className={'w60px inline-block'}></div>
                                                                        )}
                                                                    </label>
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
