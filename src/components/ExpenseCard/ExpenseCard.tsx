import { ExpenseType } from '@/types/expense'
import styles from './expensecard.module.css'
import ExpenseItemRow from '@/components/ExpenseCard/ExpenseItemRow'
import HorizontalLine from '@/components/HorizontalLine/HorizontalLine'
import UserCardSimple from '@/components/UserCard/UserCardSimple'
import { formatAmount } from 'utils/formatAmount'
import { ParticipationStatus } from '@/types/participation'

export default function ExpenseCard({ expense }: { expense: ExpenseType }) {
    const total = expense.items.reduce((acc, item) => acc + item.price, 0)
    const isAcceptedTottaly = expense.items.every((item) =>
        item.participations.every((part) => part.status === ParticipationStatus.ACCEPTED),
    )

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
                                participations={item.participations}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            <h6 className={'middleinside'}>További 3 tétel, amiben nem vettél részt</h6>

            <HorizontalLine />
            <div className={'flex-row-space-between'}>
                <h5 className={'bold'}>Te:</h5>
                <p className={'right'}>{formatAmount(total)} Ft</p>
            </div>
            <div className={'flex-row-space-between m8top'}>
                <h5 className={'bold'}>Összesen:</h5>
                <p className={'right'}>{formatAmount(total)} Ft</p>
            </div>

            {/*todo if not participation status is none*/}
            <div>
                <HorizontalLine />
                <div className={'flex-row-space-between'}>
                    <button className={'sbtn'} style={{ marginRight: '16px' }}>
                        Approve
                    </button>
                    <button className={'sbtn'}> Decline</button>
                </div>
            </div>
        </div>
    )
}
