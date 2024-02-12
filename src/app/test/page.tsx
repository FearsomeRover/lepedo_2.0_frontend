'use client'
import ExpenseCard from '@/components/ExpenseCard/ExpenseCard'
import { useKeyboardShortcut } from '../../../hooks/useKeyboardShorcut'
import { useState } from 'react'
import UsersBagde from '@/components/UserCard/UsersBadge'
import { Item } from '@/types/item'
import { BasicUser } from '@/types/user'
import { ExpenseType } from '@/types/expense'

const dummyUser: BasicUser = {
    id: 'sdfffa',
    revTag: 'rte',
    name: 'Test User',
    color: '#123456',
}
const dummyUser2: BasicUser = {
    id: 'sdsdaafada',
    revTag: 'rtdfe',
    name: 'Test User2',
    color: '#51af2d',
}
const dummyUser3: BasicUser = {
    id: 'sdffwwsda',
    revTag: 'rxte',
    name: 'Test User3',
    color: '#c013a4',
}

const dummyItem: Item = {
    id: 'asdf',
    name: 'Milk',
    price: 123,
    participated: [dummyUser],
}

const dummyItem2: Item = {
    id: 'ww',
    name: 'PS5',
    price: 123423,
    participated: [dummyUser2, dummyUser3, dummyUser],
}

const dummyExpense: ExpenseType = {
    id: 'adsf',
    title: 'Shopping',
    amount: 12343,
    payerId: 'asdf',
    date: '2022-10-10',
    received: [dummyUser, dummyUser2, dummyUser3],
    payer: dummyUser,
    items: [dummyItem, dummyItem2],
}

export default function Page() {
    return (
        <>
            <ExpenseCard expense={dummyExpense} />
            <ExpenseCard expense={dummyExpense} />
            <form>
                <input type={'text'} />
            </form>
            <UsersBagde
                users={[dummyUser, dummyUser2, dummyUser3]}></UsersBagde>
        </>
    )
}
