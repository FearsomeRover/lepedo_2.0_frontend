import { useEffect, useState } from 'react'

export default function UserCard({ user }: { user: User }) {
    const [isHovered, setIsHovered] = useState(false)
    const [contentWidth, setContentWidth] = useState<number>(500)

    useEffect(() => {
        const contentElement = document.getElementById('content')
        if (contentElement) {
            setContentWidth(contentElement.offsetWidth)
        }
        console.log(contentWidth)
    }, [])

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }
    return (
        <div style={{ width: contentWidth, textAlign: 'center' }}
             className='usertagcontainer'
             onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}>
            <div
                style={{ backgroundColor: user.color }}
                id="content"
                className='usertag'>
                {isHovered ? `@${user.revTag}` : user.name}
            </div>
        </div>
    )
}
