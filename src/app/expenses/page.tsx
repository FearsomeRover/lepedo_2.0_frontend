'use client'
import { useEffect, useState } from 'react'
import { BasicExpenseType } from '@/types/expenseType'
import ExpenseCard from '@/components/ExpenseCard/ExpenseCard'
import { BasicUser } from '@/types/user'
import { BasicItem } from '@/types/item'
import SearchField from '@/components/MainSearch/SearchField'
import axios from 'axios'
import QuickActionButtons from '@/components/QuickActionButtons/QuickActionButtons'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'

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

const dummyItem: BasicItem = {
    id: 'asdf',
    name: 'Milk',
    price: 123,
    participated: [dummyUser],
}

const dummyItem2: BasicItem = {
    id: 'ww',
    name: 'finom kaja',
    price: 123423,
    participated: [dummyUser2, dummyUser3, dummyUser],
}

const dummyItem3: BasicItem = {
    id: 'wwfds',
    name: 'kakao',
    price: 123423,
    participated: [dummyUser2, dummyUser3, dummyUser],
}

const dummyItem4: BasicItem = {
    id: 'wwasd',
    name: 'PS5',
    price: 123423,
    participated: [dummyUser3, dummyUser],
}

const dummyItem5: BasicItem = {
    id: 'wwadfsafsd',
    name: 'Katjes ofc',
    price: 534,
    participated: [dummyUser2, dummyUser],
}

const dummyItem6: BasicItem = {
    id: 'Valami',
    name: 'Valami random termek',
    price: 123423,
    participated: [dummyUser2, dummyUser3],
}

const dummyExpense: BasicExpenseType = {
    id: 'adsf',
    title: 'Shopping',
    amount: 12343,
    date: '2022-10-10',
    received: [dummyUser, dummyUser2, dummyUser3],
    payer: dummyUser,
    items: [dummyItem, dummyItem2, dummyItem3, dummyItem4, dummyItem5, dummyItem6],
}

export default function Page() {
    const { data, error, isLoading, mutate } = useSWR<BasicExpenseType[]>(
        process.env.NEXT_PUBLIC_BASE_URL + '/expense',
        fetcher,
    )

    const [filteredExpenses, setFilteredExpenses] = useState<BasicExpenseType[]>([])
    const [filterPhrase, setFilterPhrase] = useState<string>('')

    useEffect(() => {
        setFilteredExpenses(expenses.filter((expense) => filter(expense, filterPhrase)))
    }, [expenses, filterPhrase])

    const handleRefresh = () => {
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/expense')
                if (response.status === 404) {
                    return
                }
                const data = response.data
                setExpenses(data)
            } catch (error: any) {
                console.error('Error fetching data:', error.request.status)
            }
        }

        fetchData()
    }

    useEffect(() => {
        handleRefresh()
    }, [])

    const filter = (expense: BasicExpenseType, filterPhrase: string) => {
        if (filterPhrase === '') return true
        if (expense.title.toLowerCase().includes(filterPhrase.toLowerCase())) return true
        if (expense.payer.name.toLowerCase().includes(filterPhrase.toLowerCase())) return true
        if (expense.items.some((item) => item.name.toLowerCase().includes(filterPhrase.toLowerCase()))) return true
        return false
    }

    return (
        <>
            <SearchField
                filterPhrase={filterPhrase}
                setFilterPhrase={setFilterPhrase}
                red={expenses.length > 0 && filteredExpenses.length === 0}
            />
            <div className={'flex-row-desktop'}>
                <QuickActionButtons
                    revealed={[true, true, false, false]}
                    isVertical={true}
                    SMPExpenseRefresh={handleRefresh}
                />
                <div className={'w100'}>
                    {filteredExpenses.length === 0 && (
                        <>
                            <div className={'h5'}></div>
                            <div className={'middleinside'}>
                                {expenses.length === 0 && <h3>Még nem veszel részt egyetlen költségben sem</h3>}
                                {expenses.length > 0 && <h3>Nincs a keresésednek megfelelő költés :(</h3>}
                            </div>
                        </>
                    )}
                    {filteredExpenses.map((expense, index) => (
                        <ExpenseCard key={expense.id} expense={expense} />
                    ))}
                </div>
            </div>
        </>
    )
}
