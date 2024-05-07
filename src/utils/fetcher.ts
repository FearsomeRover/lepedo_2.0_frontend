import axios from 'axios'
import { User } from '@/types/user'
import { ExpenseType } from '@/types/expenseType'
import { TransferType } from '@/types/transferType'
import { QrType } from '@/types/qr'

export const fetcher = (url: string) => axios.get(url).then((res) => res.data)

export const postUser = (url: string, arg: User) => axios.post(url, arg).then((res) => res.data)
export const postExpense = (url: string, arg: ExpenseType) => axios.post(url, arg).then((res) => res.data)
export const postTransfer = (url: string, arg: TransferType) => axios.post(url, arg).then((res) => res.data)
export const postQR = (url: string, arg: QrType) => axios.post(url, arg).then((res) => res.data)
