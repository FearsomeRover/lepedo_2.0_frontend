import { BasicUser } from './user'

export type TransferType = {
    id: string
    date?: string
    title: string
    amount: number
    /*    userFromId: string*/
    userFrom: BasicUser
    /*    userToId: string*/
    userTo: BasicUser
}
