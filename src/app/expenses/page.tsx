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
}

const dummyItem2: Item = {
    id: 'ww',
    name: 'finom kaja',
    price: 123423,
    participated: [dummyUser2, dummyUser3, dummyUser],
}

const dummyItem3: Item = {
    id: 'wwfds',
    name: 'kakao',
    price: 123423,
    participated: [dummyUser2, dummyUser3, dummyUser],
}

const dummyItem4: Item = {
    id: 'wwasd',
    name: 'PS5',
    price: 123423,
    participated: [dummyUser3, dummyUser],
}

const dummyItem5: Item = {
    id: 'wwadfsafsd',
    name: 'Katjes ofc',
    price: 534,
    participated: [dummyUser2, dummyUser],
}

const dummyItem6: Item = {
    id: 'Valami',
    name: 'Valami random termek',
    price: 123423,
    participated: [dummyUser2, dummyUser3],
}

const dummyExpense: ExpenseType = {
    id: 'adsf',
    title: 'Shopping',
    amount: 12343,
    payerId: 'asdf',
    date: '2022-10-10',
    received: [dummyUser, dummyUser2, dummyUser3],
    payer: dummyUser,
    items: [
        dummyItem,
        dummyItem2,
        dummyItem3,
        dummyItem4,
        dummyItem5,
        dummyItem6,
    ],
}

export default function Page() {
    const [expenses, setExpenses] = useState<ExpenseType[]>([])
    const handleRefresh = () => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    process.env.NEXT_PUBLIC_BASE_URL + '/expense',
                )
                if (response.status === 404) {
                    return
                }
                const data = await response.data
            } catch (error: any) {
                console.error('Error fetching data:', error.request.status)
            }
        }

        //fetchData()
        setExpenses([
            dummyExpense,
            dummyExpense,
            dummyExpense,
            dummyExpense,
            dummyExpense,
            dummyExpense,
        ])
    }

    useEffect(() => {
        handleRefresh()
    }, [])

    return (
        <>
            {expenses.length === 0 && (
                <>
                    <div className={'h5'}></div>
                    <div className={'middleinside'}>
                        <h3>Még nem veszel részt egyetlen költségben sem</h3>
                        <QuickActionButtons
                            revealed={[true, true, false, false]}
                        />
                    </div>
                </>
            )}
            {expenses.map((expense, index) => (
                <ExpenseCard key={index} expense={expense} />
            ))}
        </>
    )
}
