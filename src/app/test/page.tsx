'use client'
import ExpenseCard from '@/components/ExpenseCard/ExpenseCard'
import { useKeyboardShortcut } from '../../../hooks/useKeyboardShorcut'
import { useState } from 'react'
import UsersBagde from '@/components/UserCard/UsersBadge'

const dummyUser = {
    id: 'sdfffa',
    revTag: 'rte',
    name: 'Test User',
    color: '#123456',
    spent: 2243,
    paid: 243,
    transferfrom: 1432,
    transferto: 4132,
    balance: 1432,
    deleteable: false,
    email: 'valam',
    auth0sub: 'fads',
}
const dummyUser2 = {
    id: 'sdsdaafada',
    revTag: 'rtdfe',
    name: 'Test User2',
    color: '#51af2d',
    spent: 2243,
    paid: 243,
    transferfrom: 1432,
    transferto: 4132,
    balance: 1432,
    deleteable: false,
    email: 'valam',
    auth0sub: 'ffsdads',
}
const dummyUser3 = {
    id: 'sdffwwsda',
    revTag: 'rxte',
    name: 'Test User3',
    color: '#c013a4',
    spent: 2243,
    paid: 243,
    transferfrom: 1432,
    transferto: 4132,
    balance: 1432,
    deleteable: false,
    email: 'valam',
    auth0sub: 'fadfsads',
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

const dummyExpense = {
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
            {ExpenseCard(dummyExpense)}
            {ExpenseCard(dummyExpense)}
            <form>
                <input type={'text'} />
            </form>
            <UsersBagde
                users={[dummyUser, dummyUser2, dummyUser3]}></UsersBagde>
        </>
    )
}
