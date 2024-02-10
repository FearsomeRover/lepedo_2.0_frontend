'use client'
import axios from 'axios'
import { useState } from 'react'
import { ExpenseType } from '@/types/expense'
import ExpenseCard from '@/components/ExpenseCard/ExpenseCard'
import QuickActionButtons from '@/components/QuickActionButtons/QuickActionButtons'

export default function Page() {
    const [expenses, setExpenses] = useState<ExpenseType[]>([])
    const handleRefresh = () => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    process.env.NEXT_PUBLIC_BASE_URL + '/transfer',
                )
                if (response.status === 404) {
                    return
                }
                const data = await response.data
            } catch (error: any) {
                console.error('Error fetching data:', error.request.status)
            }
        }
    }

    return (
        <>
            {expenses.length === 0 && (
                <>
                    <div className={'h5'}></div>
                    <div className={'middle'}>
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
