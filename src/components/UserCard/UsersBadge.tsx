'use client'
import { BasicUser, User } from '@/types/user'
import styles from './usercard.module.css'
import { useEffect } from 'react'

type UsersBadgeProps = {
    users: BasicUser[]
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
                        left: index * 6,
                    }}>
                    {props.users.length}
                </div>
            ))}
        </div>
    )
}
