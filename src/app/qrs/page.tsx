'use client'
import QRCard from '@/components/QR/QRCard'
import React, { useEffect } from 'react'
import axios from 'axios'
import { QrType } from '@/types/qr'
import NewQrForm from '@/components/Forms/NewQrForm'

const dummyUser = {
    name: 'John Doe',
    color: 'coral',
    revTag: '1234',
    id: '1234',
}

export default function page() {
    const [formRevealed, setFormRevealed] = React.useState<QrType | null>(null)
    const [qrs, setQrs] = React.useState<QrType[]>([])
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
            {qrs.map((qr) => (
                <QRCard qr={qr} onEdit={onEdit} onDelete={onDelete} />
            ))}
        </>
    )
}
