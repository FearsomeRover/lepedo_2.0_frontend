'use client'
import React, { useEffect, useState } from 'react'
import QuickActionButtons from '@/components/QuickActionButtons/QuickActionButtons'
import { TransferType } from '@/types/transferType'
import TransferCard from '@/components/TransferCard/TransferCard'
import SearchField from '@/components/MainSearch/SearchField'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'
import toast from 'react-hot-toast'
import axios from 'axios'

export default function Page() {
    const { data, error, isLoading, mutate } = useSWR<TransferType[]>(
        process.env.NEXT_PUBLIC_BASE_URL + '/transfer',
        fetcher,
    )

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

    async function optimisticRefresh(newTransfer: TransferType) {
        try {
            await mutate(data ? [...data, newTransfer] : [newTransfer], {
                rollbackOnError: true,
                populateCache: true,
                revalidate: true,
            })
            toast('QR kód sikeresen mentve', { icon: '🎉' })
        } catch (e) {
            toast('Hiba történt a QR kód mentése közben', { icon: '❌' })
        }
    }

    const onEdit = (cur: TransferType) => {}

    async function onDelete(cur: TransferType) {
        if (data === undefined) return
        try {
            mutate((data) => {
                return data!.filter((item) => item.id !== cur.id)
            }, false)
            await axios.delete(process.env.NEXT_PUBLIC_BASE_URL + '/transfer/' + cur.id)
        } catch (error: any) {
            console.error('Error deleting data:', error.request.status)
        }
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
                        <QuickActionButtons
                            revealed={[false, false, true, false]}
                            TransferRefresh={optimisticRefresh}
                        />
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
                        revealed={[false, false, true, false]}
                        isVertical={true}
                        TransferRefresh={optimisticRefresh}
                    />
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
                            <TransferCard key={transfer.id} transfer={transfer} onEdit={onEdit} onDelete={onDelete} />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
