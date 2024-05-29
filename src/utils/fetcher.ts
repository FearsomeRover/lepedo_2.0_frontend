import axios from 'axios'
import { User } from '@/types/user'
import { QrType } from '@/types/qr'
import * as process from 'process'

export function fetcher<T>(url: string): Promise<T> {
    return axios.get(url).then((res) => res.data)
}
export const shortFetcher = (url: string) => axios.get(process.env.NEXT_PUBLIC_BASE_URL + url).then((res) => res.data)

export async function axiosPatchFetcher<T, U>(url: string, { arg }: { arg: U }): Promise<T> {
    const response = await axios.patch(url, arg)
    return response.data
}

export const postUser = (url: string, arg: User, patch?: boolean) => axios.post(url, arg).then((res) => res.data)
export const postExpense = (arg: any, patch?: string): any => {
    if (patch)
        return axios
            .patch(process.env.NEXT_PUBLIC_BASE_URL + '/expense/' + patch, arg)
            .then(() => shortFetcher('/expense'))
    else return axios.post(process.env.NEXT_PUBLIC_BASE_URL + '/expense', arg).then(() => shortFetcher('/expense'))
}

export const postTransfer = (arg: any, patch?: string): any => {
    if (patch !== undefined)
        return axios
            .patch(process.env.NEXT_PUBLIC_BASE_URL + '/transfer/' + patch, arg)
            .then(() => shortFetcher('/transfer'))
    else return axios.post(process.env.NEXT_PUBLIC_BASE_URL + '/transfer', arg).then(() => shortFetcher('/transfer'))
}
export const postQR = (arg: QrType, patch?: string): any => {
    if (patch) axios.patch(process.env.NEXT_PUBLIC_BASE_URL + '/qrs/' + patch, arg).then(() => shortFetcher('/qrs'))
    else axios.post(process.env.NEXT_PUBLIC_BASE_URL + '/qrs', arg).then(() => shortFetcher('/qrs'))
}
