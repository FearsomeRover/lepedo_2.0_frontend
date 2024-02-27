import { BasicUser, User } from './user'
import { Participation } from '@/types/participation'

export type Item = {
    id: string
    name: string
    price: number
    participated: BasicUser[]
    participations: Participation[]
}
