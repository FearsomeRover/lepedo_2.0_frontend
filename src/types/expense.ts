import { Item } from './item'
import { BasicUser, User } from './user'

export type ExpenseType = {
    id: string
    title: string
    amount: number
    payerId: string
    payer: BasicUser
    date: string
    received: BasicUser[]
    items: Item[]
}
