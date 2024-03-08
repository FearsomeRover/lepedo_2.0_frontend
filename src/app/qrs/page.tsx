'use client'
import QRCard from '@/components/QR/QRCard'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { QrType } from '@/types/qr'
import NewQrForm from '@/components/Forms/NewQrForm'
import QrCodePopUp from '@/components/Forms/QrCodePopUp'
import QuickActionButtons from '@/components/QuickActionButtons/QuickActionButtons'

export default function Page() {
    const [formRevealed, setFormRevealed] = useState<QrType | null>(null)
    const [qrPopUpRevealed, setQrPopUpRevealed] = useState<string | null>(null)
    const [qrs, setQrs] = useState<QrType[]>([])
    const handleRefresh = () => {
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/qr')
                if (response.status === 404) {
                    return
                }
                const data = await response.data
                setQrs(data)
            } catch (error: any) {
                console.error('Error fetching data:', error.request.status)
            }
        }

        fetchData()
    }

    useEffect(() => {
        handleRefresh()
    }, [])

    const onEdit = (cur: QrType) => {
        setFormRevealed(cur)
    }

    async function onDelete(cur: QrType) {
        try {
            await axios.delete(process.env.NEXT_PUBLIC_BASE_URL + '/qr/' + cur.id)
            handleRefresh()
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
            {qrs.length === 0 && (
                <>
                    <div className={'h5'}></div>
                    <div className={'middleinside'}>
                        <h3>Itt fognak lakni a QR kódjaid</h3>
                        <QuickActionButtons revealed={[false, false, false, true]} />
                    </div>
                </>
            )}
            {qrs.length === 0 ||
                qrs.map((qr) => (
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
