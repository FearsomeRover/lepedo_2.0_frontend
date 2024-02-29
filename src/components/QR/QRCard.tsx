import { QrType } from '@/types/qr'
import UserCardSimple from '@/components/UserCard/UserCardSimple'
import styles from './qrcard.module.css'

export default function QRCard(props: QrType) {
    return (
        <div className={styles.qrcard}>
            <details className={'spookydetails'}>
                <summary className={'spookydetails'}>
                    <h4>{props.title}</h4>
                    <div className={'h1'}></div>
                    <p className={'podkova w100 nomargin middleinside'}>{props.amount} Ft</p>
                    <div className={styles.righttop}>
                        <UserCardSimple name={props.userTo.name} color={props.userTo.color} />
                    </div>
                </summary>
                <p>dsifjsdkfjsd sadfkdsjf</p>
            </details>
        </div>
    )
}
