import { BasicExpenseType } from '@/types/expenseType'
import { TransferType } from '@/types/transferType'

export function filter(expense: BasicExpenseType, filterPhrase: string): boolean
export function filter(expense: TransferType, filterPhrase: string): boolean

export function filter(filtered: BasicExpenseType | TransferType, filterPhrase: string): boolean {
    if (filterPhrase === '') return true
    if (filtered.title.toLowerCase().includes(filterPhrase.toLowerCase())) return true
    if (filtered.date && filtered.date.toLowerCase().includes(filterPhrase.toLowerCase())) return true
    if (filtered.amount.toString().toLowerCase().includes(filterPhrase.toLowerCase())) return true
    if ('payer' in filtered) {
        if (filtered.payer.name.toLowerCase().includes(filterPhrase.toLowerCase())) return true
    }
    if ('items' in filtered) {
        if (filtered.items.some((item) => item.name.toLowerCase().includes(filterPhrase.toLowerCase()))) return true
    }
    if ('userFrom' in filtered) {
        if (filtered.userFrom.name.toLowerCase().includes(filterPhrase.toLowerCase())) return true
        if (filtered.userTo.name.toLowerCase().includes(filterPhrase.toLowerCase())) return true
    }
    return false
}
