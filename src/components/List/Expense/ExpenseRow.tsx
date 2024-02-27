import { ExpenseType } from '@/types/expenseType'
import UserCard from '@/components/UserCard/UserCard'
import styles from '../list.module.css'
import axios from 'axios'
import Image from 'next/image'
type ExpenseRowProps = {
    expense: ExpenseType
    refresh: () => void
    editExpense: (expenseId: string) => void
}
export default function ExpenseRow(props: ExpenseRowProps) {
    const handleExpenseDelete = async () => {
        await axios.delete(process.env.NEXT_PUBLIC_BASE_URL + '/expense/' + props.expense.id)
        props.refresh()
    }
    return (
        <tr>
            <td>
                <p className="left">...{props.expense.id.slice(-4)}</p>
            </td>
            <td>
                <p>{props.expense.title} </p>
            </td>

            <td className={styles.center}>
                <UserCard user={props.expense.payer} />
            </td>
            <td className={styles.center}>
                <Image src="/images/arrow-right.svg" alt="arrow-right" width={29} height={24} />
            </td>
            <td className={styles.center}>
                {props.expense.received.map((user) => (
                    <UserCard user={user} key={user.id} />
                ))}
            </td>
            <td>
                <p className={styles.center}> {props.expense.date} </p>
            </td>
            <td>
                <p className={styles.amount}> {props.expense.amount} Ft </p>
            </td>
            <td className={styles.amount}>
                <button onClick={() => props.editExpense(props.expense.id)}>
                    <Image src="/images/pencil.svg" alt="edit" width="16" height="16" />
                </button>
                <button onClick={handleExpenseDelete}>
                    <Image src="/images/trash.svg" alt="delete" width="16" height="16" />
                </button>
            </td>
        </tr>
    )
}
