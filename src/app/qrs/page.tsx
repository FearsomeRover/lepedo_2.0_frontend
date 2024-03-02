'use client'
import QRCard from '@/components/QR/QRCard'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { QrType } from '@/types/qr'
import NewQrForm from '@/components/Forms/NewQrForm'
import QrCodePopUp from '@/components/Forms/QrCodePopUp'

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

    function onDelete() {}

    return (
        <>
            {formRevealed && <NewQrForm abort={() => setFormRevealed(null)} refresh={() => {}} qr={formRevealed} />}
            {qrPopUpRevealed !== null && (
                <QrCodePopUp qrText={qrPopUpRevealed} abort={() => setQrPopUpRevealed(null)} />
            )}
            {qrs.map((qr) => (
                <QRCard handleOnQrClick={setQrPopUpRevealed} key={qr.id} qr={qr} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </>
    )
}
