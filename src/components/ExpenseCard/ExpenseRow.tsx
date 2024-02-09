import React from 'react'
import styles from './expenseCard.module.css'
import UsersBagde from '@/components/UserCard/UsersBadge'

export default function ExpenseRow(item: Item) {
    return (
        <div className={styles.expenserow}>
            <h5>{item.name}</h5>
            <p className={styles.expenserowprice}>{item.price} Ft</p>
            <UsersBagde users={item.participated} />
        </div>
    )
}
