import axios from 'axios'
import { User } from '@/types/user'
import { TransferType } from '@/types/transferType'
import { QrType } from '@/types/qr'
import * as process from 'process'

export const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export const postUser = (url: string, arg: User) => axios.post(url, arg).then((res) => res.data)
export const postExpense = (arg: any) =>
    axios
        .post(process.env.NEXT_PUBLIC_BASE_URL + '/expense', arg)
        .then((res) => fetcher(process.env.NEXT_PUBLIC_BASE_URL + '/expense'))
export const postTransfer = (arg: TransferType) =>
    axios.post(process.env.NEXT_PUBLIC_BASE_URL + '/transfer', arg).then((res) => res.data)
export const postQR = (url: string, arg: QrType) => axios.post(url, arg).then((res) => res.data)
