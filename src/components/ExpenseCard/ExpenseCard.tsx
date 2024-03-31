import { BasicExpenseType } from '@/types/expenseType'
import styles from './expensecard.module.css'
import ExpenseItemRow from '@/components/ExpenseCard/ExpenseItemRow'
import HorizontalLine from '@/components/HorizontalLine/HorizontalLine'
import UserCardSimple from '@/components/UserCard/UserCardSimple'
import { formatAmount } from '@/utils/formatAmount'

export default function ExpenseCard({ expense }: { expense: BasicExpenseType }) {
    const total = expense.items.reduce((acc, item) => acc + item.price, 0)

    return (
        <div className={styles.expensecard}>
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

            {/*todo if not participation status is none*/}
            <div>
                <HorizontalLine />
                <div className={'flex-row-space-around nomargininside'}>
                    <button className={'sbtn fs14'} style={{ marginRight: '16px' }}>
                        Decline
                    </button>
                    <button className={'sbtn fs14'}>Approve</button>
                </div>
            </div>
        </div>
    )
}
