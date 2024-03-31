'use client'
import { QrType } from '@/types/qr'
import styles from './qrcard.module.css'
import { formatAmount } from '@/utils/formatAmount'
import React from 'react'
import ItemActionRow from '@/components/QuickActionButtons/ItemActionRow'
import UserRelationRow from '@/components/UserCard/UserRelationRow'

type QRCardProps = {
    qr: QrType
    handleOnQrClick: (text: string) => void
    onEdit?: (cur: QrType) => void
    onDelete?: (cur: QrType) => void
}

export default function QRCard(props: QRCardProps) {
    const [hover, setHover] = React.useState(false)

    return (
        <div className={styles.qrcard} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <h4>{props.qr.title}</h4>

            <ItemActionRow
                visible={hover}
                handleOnQrClick={(text) => {
                    props.handleOnQrClick(text)
                }}
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
            <UserRelationRow
                user1={{ id: '-', name: 'QR beolvasója', color: 'gray', revTag: '' }}
                user2={props.qr.payTo}
            />
        </div>
    )
}
