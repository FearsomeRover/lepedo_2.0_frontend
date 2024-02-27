import { User } from '@/types/user'

export type Participation = {
    userId: string
    amount: number
    status: ParticipationStatus
}

export enum ParticipationStatus {
    ACCEPTED,
    DECLINED,
    NONE,
}
