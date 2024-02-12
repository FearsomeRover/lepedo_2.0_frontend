import { BasicUser, User } from './user'

export type Item = {
    id: string
    name: string
    price: number
    participated: BasicUser[]
}
