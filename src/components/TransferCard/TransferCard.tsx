import styles from './transfercard.module.css'
import { formatAmount } from '@/utils/formatAmount'
import { TransferType } from '@/types/transferType'
import React from 'react'
import UserRelationRow from '@/components/UserCard/UserRelationRow'
import ItemActionRow from '@/components/QuickActionButtons/ItemActionRow'

type TransferCardProps = {
    transfer: TransferType
    onDelete?: (cur: TransferType) => void
    onEdit?: (cur: TransferType) => void
}

export default function TransferCard(props: TransferCardProps) {
    const [hover, setHover] = React.useState(false)
    return (
        <div className={styles.transfercard} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            <h4>{props.transfer.title}</h4>
            <ItemActionRow
                visible={hover}
                onDelete={
                    props.onDelete
                        ? () => {
                              props.onDelete!(props.transfer)
                          }
                        : undefined
                }
                onEdit={
                    props.onDelete
                        ? () => {
                              props.onEdit!(props.transfer)
                          }
                        : undefined
                }
            />
            <h6 className={'nomargin'}>{props.transfer.date}</h6>
            <div className={'h1'}></div>
            <p className={'fs24 nomargin w100 middleinside'}>{formatAmount(props.transfer.amount)} Ft</p>
            <div className={'h1'}></div>
            <UserRelationRow user1={props.transfer.userFrom} user2={props.transfer.userTo} />
        </div>
    )
}
