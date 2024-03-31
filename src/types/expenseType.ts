import { BasicItem, Item } from './item'
import { BasicUser } from './user'

export type ExpenseType = {
    id: string
    title: string
    amount: number
    date?: string
    payer: BasicUser
    items: Item[]
    final?: boolean
}

export type BasicExpenseType = {
    id: string
    title: string
    amount: number
    date?: string
    payer: BasicUser
    received: BasicUser[]
    items: BasicItem[]
    final?: boolean
    optimisticPending?: boolean
}
