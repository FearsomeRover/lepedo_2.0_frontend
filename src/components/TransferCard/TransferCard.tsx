import { BasicExpenseType, ExpenseType } from '@/types/expenseType'
import styles from './transfercard.module.css'
import ExpenseItemRow from '@/components/ExpenseCard/ExpenseItemRow'
import HorizontalLine from '@/components/HorizontalLine/HorizontalLine'
import UserCardSimple from '@/components/UserCard/UserCardSimple'
import { formatAmount } from 'utils/formatAmount'
import { ParticipationStatus } from '@/types/participation'
import { TransferType } from '@/types/transferType'
import React from 'react'
import Image from 'next/image'

export default function TransferCard({ transfer }: { transfer: TransferType }) {
    return (
        <div className={styles.transfercard}>
            <h4>{transfer.title}</h4>
            <h6 className={'nomargin'}>{transfer.date}</h6>
            <div className={'h1'}></div>
            <p className={'fs24 nomargin w100 middleinside'}>{transfer.amount} Ft</p>
            <div className={'h1'}></div>
            <div className={'flex-row-space-between'}>
                <UserCardSimple name={transfer.userFrom.name} color={transfer.userFrom.color} onClick={() => {}} />
                <div className={'imageContainer'}>
                    <Image className={'arrow'} src="/images/arrow-right.svg" alt="arrow-right" fill></Image>
                </div>
                <UserCardSimple name={transfer.userTo.name} color={transfer.userTo.color} onClick={() => {}} />
            </div>
        </div>
    )
}
