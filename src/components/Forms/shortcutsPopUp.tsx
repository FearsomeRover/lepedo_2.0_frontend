import styles from './forms.module.css'

type shortcutsPopUpProps = {
    //todo
}
export default function ShortcutsPopUp(props: shortcutsPopUpProps) {
    return (
        <div className={styles.popup}>
            <h1>Shortcuts</h1>
            <p>Ctrl + S: Save</p>
            <p>Ctrl + N: New</p>
            <p>Ctrl + O: Open</p>
            <p>Ctrl + P: Print</p>
            <p>Ctrl + Z: Undo</p>
            <p>Ctrl + Y: Redo</p>
            <p>Ctrl + X: Cut</p>
            <p>Ctrl + C: Copy</p>
            <p>Ctrl + V: Paste</p>
            <p>Ctrl + A: Select all</p>
            <p>Ctrl + F: Find</p>
            <p>Ctrl + H: Replace</p>
            <p>Ctrl + G: Go to</p>
            <p>Ctrl + Shift + S: Save as</p>
            <p>Ctrl + Shift + N: New window</p>
            <p>Ctrl + Shift + O: Open</p>
            <p>Ctrl + Shift + P: Print</p>
            <p>Ctrl + Shift + Z: Redo</p>
            <p>Ctrl + Shift + X: Cut</p>
            <p>Ctrl + Shift + C: Copy</p>
            <p>Ctrl + Shift + V: Paste</p>
            <p>Ctrl + Shift + A: Select all</p>
        </div>
    )
}
