'use client'
import React, { useEffect, useState } from 'react'
import { BasicExpenseType, ExpenseType } from '@/types/expenseType'
import ExpenseCard from '@/components/ExpenseCard/ExpenseCard'
import SearchField from '@/components/MainSearch/SearchField'
import QuickActionButtons from '@/components/QuickActionButtons/QuickActionButtons'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'
import axios from 'axios'
import { filter } from '@/utils/filter'
import { createToast } from '@/utils/createToast'
import NewADVExpenseForm from '@/components/Forms/NewADVExpenseForm'

export default function Page() {
    const { data, error, isLoading, mutate } = useSWR<BasicExpenseType[]>(
        process.env.NEXT_PUBLIC_BASE_URL + '/expense',
        fetcher,
    )

    const [filteredExpenses, setFilteredExpenses] = useState<BasicExpenseType[]>([])
    const [filterPhrase, setFilterPhrase] = useState<string>('')
    const [editedExpense, setEditedExpense] = useState<ExpenseType | null>(null)

    useEffect(() => {
        if (data === undefined) return
        setFilteredExpenses(data.filter((expense) => filter(expense, filterPhrase)))
    }, [data, filterPhrase])

    const onEdit = async (cur: BasicExpenseType) => {
        const expense: ExpenseType = await axios
            .get(process.env.NEXT_PUBLIC_BASE_URL + '/expense/' + cur.id)
            .then((res) => res.data)
        setEditedExpense(expense)
    }

    async function onDelete(cur: BasicExpenseType) {
        if (data === undefined) return
        try {
            mutate((data) => {
                return data!.filter((item) => item.id !== cur.id)
            }, false)
            await axios.delete(process.env.NEXT_PUBLIC_BASE_URL + '/expense/' + cur.id)
        } catch (error: any) {
            createToast('Nem sikerült törölni a költést', false)
        }
    }

    return (
        <>
            {editedExpense && (
                <NewADVExpenseForm expense={editedExpense} abort={() => setEditedExpense(null)} refresh={() => {}} />
            )}
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
                        ExpenseRefresh={async (newExpense: BasicExpenseType) => {
                            try {
                                await mutate([...data, newExpense], {
                                    optimisticData: [...data, newExpense],
                                    rollbackOnError: true,
                                    populateCache: true,
                                    revalidate: true,
                                })
                                createToast('Költség sikeresen hozzáadva', true)
                            } catch (e) {
                                createToast('Nem sikerült elmenteni a költést', false)
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
                            <ExpenseCard key={expense.id} expense={expense} onEdit={onEdit} onDelete={onDelete} />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
