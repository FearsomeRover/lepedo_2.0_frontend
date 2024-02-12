import React from 'react'
import styles from './button.module.css'

type StatusButtonProps = {
    title: string
    text: string
    color: string
    onClick: () => void
}
export default function StatusButton(props: StatusButtonProps) {
    return (
        <button
            className={styles.statusbutton}
            style={{ borderColor: props.color }}
            title={props.title}
            onClick={props.onClick}>
            {props.text}
        </button>
    )
}
