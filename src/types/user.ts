export type User = {
    id?: string
    revTag: string
    name: string
    color: string
    spent: number
    paid: number
    transferfrom: number
    transferto: number
    balance: number
    deleteable: boolean
    email: string
    auth0sub: string
}
export type BasicUser = {
    id: string
    name: string
    color: string
    revTag: string
}
