import UserCardSimple from '@/components/UserCard/UserCardSimple'
import Image from 'next/image'
import React from 'react'
import { BasicUser } from '@/types/user'

type UserRelationRowProps = {
    user1: BasicUser
    user2: BasicUser
}

export default function UserRelationRow(props: UserRelationRowProps) {
    return (
        <div className={'flex-row-space-between'}>
            <UserCardSimple name={props.user1.name} color={props.user1.color} onClick={() => {}} />
            <div className={'imageContainer'}>
                <Image className={'arrow'} src="/images/arrow-right.svg" alt="arrow-right" fill></Image>
            </div>
            <UserCardSimple name={props.user2.name} color={props.user2.color} onClick={() => {}} />
        </div>
    )
}
