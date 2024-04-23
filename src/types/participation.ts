export type Participation = {
    userId: string
    amount: number
    status: ParticipationStatus
    updatedManually?: number
}

export enum ParticipationStatus {
    ACCEPTED,
    DECLINED,
    NONE,
}
