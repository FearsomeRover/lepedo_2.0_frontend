'use client'
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

    const isDarkColor = (color: string) => {
        const hex = color.replace('#', '')
        const r = parseInt(hex.substring(0, 2), 16)
        const g = parseInt(hex.substring(2, 4), 16)
        const b = parseInt(hex.substring(4, 6), 16)
        const brightness = (r * 299 + g * 587 + b * 114) / 1000
        return brightness < 75
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
                    className={
                        simple.isSelected
                            ? isDarkColor(simple.color)
                                ? 'usertag unselectable lightoutlined'
                                : 'usertag unselectable outlined '
                            : 'usertag unselectable'
                    }
                    onClick={simple.onClick ? simple.onClick : () => {}}>
                    @{simple.revTag}
                </div>
            ) : (
                <div
                    ref={nameRef}
                    style={{ backgroundColor: simple.color }}
                    className={
                        simple.isSelected
                            ? isDarkColor(simple.color)
                                ? 'usertag unselectable lightoutlined'
                                : 'usertag unselectable outlined '
                            : 'usertag unselectable'
                    }
                    onClick={simple.onClick ? simple.onClick : () => {}}>
                    {simple.name === '' ? '-' : simple.name}
                </div>
            )}
        </div>
    )
}
