'use client'
import React, { useEffect, useState } from 'react'
import QuickActionButtons from '@/components/QuickActionButtons/QuickActionButtons'
import { TransferType } from '@/types/transferType'
import TransferCard from '@/components/TransferCard/TransferCard'
import SearchField from '@/components/MainSearch/SearchField'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'

export default function Page() {
    const { data, error, isLoading } = useSWR<TransferType[]>(process.env.NEXT_PUBLIC_BASE_URL + '/transfer', fetcher)

    const [filteredTransfers, setFilteredTransfers] = useState<TransferType[]>([])
    const [filterPhrase, setFilterPhrase] = useState<string>('')

    useEffect(() => {
        if (data === undefined) return
        setFilteredTransfers(data.filter((transfer) => filter(transfer, filterPhrase)))
    }, [data, filterPhrase])

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
                red={data && filteredTransfers.length === 0}
            />
            {data && data.length === 0 && (
                <>
                    <div className={'h5'}></div>
                    <div className={'middleinside'}>
                        <h3>Még nem veszel részt egyetlen utalásban sem</h3>
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
                    <QuickActionButtons revealed={[true, true, false, false]} isVertical={true} />
                    <div className={'w100'}>
                        {filteredTransfers.length === 0 && (
                            <>
                                <div className={'h5'}></div>
                                <div className={'middleinside'}>
                                    {data.length === 0 && <h3>Még nem veszel részt egyetlen költségben sem</h3>}
                                    {data.length > 0 && <h3>Nincs a keresésednek megfelelő költés :(</h3>}
                                </div>
                            </>
                        )}
                        {filteredTransfers.map((transfer, index) => (
                            <TransferCard key={transfer.id} transfer={transfer} />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
