import React from 'react'
import styles from './expensecard.module.css'
import UsersBagde from '@/components/UserCard/UsersBadge'
import { Item } from '@/types/item'

export default function ExpenseItemRow(item: Item) {
    return (
        <tr className={styles.expenserow}>
            <td>
                <h5>{item.name}</h5>
            </td>
            <td>
                <p className={styles.expenserowprice}>{item.price} Ft</p>
            </td>
            <td className={'min-width'}>
                <UsersBagde users={item.participated} />
            </td>
        </tr>
    )
}
