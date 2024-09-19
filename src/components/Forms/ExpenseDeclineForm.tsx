'use client'
import { useContext, useEffect, useState } from 'react'
import styles from './forms.module.css'
import { BasicExpenseType, ExpenseType } from '@/types/expenseType'
import UserCardSimple from '@/components/UserCard/UserCardSimple'
import { BasicUser, User } from '@/types/user'
import { Item } from '@/types/item'
import { GlobalStateContext } from '../context/context'
import { fetcher, postExpense } from '@/utils/fetcher'
import { createToast } from '@/utils/createToast'
import useSWR from 'swr'

type ExpenseFormProps = {
    abort: () => void
    expense: ExpenseType
}
type Response = {
    data: User[]
}

const keyboardShortcuts = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']

export default function ExpenseDeclineForm(props: ExpenseFormProps) {
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
            mutate(postExpense(dataSent, props.expense?.id), {
                optimisticData: props.expense
                    ? [data].map((p: any) => (p.id === props.expense!.id ? dataUI : p))
                    : [data, dataUI],
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
                <form onSubmit={handleFormSubmit} className={`w700px-desktop ${styles.popupform} ${styles.wideform} `}>
                    <div>
                        <div className={'middleinside m16topdown'}>
                            <h2>Elutasítás részletezése</h2>
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
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <h6>Dátum</h6>
                                            <input
                                                name="date"
                                                type="date"
                                                disabled
                                                defaultValue={props.expense ? props.expense.date : currentDate}
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
                                        <h6 className={'m16topdown'}>Tételek</h6>
                                        <div className={styles.itemtablecontainer}>
                                            <table className={styles.itemtable}>
                                                <tbody>
                                                    <tr>
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
                                                                        disabled
                                                                        placeholder={'Tétel neve'}
                                                                    />
                                                                    <div>/</div>
                                                                    <input
                                                                        className={'searchinput right podkova'}
                                                                        type={'number'}
                                                                        disabled
                                                                        defaultValue={item.price}
                                                                        placeholder={'Ára'}
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
                                                                            }}>
                                                                            <div className={'flex-row-space-between'}>
                                                                                <input
                                                                                    type={'number'}
                                                                                    value={
                                                                                        item.participations.find(
                                                                                            (p) => p.userId === user.id,
                                                                                        )?.amount
                                                                                    }
                                                                                    disabled
                                                                                    className={'right podkova'}
                                                                                />{' '}
                                                                                <span className={styles.currencytext}>
                                                                                    Ft
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    ) : (
                                                                        <div className={styles.checkbigbox}></div>
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
                        <input className="sbtn_with_h4" type="submit" value="Véglegesítés" />
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
