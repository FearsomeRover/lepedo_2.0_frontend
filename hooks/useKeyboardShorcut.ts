import { KeyboardEvent, useEffect, useState } from 'react'

type Key = 'ctrl' | 'shift' | 'alt' | 'esc' | string

export const useKeyboardShortcut = (keys: Key[], callback: (idxOfKey?: number) => void) => {
    /*    const [ctrlPressed, setCtrlPressed] = useState(false)*/

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const targetTagName = (event.target as HTMLElement)?.tagName?.toLowerCase()

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
            const index = keys.findIndex((key) => {
                switch (key) {
                    case 'ctrl':
                        return event.ctrlKey
                    case 'shift':
                        return event.shiftKey
                    case 'alt':
                        return event.altKey
                    case 'esc':
                        return event.key === 'Escape'
                    default:
                        return event.key.toLowerCase() === key
                }
            })

            if (index !== -1) {
                callback(index)
                event.preventDefault() // Prevent default browser behavior
            }
        }
        /*      const handleKeyUp = (event: KeyboardEvent) => {
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
