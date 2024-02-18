import styles from './KeyCap.module.css'

export default function KeyCap(props: { keya: string }) {
    return <div className={styles.cap}>{props.keya}</div>
}
