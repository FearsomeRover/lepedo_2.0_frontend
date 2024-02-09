import { KeyboardEvent, useEffect, useState } from 'react'

type Key = 'ctrl' | 'shift' | 'alt' | 'esc' | string

export const useKeyboardShortcut = (keys: Key[], callback: () => void) => {
    /*    const [ctrlPressed, setCtrlPressed] = useState(false)*/

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const targetTagName = (
                event.target as HTMLElement
            )?.tagName?.toLowerCase()

            // Check if the event originated from an input field or textarea
            if (targetTagName === 'input' || targetTagName === 'textarea') {
                return
            }

            // Prevent default browser shortcuts
            if (event.ctrlKey || event.altKey || event.metaKey) {
                event.preventDefault()
            }
            /*
            if (event.ctrlKey && !ctrlPressed) {
                setCtrlPressed(true)
            }
*/

            if (
                keys.every(
                    (key) =>
                        (key === 'ctrl' && event.ctrlKey) ||
                        /*                        ctrlPressed ||*/
                        (key === 'shift' && event.shiftKey) ||
                        (key === 'alt' && event.altKey) ||
                        (key === 'esc' && event.key === 'Escape') ||
                        (typeof key === 'string' &&
                            event.key.toLowerCase() === key),
                )
            ) {
                callback()
                event.preventDefault() // Prevent default browser behavior
            }
        }

        /*        const handleKeyUp = (event: KeyboardEvent) => {
            if (event.ctrlKey && ctrlPressed) {
                setCtrlPressed(false)
            }
        }
        console.log('ctrl ' + ctrlPressed)*/

        // @ts-ignore
        window.addEventListener('keydown', handleKeyDown)
        /*        // @ts-ignore
        window.addEventListener('keyup', handleKeyUp)*/

        return () => {
            // @ts-ignore
            window.removeEventListener('keydown', handleKeyDown)
            /*            // @ts-ignore
            window.removeEventListener('keyup', handleKeyUp)*/
        }
    }, [keys, callback])
}
