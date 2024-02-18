'use client'
import ExpenseCard from '@/components/ExpenseCard/ExpenseCard'
import { useKeyboardShortcut } from '../../../hooks/useKeyboardShorcut'
import { useState } from 'react'
import UsersBagde from '@/components/UserCard/UsersBadge'
import { Item } from '@/types/item'
import { BasicUser } from '@/types/user'
import { ExpenseType } from '@/types/expense'
import KeyCap from '@/components/KeyCap/KeyCap'

export default function Page() {
    return (
        <>
            <KeyCap keya={'A'} />
            <KeyCap keya={'Ctrl'} />
        </>
    )
}
