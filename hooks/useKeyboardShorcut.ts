import { KeyboardEvent, useEffect } from 'react'

type Key = 'ctrl' | 'shift' | 'alt' | string

export const useKeyboardShortcut = (keys: Key[], callback: () => void) => {
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

            if (
                keys.every(
                    (key) =>
                        (key === 'ctrl' && event.ctrlKey) ||
                        (key === 'shift' && event.shiftKey) ||
                        (key === 'alt' && event.altKey) ||
                        (typeof key === 'string' &&
                            event.key.toLowerCase() === key),
                )
            ) {
                callback()
                event.preventDefault() // Prevent default browser shortcuts
            }
        }

        // @ts-ignore
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            // @ts-ignore
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [keys, callback])
}
