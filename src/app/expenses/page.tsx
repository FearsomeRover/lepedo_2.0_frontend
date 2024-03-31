'use client'
import React, { useEffect, useState } from 'react'
import { BasicExpenseType } from '@/types/expenseType'
import ExpenseCard from '@/components/ExpenseCard/ExpenseCard'
import { BasicUser } from '@/types/user'
import { BasicItem } from '@/types/item'
import SearchField from '@/components/MainSearch/SearchField'
import QuickActionButtons from '@/components/QuickActionButtons/QuickActionButtons'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'
import toast from 'react-hot-toast'

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
        if (data === undefined) return
        setFilteredExpenses(data.filter((expense) => filter(expense, filterPhrase)))
    }, [data, filterPhrase])

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
                red={data && filteredExpenses.length === 0}
            />
            {data && data.length === 0 && (
                <>
                    <div className={'h5'}></div>
                    <div className={'middleinside'}>
                        <h3>Itt fognak lakni a költéseid</h3>
                        <QuickActionButtons revealed={[true, true, false, false]} />
                    </div>
                </>
            )}
            {isLoading && <p>loading...</p>}
            {error && (
                <>
                    <div className={'h5'}></div>
                    <div className={'middleinside red'}>
                        <h3>Hupsz! Hiba csúszott a gépezetbe!</h3>
                        <p>{error}</p>
                    </div>
                </>
            )}
            {data && data.length > 0 && (
                <div className={'flex-row-desktop'}>
                    <QuickActionButtons
                        revealed={[true, true, false, false]}
                        isVertical={true}
                        SMPExpenseRefresh={async (newExpense: BasicExpenseType) => {
                            try {
                                await mutate([...data, newExpense], {
                                    optimisticData: [...data, newExpense],
                                    rollbackOnError: true,
                                    populateCache: true,
                                    revalidate: true,
                                })
                                toast('Költés sikeresen mentve', { icon: '🎉' })
                            } catch (e) {
                                toast('Hiba történt a költés mentése közben', { icon: '❌' })
                            }
                        }}
                    />
                    <div className={'w100'}>
                        {filteredExpenses.length === 0 && (
                            <>
                                <div className={'h5'}></div>
                                <div className={'middleinside'}>
                                    {data.length === 0 && <h3>Még nem veszel részt egyetlen költségben sem</h3>}
                                    {data.length > 0 && <h3>Nincs a keresésednek megfelelő költés :(</h3>}
                                </div>
                            </>
                        )}
                        {filteredExpenses.map((expense, index) => (
                            <ExpenseCard key={expense.id} expense={expense} />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
