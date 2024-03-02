'use client'
import { QrType } from '@/types/qr'
import UserCardSimple from '@/components/UserCard/UserCardSimple'
import styles from './qrcard.module.css'
import { formatAmount } from '../../../utils/formatAmount'
import Image from 'next/image'
import React from 'react'
import ItemActionRow from '@/components/QuickActionButtons/ItemActionRow'

type QRCardProps = {
    qr: QrType
    onEdit?: (cur: QrType) => void
    onDelete?: (cur: QrType) => void
}

export default function QRCard(props: QRCardProps) {
    return (
        <div className={styles.qrcard}>
            <h4>{props.qr.title}</h4>

            <ItemActionRow
                qr={props.qr}
                onDelete={
                    props.onDelete
                        ? () => {
                              props.onDelete!(props.qr)
                          }
                        : undefined
                }
                onEdit={
                    props.onDelete
                        ? () => {
                              props.onEdit!(props.qr)
                          }
                        : undefined
                }
            />

            <div className={'h1'}></div>
            <p className={'fs24 nomargin w100 middleinside'}>{formatAmount(props.qr.amount)} Ft</p>
            <div className={'h1'}></div>
            <div className={'flex-row-space-between'}>
                <UserCardSimple name={'QR beolvasója'} color={''} onClick={() => {}} />
                <div className={'imageContainer'}>
                    <Image className={'arrow'} src="/images/arrow-right.svg" alt="arrow-right" fill></Image>
                </div>
                <UserCardSimple name={props.qr.payTo.name} color={props.qr.payTo.color} onClick={() => {}} />
            </div>
        </div>
    )
}
