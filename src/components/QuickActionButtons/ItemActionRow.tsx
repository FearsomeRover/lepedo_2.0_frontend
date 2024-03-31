'use client'
import styles from './action.module.css'
import QRImage from '@/components/QR/QRImage'
import { QrType } from '@/types/qr'
import React from 'react'

export type ItemActionRowProps = {
    qr?: QrType
    handleOnQrClick?: (text: string) => void
    onEdit?: () => void
    onDelete?: () => void
    visible?: boolean
}

export default function ItemActionRow(props: ItemActionRowProps) {
    const text = props.qr ? process.env['NEXT_PUBLIC_QR_REDIRECT_BASE_URL'] + '/qr/' + props.qr.id : 'na'

    return (
        <div className={styles.righttop}>
            <div style={{ opacity: !props.visible ? 0 : 1 }} className={'inline'}>
                {props.onEdit && <img className={'m8'} src={'/images/pencil.svg'} onClick={props.onEdit}></img>}
                {props.onDelete && <img className={'m8'} src={'/images/trash.svg'} onClick={props.onDelete}></img>}
            </div>
            {props.qr && props.handleOnQrClick && (
                <div
                    className={'inline-block'}
                    onClick={(e) => {
                        console.log('click')
                        props.handleOnQrClick!(text)
                    }}>
                    <QRImage text={text} size={1} />
                </div>
            )}
        </div>
    )
}
