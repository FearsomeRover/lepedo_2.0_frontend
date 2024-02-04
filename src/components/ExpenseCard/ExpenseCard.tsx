'use client'
import { ExpenseType } from '@/types/expense'
import styles from './expenseCard.module.css'
import UserCardSimple from '@/components/UserCard/UserCardSimple'

export default function ExpenseCard(expense: ExpenseType) {
    return (
        <div className={styles.expensecard}>
            <h3>{expense.title}</h3>
            <p>{expense.amount} Ft</p>
            <h5>{expense.date}</h5>
            <div className={styles.userplayground}>
                valami
                {expense.received.map((user) => (
                    <UserCardSimple key={user.id} name={user.name} revTag={user.revTag} onClick={() => {
                    }} color={user.color} />
                ))}
            </div>
        </div>
    )
}