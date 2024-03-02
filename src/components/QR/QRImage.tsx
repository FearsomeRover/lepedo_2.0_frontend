'use client'
import React from 'react'
import { useQRCode } from 'next-qrcode'

export default function QRImage(props: { text: string; size?: number }) {
    const { Canvas } = useQRCode()
    return (
        <Canvas
            text="https://lepedo.live/qr/"
            options={{
                errorCorrectionLevel: 'M',
                margin: 3,
                scale: props.size ? props.size : 10,
                color: {
                    dark: '#2c2c2c',
                    light: '#f5f5f5',
                },
            }}
        />
    )
}
