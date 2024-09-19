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
import ExpenseDeclineForm from '@/components/Forms/ExpenseDeclineForm'

export default function Page() {
    const { data, error, isLoading, mutate } = useSWR<BasicExpenseType[]>(
        process.env.NEXT_PUBLIC_BASE_URL + '/expense',
        fetcher,
    )

    const [filteredExpenses, setFilteredExpenses] = useState<BasicExpenseType[]>([])
    const [filterPhrase, setFilterPhrase] = useState<string>('')
    const [editedExpense, setEditedExpense] = useState<ExpenseType | null>(null)
    const [declinedExpense, setDeclinedExpense] = useState<ExpenseType | null>(null)

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

    const onDecline = async (cur: BasicExpenseType) => {
        const expense: ExpenseType = await axios
            .get(process.env.NEXT_PUBLIC_BASE_URL + '/expense/' + cur.id)
            .then((res) => res.data)
        setDeclinedExpense(expense)
    }

    const onAccept = async (cur: BasicExpenseType) => {}

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
    if (isLoading) {
        return (
            <>
                <div className={'h5'}></div>
                <div className={'middleinside'}>
                    <h3>Adatok betöltése...</h3>
                </div>
            </>
        )
    }
    console.log(data)

    return (
        <>
            {editedExpense && <NewADVExpenseForm expense={editedExpense} abort={() => setEditedExpense(null)} />}
            {declinedExpense && <ExpenseDeclineForm abort={() => {}} expense={declinedExpense} />}
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

            {error && (
                <>
                    <div className={'h5'}></div>
                    <div className={'middleinside red'}>
                        <h3>{error.message}</h3>
                    </div>
                </>
            )}
            {data && data.length > 0 && (
                <div className={'flex-row-desktop'}>
                    <QuickActionButtons revealed={[true, true, false, false]} isVertical={true} />
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
                            <ExpenseCard
                                key={expense.id}
                                expense={expense}
                                onEdit={onEdit}
                                onDelete={onDelete}
                                onDecline={onDecline}
                                onAccept={onAccept}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
