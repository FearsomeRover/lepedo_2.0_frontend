'use client'
import { BasicUser } from '@/types/user'
import { formatAmount } from '../../../utils/formatAmount'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { QrType } from '@/types/qr'
import UserRelationRow from '@/components/UserCard/UserRelationRow'
import { GlobalStateContext } from '@/components/context/context'
import HorizontalLine from '@/components/HorizontalLine/HorizontalLine'

export default function Page() {
    const searchParams = useSearchParams()
    const [qr, setQr] = useState<QrType | null | undefined>(null)
    const user = useContext(GlobalStateContext).ownUser

    const dummyUser: BasicUser = {
        name: 'Dummy User',
        id: '123',
        color: 'coral',
        revTag: 'valami',
    }

    const handleRefresh = () => {
        const fetchData = async () => {
            try {
                const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/qr/' + searchParams.get('id'))
                if (response.status === 404) {
                    setQr(undefined)
                    return
                }
                const data = await response.data
                setQr(data)
            } catch (error: any) {
                setQr(undefined)
                console.error('Error fetching data:', error.request.status)
            }
        }

        fetchData()
        console.log(qr)
    }

    useEffect(() => {
        handleRefresh()
    }, [])

    function handleAccept() {
        axios.post(process.env.NEXT_PUBLIC_BASE_URL + '/qr/' + searchParams.get('id') + '/accept', {})
    }

    return (
        <>
            <h2 className={'activeheader'}>Tartozás felvétele</h2>
            {qr === null && <p>loading...</p>}
            {qr === undefined && (
                <div className={'middleinside'}>
                    <div className={'h5'}></div>
                    <h3>Nem létezik ilyen QR kód</h3>
                </div>
            )}
            {qr && (
                <>
                    <div className={'middleinside'}>
                        <h6 className={'w300px middleself'}>
                            Elfogadod az alábbi költést? Ha jóváhagyod, automatikusan bekerül egy költés, mely szerint
                            tartozol {qr.payTo.name}-nak/nek egy {qr.title}-val/vel.
                        </h6>
                    </div>
                    <div className={'h5'}></div>
                    <div className={'wfitcontent middleself border'}>
                        <h4>{qr.title}</h4>
                        <div className={'h1'}></div>
                        <p className={'fs24 nomargin w100 middleinside'}>{formatAmount(qr.amount)} Ft</p>
                        <div className={'h1'}></div>
                        <UserRelationRow user1={user} user2={qr.payTo} />
                        <HorizontalLine />
                        <div className={'middleinside nomargininside'}>
                            <button className={'sbtn fs14'} style={{ marginRight: '16px' }} onClick={handleAccept}>
                                Jóváhagyás
                            </button>
                            <button className={'sbtn fs14'}>Mégse</button>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
