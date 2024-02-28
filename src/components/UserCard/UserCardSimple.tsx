import { useEffect, useRef, useState } from 'react'

type SimpleUserProps = {
    name: string
    revTag?: string
    color: string
    isSelected?: boolean
    isHoverable?: boolean
    onClick?: () => void
    isAlignedToCenter?: boolean
}

export default function UserCardSimple(simple: SimpleUserProps) {
    const nameRef = useRef<HTMLDivElement>(null)
    const revTagRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const [nameWidth, setNameWidth] = useState<number>(nameRef.current ? nameRef.current.offsetWidth : 0)
    const [revTagWidth, setRevTagWidth] = useState<number>(0)

    useEffect(() => {
        if (nameRef.current) {
            setNameWidth(nameRef.current.offsetWidth)
        }
    }, [simple.name, simple.revTag])

    useEffect(() => {
        if (revTagRef.current) {
            setRevTagWidth(revTagRef.current.offsetWidth)
        }
        console.log(revTagRef.current)
    }, [simple.revTag, isHovered])

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }
    return (
        <div
            style={{ minWidth: Math.max(nameWidth, revTagWidth) }}
            className={simple.isAlignedToCenter ? 'usertagcontainer middleinside' : 'usertagcontainer'}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            {isHovered && simple.isHoverable ? (
                <div
                    ref={revTagRef}
                    style={{ backgroundColor: simple.color }}
                    className={simple.isSelected ? 'usertag unselectable outlined ' : 'usertag unselectable'}
                    onClick={simple.onClick ? simple.onClick : () => {}}>
                    @{simple.revTag}
                </div>
            ) : (
                <div
                    ref={nameRef}
                    style={{ backgroundColor: simple.color }}
                    className={simple.isSelected ? 'usertag unselectable outlined ' : 'usertag unselectable'}
                    onClick={simple.onClick ? simple.onClick : () => {}}>
                    {simple.name === '' ? '-' : simple.name}
                </div>
            )}
        </div>
    )
}
