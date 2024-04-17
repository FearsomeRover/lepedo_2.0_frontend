'use client'
import styles from '@/components/Forms/forms.module.css'
import UserCardSimple from '@/components/UserCard/UserCardSimple'
import { BasicUser } from '@/types/user'
import { useState } from 'react'

type UserPlaygroundProps = {
    users: BasicUser[]
    selectedUsers: BasicUser[]
    onClickCallback: (user: BasicUser) => void
}
export default function UserPlayground({ users, onClickCallback, selectedUsers }: UserPlaygroundProps) {
    const [searchPhrase, setSearchPhrase] = useState<string>('')
    return (
        <>
            <input
                className={'w50-desktop floatright right     searchinput'}
                type="text"
                placeholder="Keresés..."
                onChange={(s) => setSearchPhrase(s.target.value)}
            />
            <div className={styles.userbucket}>
                {users
                    .filter((user) => user.name.toLowerCase().includes(searchPhrase.toLowerCase()))
                    .map((user) => (
                        <div key={user.id} className={'inline-block m4top m4right'}>
                            <UserCardSimple
                                name={user.name}
                                color={user.color}
                                revTag={user.revTag}
                                isSelected={selectedUsers.includes(user)}
                                onClick={() => onClickCallback(user)}
                            />
                        </div>
                    ))}
            </div>
        </>
    )
}
