import { useState } from 'react'

type SimpleUserProps = {
    name: string;
    revTag: string;
    color: string;
    isSelected: boolean;
    onClick: () => void;
};

export default function UserCardSimple(simple: SimpleUserProps) {
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }
    return (
        <div
            style={{ backgroundColor: simple.color }}
            className={simple.isSelected ? 'usertag unselectable outlined ' : 'usertag unselectable'}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={simple.onClick}
        >
            {/*todo if we would like to have an svg tick, here we have it*/}
{/*            {isSelected ?
                <svg xmlns='http://www.w3.org/2000/svg' height='12px' viewBox='0 0 24 24' width='12px' fill='#FFFFFF'>
                    <path d='M0 0h24v24H0z' fill='none' />
                    <path d='M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z' />
                </svg> : ''}*/}
            {/*{isHovered ? `@${simple.revTag}` : (simple.name == '' ? '-' : simple.name)}*/}
            { (simple.name == '' ? '-' : simple.name)}
        </div>
    )
}
