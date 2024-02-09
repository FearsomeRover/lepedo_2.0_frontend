'use client'
import { useEffect, useState } from 'react'

interface Element {
    id: number
    position: {
        x: number
        y: number
        velocity: number
    }
}

const LandingPage: React.FC = () => {
    const [elements, setElements] = useState<Element[]>([])

    useEffect(() => {
        const numberOfElements = 40
        const initialElements: Element[] = Array.from(
            { length: numberOfElements },
            (_, index) => ({
                id: index,
                position: {
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight * 0.1,
                    velocity: Math.random() * 2 + 1,
                },
            }),
        )
        setElements(initialElements)

        const updateElements = () => {
            setElements((prevElements) =>
                prevElements.map((element) => ({
                    ...element,
                    position: {
                        ...element.position,
                        y: element.position.y + element.position.velocity,
                    },
                })),
            )
        }

        const animationFrame = requestAnimationFrame(updateElements)

        return () => cancelAnimationFrame(animationFrame)
    }, [])

    return (
        <div
            style={{
                position: 'relative',
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
            }}>
            {elements.map((element) => (
                <div
                    key={element.id}
                    style={{
                        position: 'absolute',
                        left: element.position.x,
                        top: element.position.y,
                        transition: 'top 1s ease-out',
                    }}>
                    {/* Replace this with your element */}
                    <div
                        style={{
                            width: '20px',
                            height: '20px',
                            background: 'red',
                        }}
                    />
                </div>
            ))}
        </div>
    )
}

export default LandingPage
