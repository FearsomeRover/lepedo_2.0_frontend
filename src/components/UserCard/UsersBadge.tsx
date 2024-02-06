'use client'
import styles from './usercard.module.css'
import { useEffect } from 'react'

type UsersBadgeProps = {
    users: User[]
}

export default function UsersBagde(props: UsersBadgeProps) {
    /*    useEffect(() => {
        if(props.users.length > 4) {

        }
    }, [])*/

    return (
        <div className={styles.userbadgecontainer}>
            {props.users.slice(0, 4).map((user, index) => (
                <div
                    key={user.id}
                    className={styles.userbadgebehind}
                    style={{
                        backgroundColor: user.color,
                        zIndex: -index,
                        left: -index * 23,
                    }}>
                    {props.users.length}
                </div>
            ))}
        </div>
    )
}
