'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ExpenseType } from '@/types/expense'
import ExpenseCard from '@/components/ExpenseCard/ExpenseCard'
import QuickActionButtons from '@/components/QuickActionButtons/QuickActionButtons'
import { BasicUser } from '@/types/user'
import { Item } from '@/types/item'

const dummyUser: BasicUser = {
    id: 'sdfffa',
    revTag: 'rte',
    name: 'Test User',
    color: '#123456',
}
const dummyUser2: BasicUser = {
    id: 'sdsdaafada',
    revTag: 'rtdfe',
    name: 'Test User2',
    color: '#51af2d',
}
const dummyUser3: BasicUser = {
    id: 'sdffwwsda',
    revTag: 'rxte',
    name: 'Test User3',
    color: '#c013a4',
}

const dummyItem: Item = {
    id: 'asdf',
    name: 'Milk',
    price: 123,
    participated: [dummyUser],
    participations: [],
}

const dummyItem2: Item = {
    id: 'ww',
    name: 'finom kaja',
    price: 123423,
    participated: [dummyUser2, dummyUser3, dummyUser],
    participations: [],
}

const dummyItem3: Item = {
    id: 'wwfds',
    name: 'kakao',
    price: 123423,
    participated: [dummyUser2, dummyUser3, dummyUser],
    participations: [],
}

const dummyItem4: Item = {
    id: 'wwasd',
    name: 'PS5',
    price: 123423,
    participated: [dummyUser3, dummyUser],
    participations: [],
}

const dummyItem5: Item = {
    id: 'wwadfsafsd',
    name: 'Katjes ofc',
    price: 534,
    participated: [dummyUser2, dummyUser],
    participations: [],
}

const dummyItem6: Item = {
    id: 'Valami',
    name: 'Valami random termek',
    price: 123423,
    participated: [dummyUser2, dummyUser3],
    participations: [],
}

const dummyExpense: ExpenseType = {
    id: 'adsf',
    title: 'Shopping',
    amount: 12343,
    payerId: 'asdf',
    date: '2022-10-10',
    received: [dummyUser, dummyUser2, dummyUser3],
    payer: dummyUser,
    items: [dummyItem, dummyItem2, dummyItem3, dummyItem4, dummyItem5, dummyItem6],
}

export default function Page() {
    const [expenses, setExpenses] = useState<ExpenseType[]>([])
    const [filterPhrase, setFilterPhrase] = useState<string>('')

    const handleRefresh = () => {
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/expense')
                if (response.status === 404) {
                    return
                }
                const data = await response.data
            } catch (error: any) {
                console.error('Error fetching data:', error.request.status)
            }
        }

        //fetchData()
        setExpenses([dummyExpense])
    }

    useEffect(() => {
        handleRefresh()
    }, [])

    const filter = (expense: ExpenseType, filterPhrase: string) => {
        if (filterPhrase === '') return true
        if (expense.title.toLowerCase().includes(filterPhrase.toLowerCase())) return true
        if (expense.payer.name.toLowerCase().includes(filterPhrase.toLowerCase())) return true
        if (expense.items.some((item) => item.name.toLowerCase().includes(filterPhrase.toLowerCase()))) return true
        return false
    }

    return (
        <>
            <div className={'h3'}>
                <input
                    className={'w50-desktop floatright right searchinput nomargin'}
                    type="text"
                    placeholder="Keresés..."
                    onChange={(s) => setFilterPhrase(s.target.value)}
                />
            </div>
            <div>
                {expenses.length === 0 && (
                    <>
                        <div className={'h5'}></div>
                        <div className={'middleinside'}>
                            <h3>Még nem veszel részt egyetlen költségben sem</h3>
                            <QuickActionButtons revealed={[true, true, false, false]} />
                        </div>
                    </>
                )}
                {expenses
                    .filter((expense) => filter(expense, filterPhrase))
                    .map((expense, index) => (
                        <ExpenseCard key={index} expense={expense} />
                    ))}
            </div>
        </>
    )
}
