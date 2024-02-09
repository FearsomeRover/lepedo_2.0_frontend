'use client'

import { useEffect, useState } from 'react'

/*https://www.reddit.com/r/learnjavascript/comments/gp2t2h/how_to_add_gravity_to_elements/*/

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
                    velocity: 10,
                },
            }),
        )
        setElements(initialElements)

        const updateElements = () => {
            setElements((prevElements) =>
                prevElements.map((element) => {
                    let newY = element.position.y + element.position.velocity

                    // Check collision with bottom of the viewport
                    if (newY > window.innerHeight) {
                        newY = window.innerHeight
                    }

                    // Check collision with other elements
                    prevElements.forEach((otherElement) => {
                        if (element.id !== otherElement.id) {
                            const distance = Math.sqrt(
                                Math.pow(
                                    element.position.x -
                                        otherElement.position.x,
                                    2,
                                ) +
                                    Math.pow(
                                        element.position.y -
                                            otherElement.position.y,
                                        2,
                                    ),
                            )
                            const minDistance = 20 // Minimum distance to avoid collision
                            if (distance < minDistance) {
                                newY = Math.min(
                                    newY,
                                    otherElement.position.y - minDistance,
                                )
                            }
                        }
                    })

                    return {
                        ...element,
                        position: {
                            ...element.position,
                            y: newY,
                        },
                    }
                }),
            )
        }

        const animationFrame = requestAnimationFrame(() => {
            updateElements()
        })

        const intervalId = setInterval(() => {
            updateElements()
        }, 1000 / 60) // Update roughly every 60th of a second

        return () => {
            cancelAnimationFrame(animationFrame)
            clearInterval(intervalId)
        }
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
