import { BasicUser } from './user'

export type Transfer = {
    id: string
    date: string
    amount: number
    userFromId: string
    userFrom: BasicUser
    userToId: string
    userTo: BasicUser
}
