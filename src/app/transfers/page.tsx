'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import QuickActionButtons from '@/components/QuickActionButtons/QuickActionButtons'
import { BasicUser } from '@/types/user'
import { TransferType } from '@/types/transferType'
import TransferCard from '@/components/TransferCard/TransferCard'
import SearchField from '@/components/MainSearch/SearchField'

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
    const [filteredTransfers, setFilteredTransfers] = useState<TransferType[]>([])
    const [filterPhrase, setFilterPhrase] = useState<string>('')

    useEffect(() => {
        setFilteredTransfers(transfers.filter((transfer) => filter(transfer, filterPhrase)))
    }, [transfers, filterPhrase])
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
        if (transfer.title.toLowerCase().includes(filterPhrase.toLowerCase())) return true
        if (transfer.userFrom.name.toLowerCase().includes(filterPhrase.toLowerCase())) return true
        if (transfer.userTo.name.toLowerCase().includes(filterPhrase.toLowerCase())) return true
        if (transfer.date && transfer.date.toLowerCase().includes(filterPhrase.toLowerCase())) return true
        if (transfer.amount.toString().toLowerCase().includes(filterPhrase.toLowerCase())) return true
        return false
    }

    return (
        <>
            <SearchField
                filterPhrase={filterPhrase}
                setFilterPhrase={setFilterPhrase}
                red={transfers.length > 0 && filteredTransfers.length === 0}
            />
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
                {transfers.length > 0 && filteredTransfers.length === 0 && (
                    <>
                        <div className={'h5'}></div>
                        <div className={'middleinside'}>
                            <h3>Nincs a keresésednek megfelelő utalás :(</h3>
                            <QuickActionButtons revealed={[false, false, true, false]} />
                        </div>
                    </>
                )}
                {filteredTransfers.map((transfer, index) => (
                    <TransferCard transfer={transfer} key={transfer.id} />
                ))}
            </div>
        </>
    )
}
