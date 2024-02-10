import { ExpenseType } from '@/types/expense'
import styles from './expensecard.module.css'
import ExpenseRow from '@/components/ExpenseCard/ExpenseRow'

export default function ExpenseCard({ expense }: { expense: ExpenseType }) {
    return (
        <div className={styles.expensecard}>
            <h4>{expense.title}</h4>
            <h5 className={styles.date}>{expense.date}</h5>
            <div className={'h1'}></div>
            {expense.items.map((item) => (
                <ExpenseRow
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    participated={item.participated}
                />
            ))}
        </div>
    )
}
