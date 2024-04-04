import { BasicExpenseType } from '@/types/expenseType'
import styles from './expensecard.module.css'
import ExpenseItemRow from '@/components/ExpenseCard/ExpenseItemRow'
import HorizontalLine from '@/components/HorizontalLine/HorizontalLine'
import UserCardSimple from '@/components/UserCard/UserCardSimple'
import { formatAmount } from '@/utils/formatAmount'
import { useState } from 'react'
import ItemActionRow from '@/components/QuickActionButtons/ItemActionRow'

type ExpenseCardProps = {
    expense: BasicExpenseType
    onEdit?: (cur: BasicExpenseType) => void
    onDelete?: (cur: BasicExpenseType) => void
}

export default function ExpenseCard({ expense, onEdit, onDelete }: ExpenseCardProps) {
    const total = expense.items.reduce((acc, item) => acc + item.price, 0)
    const [hover, setHover] = useState(false)

    return (
        <div
            className={expense.optimisticPending ? '$styles.expensecard dashed' : styles.expensecard}
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            <h4>{expense.title}</h4>
            <h6 className={'nomargin'}>{expense.date}</h6>

            <div className={styles.righttop}>
                <UserCardSimple name={expense.payer.name} color={expense.payer.color} onClick={() => {}} />
            </div>

            <div className={'h1'}></div>
            <div className={styles.itemsplayground}>
                <table>
                    <tbody>
                        {expense.items.map((item) => (
                            <ExpenseItemRow
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                price={item.price}
                                participated={item.participated}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            <h6 className={'middleinside'}>További 3 tétel, amiben nem vettél részt</h6>

            <HorizontalLine />
            <div className={'flex-row-space-between'}>
                <h5 className={'bold '}>Összesen:</h5>
                <p className={'right '}>{formatAmount(total)} Ft</p>
            </div>
            <div className={'flex-row-space-between m8top'}>
                <h5 className={'bold fs18'}>Te:</h5>
                <p className={'right fs18'}>{formatAmount(total)} Ft</p>
            </div>

            <div>
                {/*todo if not participation status is none*/}
                <HorizontalLine />
                <div className={'flex-row-space-around nomargininside'}>
                    <button className={'sbtn fs14'} style={{ marginRight: '16px' }}>
                        Decline
                    </button>
                    <button className={'sbtn fs14'}>Approve</button>
                </div>
                {/*todo set visible if is owner*/}
                <div className={'middleinside nomargin'}>
                    <ItemActionRow
                        visible={hover}
                        onEdit={onEdit ? () => onEdit(expense) : undefined}
                        onDelete={onDelete ? () => onDelete(expense) : undefined}
                    />
                </div>
            </div>
        </div>
    )
}
