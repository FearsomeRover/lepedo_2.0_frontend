'use client'
import ExpenseCard from '@/components/ExpenseCard/ExpenseCard'
import { DBUserProvider } from '@/app/dbUserContext'
import { useKeyboardShortcut } from '../../../hooks/useKeyboardShorcut'
import { useState } from 'react'

const dummyUser = {
    id: 'sdfa',
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
    id: 'sdfada',
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
    id: 'sdffsda',
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

const dummyItem = {
    id: 'asdf',
    name: 'Milk',
    price: 123,
}

const dummyExpense = {
    id: 'adsf',
    title: 'Shopping',
    amount: 12343,
    payerId: 'asdf',
    date: '2022-10-10',
    received: [dummyUser, dummyUser2, dummyUser3],
    payer: dummyUser,
    items: [dummyItem],
}

export default function Page() {
    const [pressed, setPressed] = useState(0)
    useKeyboardShortcut(['ctrl', 'k'], () => {
        setPressed(1)
    })
    useKeyboardShortcut([], () => {
        setPressed(0)
    })
    return (
        <>
            {pressed == 1 && <p>K PRESSED</p>}
            {ExpenseCard(dummyExpense)}
            {ExpenseCard(dummyExpense)}
            <form>
                <input type={'text'} />
            </form>
        </>
    )
}
