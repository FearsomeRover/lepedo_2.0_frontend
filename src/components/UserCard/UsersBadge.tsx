'use client'
import styles from './usercard.module.css'
import { useEffect } from 'react'

type UsersBadgeProps = {
    users: User[]
}

export default function UsersBagde(props: UsersBadgeProps) {
    let userNames = props.users.map((user) => ' ' + user.name)

    return (
        <div className={styles.userbadgecontainer} title={userNames.toString()}>
            {props.users.slice(0, 4).map((user, index) => (
                <div
                    key={user.id}
                    className={styles.userbadgelement}
                    style={{
                        backgroundColor: user.color,
                        zIndex: -index,
                        left: index * 8,
                    }}>
                    {props.users.length}
                </div>
            ))}
        </div>
    )
}
