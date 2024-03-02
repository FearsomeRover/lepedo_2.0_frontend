import styles from './action.module.css'
import QRImage from '@/components/QR/QRImage'
import { QrType } from '@/types/qr'
import React from 'react'

export type ItemActionRowProps = {
    qr?: QrType
    onEdit?: () => void
    onDelete?: () => void
}
export default function ItemActionRow(props: ItemActionRowProps) {
    return (
        <div className={styles.righttop}>
            {props.onEdit && <img className={'m8'} src={'/images/pencil.svg'} onClick={props.onEdit}></img>}
            {props.onDelete && <img className={'m8'} src={'/images/trash.svg'} onClick={props.onDelete}></img>}
            {props.qr && <QRImage text={process.env['QR_REDIRECT_BASE_URL '] + '/qr/' + props.qr.id} size={1} />}
        </div>
    )
}
