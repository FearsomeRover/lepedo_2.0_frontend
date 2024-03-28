'use client'
import QRCard from '@/components/QR/QRCard'
import React, { useState } from 'react'
import axios from 'axios'
import { QrType } from '@/types/qr'
import NewQrForm from '@/components/Forms/NewQrForm'
import QrCodePopUp from '@/components/Forms/QrCodePopUp'
import QuickActionButtons from '@/components/QuickActionButtons/QuickActionButtons'
import useSWR from 'swr'

export default function Page() {
    const [formRevealed, setFormRevealed] = useState<QrType | null>(null)
    const [qrPopUpRevealed, setQrPopUpRevealed] = useState<string | null>(null)

    const fetcher = (url: string) => axios.get(url).then((res) => res.data)
    const { data, error, isLoading } = useSWR(process.env.NEXT_PUBLIC_BASE_URL + '/qr', fetcher)

    const onEdit = (cur: QrType) => {
        setFormRevealed(cur)
    }

    async function onDelete(cur: QrType) {
        try {
            await axios.delete(process.env.NEXT_PUBLIC_BASE_URL + '/qr/' + cur.id)
        } catch (error: any) {
            console.error('Error deleting data:', error.request.status)
        }
    }

    return (
        <>
            {formRevealed && <NewQrForm abort={() => setFormRevealed(null)} refresh={() => {}} qr={formRevealed} />}
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
            {data &&
                data.length > 0 &&
                data.map((qr: QrType) => (
                    <QRCard
                        handleOnQrClick={setQrPopUpRevealed}
                        key={qr.id}
                        qr={qr}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
        </>
    )
}
