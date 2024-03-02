'use client'
import { QrType } from '@/types/qr'
import UserCardSimple from '@/components/UserCard/UserCardSimple'
import styles from './qrcard.module.css'
import QRImage from '@/components/QR/QRImage'
import HorizontalLine from '@/components/HorizontalLine/HorizontalLine'
import { formatAmount } from '../../../utils/formatAmount'
import Image from 'next/image'
import React from 'react'

export default function QRCard(qr: QrType) {
    return (
        <div className={styles.qrcard}>
            <h4>{qr.title}</h4>

            <div className={styles.righttop}>
                <img className={'m8'} src={'/images/pencil.svg'}></img>
                <img className={'m8'} src={'/images/trash.svg'}></img>
                <QRImage text={process.env['QR_REDIRECT_BAES_URL '] + '/qr/' + qr.id} size={1} />
            </div>

            <div className={'h1'}></div>
            <p className={'fs24 nomargin w100 middleinside'}>{formatAmount(qr.amount)} Ft</p>
            <div className={'h1'}></div>
            <div className={'flex-row-space-between'}>
                <UserCardSimple name={'QR beolvasója'} color={''} onClick={() => {}} />
                <div className={'imageContainer'}>
                    <Image className={'arrow'} src="/images/arrow-right.svg" alt="arrow-right" fill></Image>
                </div>
                <UserCardSimple name={qr.userTo.name} color={qr.userTo.color} onClick={() => {}} />
            </div>
        </div>
    )
}
