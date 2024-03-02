'use client'
import styles from './forms.module.css'
import QRImage from '@/components/QR/QRImage'
import React from 'react'

type QrCodePopUpProps = {
    qr: string
    abort: () => void
}
export default function QrCodePopUp(props: QrCodePopUpProps) {
    return (
        <div
            className={styles.popup}
            onClick={(event) => {
                if (event.target === event.currentTarget) props.abort()
            }}>
            <div className={`w500px-desktop ${styles.popupform} hunset`}>
                <div className={'middleinside'}>
                    <QRImage text={process.env['QR_REDIRECT_BASE_URL '] + '/qr/' + props.qr} size={10} />
                </div>
                <button className={'sbtn'} onClick={() => props.abort()}>
                    Bezárás
                </button>
            </div>
        </div>
    )
}
