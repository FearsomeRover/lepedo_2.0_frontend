import { ExpenseType } from '@/types/expense'
import styles from './expensecard.module.css'
import ExpenseItemRow from '@/components/ExpenseCard/ExpenseItemRow'
import HorizontalLine from '@/components/HorizontalLine/HorizontalLine'
import UserCardSimple from '@/components/UserCard/UserCardSimple'
import StatusButton from '@/components/Button/StatusButton'

export default function ExpenseCard({ expense }: { expense: ExpenseType }) {
    const total = expense.items.reduce((acc, item) => acc + item.price, 0)

    return (
        <div className={styles.expensecard}>
            <h4>{expense.title}</h4>
            <div className={styles.righttop}>
                <StatusButton
                    title={'Elfogad'}
                    text={'OK'}
                    color={'green'}
                    onClick={() => {}}
                />
                <StatusButton
                    title={'Elutasít'}
                    text={'X'}
                    color={'red'}
                    onClick={() => {}}
                />
                <h6>{expense.date}</h6>
            </div>
            <div className={'m8top'}>
                <UserCardSimple
                    name={expense.payer.name}
                    color={expense.payer.color}
                    onClick={() => {}}
                />
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

            <h6 className={'middleinside'}>
                További 3 tétel, amiben nem vettél részt
            </h6>

            <HorizontalLine />
            <div className={'flex-row-space-between'}>
                <h5 className={'bold'}>Te:</h5>
                <p className={'right'}>{total} Ft</p>
            </div>
            <div className={'flex-row-space-between m8top'}>
                <h5 className={'bold'}>Összesen:</h5>
                <p className={'right'}>{total} Ft</p>
            </div>
        </div>
    )
}
