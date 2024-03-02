import React from 'react'
import styles from './searchfield.module.css'

type SearchFieldProps = {
    filterPhrase: string
    setFilterPhrase: (s: string) => void
    red?: boolean
}

export default function SearchField(props: SearchFieldProps) {
    return (
        <div className={styles.searchfieldcontainer}>
            <input
                className={styles.searchfield + (props.red ? ' ' + styles.red : '')}
                type="text"
                placeholder="Keresés..."
                onChange={(s) => props.setFilterPhrase(s.target.value)}
            />
        </div>
    )
}
