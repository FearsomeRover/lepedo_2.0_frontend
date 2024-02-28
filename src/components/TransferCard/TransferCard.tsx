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
import { Button } from 'react-native'

export default function TransferCard({ transfer }: { transfer: TransferType }) {
    return (
        <div className={styles.transfercard}>
            <h4>{transfer.title}</h4>
            <h6 className={'nomargin'}>{transfer.date}</h6>
            {/*<div className={styles.righttop}>
                <button className={'sbtn nomargin p8'}>
                    <h4>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M5.5 5.5C5.63261 5.5 5.75979 5.55268 5.85355 5.64645C5.94732 5.74021 6 5.86739 6 6V12C6 12.1326 5.94732 12.2598 5.85355 12.3536C5.75979 12.4473 5.63261 12.5 5.5 12.5C5.36739 12.5 5.24021 12.4473 5.14645 12.3536C5.05268 12.2598 5 12.1326 5 12V6C5 5.86739 5.05268 5.74021 5.14645 5.64645C5.24021 5.55268 5.36739 5.5 5.5 5.5ZM8 5.5C8.13261 5.5 8.25979 5.55268 8.35355 5.64645C8.44732 5.74021 8.5 5.86739 8.5 6V12C8.5 12.1326 8.44732 12.2598 8.35355 12.3536C8.25979 12.4473 8.13261 12.5 8 12.5C7.86739 12.5 7.74021 12.4473 7.64645 12.3536C7.55268 12.2598 7.5 12.1326 7.5 12V6C7.5 5.86739 7.55268 5.74021 7.64645 5.64645C7.74021 5.55268 7.86739 5.5 8 5.5ZM11 6C11 5.86739 10.9473 5.74021 10.8536 5.64645C10.7598 5.55268 10.6326 5.5 10.5 5.5C10.3674 5.5 10.2402 5.55268 10.1464 5.64645C10.0527 5.74021 10 5.86739 10 6V12C10 12.1326 10.0527 12.2598 10.1464 12.3536C10.2402 12.4473 10.3674 12.5 10.5 12.5C10.6326 12.5 10.7598 12.4473 10.8536 12.3536C10.9473 12.2598 11 12.1326 11 12V6Z"
                                fill="black"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M14.5 3C14.5 3.26522 14.3946 3.51957 14.2071 3.70711C14.0196 3.89464 13.7652 4 13.5 4H13V13C13 13.5304 12.7893 14.0391 12.4142 14.4142C12.0391 14.7893 11.5304 15 11 15H5C4.46957 15 3.96086 14.7893 3.58579 14.4142C3.21071 14.0391 3 13.5304 3 13V4H2.5C2.23478 4 1.98043 3.89464 1.79289 3.70711C1.60536 3.51957 1.5 3.26522 1.5 3V2C1.5 1.73478 1.60536 1.48043 1.79289 1.29289C1.98043 1.10536 2.23478 1 2.5 1H6C6 0.734784 6.10536 0.48043 6.29289 0.292893C6.48043 0.105357 6.73478 0 7 0L9 0C9.26522 0 9.51957 0.105357 9.70711 0.292893C9.89464 0.48043 10 0.734784 10 1H13.5C13.7652 1 14.0196 1.10536 14.2071 1.29289C14.3946 1.48043 14.5 1.73478 14.5 2V3ZM4.118 4L4 4.059V13C4 13.2652 4.10536 13.5196 4.29289 13.7071C4.48043 13.8946 4.73478 14 5 14H11C11.2652 14 11.5196 13.8946 11.7071 13.7071C11.8946 13.5196 12 13.2652 12 13V4.059L11.882 4H4.118ZM2.5 3V2H13.5V3H2.5Z"
                                fill="black"
                            />
                        </svg>
                        delete
                    </h4>
                </button>
            </div>*/}
            <div className={'h1'}></div>
            <p className={'fs24 nomargin w100 middleinside'}>{formatAmount(transfer.amount)} Ft</p>
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
