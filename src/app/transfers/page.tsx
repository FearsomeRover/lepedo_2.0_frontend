'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { ExpenseType } from '@/types/expenseType'
import ExpenseCard from '@/components/ExpenseCard/ExpenseCard'
import QuickActionButtons from '@/components/QuickActionButtons/QuickActionButtons'
import { BasicUser } from '@/types/user'
import { Item } from '@/types/item'
import { TransferType } from '@/types/transferType'
import TransferCard from '@/components/TransferCard/TransferCard'

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

const dummyTransfer: TransferType = {
    id: 'a kedvenc utalásom',
    date: '2021-11-11',
    title: 'Kedvenc utalásom',
    userFrom: dummyUser,
    userTo: dummyUser2,
    amount: 123,
}

export default function Page() {
    const [transfers, setTransfers] = useState<TransferType[]>([])
    const [filterPhrase, setFilterPhrase] = useState<string>('')

    const handleRefresh = () => {
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/transfer')
                if (response.status === 404) {
                    return
                }
                const data = await response.data
                setTransfers(data)
            } catch (error: any) {
                console.error('Error fetching data:', error.request.status)
            }
        }

        fetchData()
    }

    useEffect(() => {
        handleRefresh()
    }, [])

    const filter = (transfer: TransferType, filterPhrase: string) => {
        if (filterPhrase === '') return true
        if (transfer.userFrom.name.toLowerCase().includes(filterPhrase.toLowerCase())) return true
        if (transfer.userTo.name.toLowerCase().includes(filterPhrase.toLowerCase())) return true
        if (transfer.date && transfer.date.toLowerCase().includes(filterPhrase.toLowerCase())) return true
        if (transfer.amount.toString().toLowerCase().includes(filterPhrase.toLowerCase())) return true
        return false
    }

    // @ts-ignore
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
                {transfers.length === 0 && (
                    <>
                        <div className={'h5'}></div>
                        <div className={'middleinside'}>
                            <h3>Még nem veszel részt egyetlen utalásban sem</h3>
                            <QuickActionButtons revealed={[true, true, false, false]} />
                        </div>
                    </>
                )}
                {transfers
                    .filter((transfer) => filter(transfer, filterPhrase))
                    .map((transfer, index) => (
                        <TransferCard transfer={transfer} key={transfer.id} />
                    ))}
            </div>
        </>
    )
}
