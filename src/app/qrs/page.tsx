'use client'
import QRCard from '@/components/QR/QRCard'
import React, { useState } from 'react'
import axios from 'axios'
import { QrType } from '@/types/qr'
import QrCodePopUp from '@/components/Forms/QrCodePopUp'
import QuickActionButtons from '@/components/QuickActionButtons/QuickActionButtons'
import useSWR from 'swr'
import toast from 'react-hot-toast'

export default function Page() {
    //const [formRevealed, setFormRevealed] = useState<QrType | null>(null)
    const [qrPopUpRevealed, setQrPopUpRevealed] = useState<string | null>(null)

    const fetcher = (url: string) => axios.get(url).then((res) => res.data)
    const { data, error, isLoading, mutate } = useSWR<QrType[]>(process.env.NEXT_PUBLIC_BASE_URL + '/qr', fetcher)

    const onEdit = (cur: QrType) => {
        //setFormRevealed(cur)
    }

    async function onDelete(cur: QrType) {
        if (data === undefined) return
        try {
            mutate((data) => {
                return data!.filter((item) => item.id !== cur.id)
            }, false)

            await axios.delete(process.env.NEXT_PUBLIC_BASE_URL + '/qr/' + cur.id)
        } catch (error: any) {
            console.error('Error deleting data:', error.request.status)
            mutate()
        }
    }

    return (
        <>
            {/*{formRevealed && <NewQrForm abort={() => setFormRevealed(null)} refresh={() => {}} qr={formRevealed} />}*/}
            {qrPopUpRevealed !== null && (
                <QrCodePopUp qrText={qrPopUpRevealed} abort={() => setQrPopUpRevealed(null)} />
            )}
            {data && data.length === 0 && (
                <>
                    <div className={'h5'}></div>
                    <div className={'middleinside'}>
                        <h3>Itt fognak lakni a QR kódjaid</h3>
                        <QuickActionButtons revealed={[false, false, false, true]} />
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
                        revealed={[false, false, false, true]}
                        QrRefresh={async (newQr: QrType) => {
                            try {
                                await mutate([...data, newQr], {
                                    optimisticData: [...data, newQr],
                                    rollbackOnError: true,
                                    populateCache: true,
                                    revalidate: true,
                                })
                                toast('QR kód sikeresen mentve', { icon: '🎉' })
                            } catch (e) {
                                toast('Hiba történt a QR kód mentése közben', { icon: '❌' })
                            }
                        }}
                        isVertical={true}
                    />
                    <div className={'w100'}>
                        {data.map((qr: QrType) => (
                            <QRCard
                                handleOnQrClick={setQrPopUpRevealed}
                                key={qr.id}
                                qr={qr}
                                onEdit={onEdit}
                                onDelete={onDelete}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
