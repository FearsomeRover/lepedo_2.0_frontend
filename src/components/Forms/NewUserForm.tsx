import axios from 'axios'
import { useState } from 'react'
import styles from './forms.module.css'
import UserCard from '@/components/UserCard/UserCard'
import UserCardSimple from '@/components/UserCard/UserCardSimple'
import LinkButton from '@/components/Button/LinkButton'
import { User } from '@/types/user'

type NewUserFormProps = {
    user?: User
    refresh: () => void
    disabled: boolean
    abort: () => void
}
export default function NewUserForm(props: NewUserFormProps) {
    const user = props.user ? props.user : null
    const generateRandomColor = () => {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`
    }
    const [color, setColor] = useState(user ? user.color : generateRandomColor)
    const [name, setName] = useState(user ? user.name : '')
    const [revTag, setRevTag] = useState(user ? user.revTag : '')
    const [freeTag, setFreeTag] = useState(true)
    const [customColor, setCustomColor] = useState(user ? user.color : false)
    const colors = [
        '#D9515E',
        '#51BB88',
        '#F86E0B',
        '#0F8A8E',
        '#FFB100',
        '#9370DB',
        '#52BBE8',
    ]
    /*todo https://stackoverflow.com/questions/596216/formula-to-determine-perceived-brightness-of-rgb-color*/

    const reset = () => {
        setColor(generateRandomColor())
        setName('')
        setRevTag('')
        setFreeTag(true)
        setCustomColor(false)
    }
    const checkRevTag = async () => {
        if (revTag && !user) {
            const data = await axios.get(
                process.env.NEXT_PUBLIC_BASE_URL + '/user/revtag/' + revTag,
            )
            setFreeTag(data.data)
        }
    }
    const checkSubmit = async (event: any) => {
        event.preventDefault()
        if (user) {
            await axios.patch(
                process.env.NEXT_PUBLIC_BASE_URL + `/user/${props.user?.id}`,
                {
                    name,
                    revTag,
                    color,
                    auth0sub: user!.auth0sub,
                },
            )
        } else {
            return
        }
        props.refresh()
        if (props.abort) {
            props.abort()
        }
        reset()
    }
    const handleColorGen = () => {
        if (!customColor && name.length >= 2) {
            setColor(
                colors[
                    (name.charCodeAt(0) + name.charCodeAt(2)) % colors.length
                ],
            )
        }
    }
    return (
        <div className={styles.popup}>
            <form
                method="post"
                onSubmit={checkSubmit}
                className={styles.userform}
                autoComplete="off">
                <h3>Saját profil</h3>
                <div className="h3"></div>
                <UserCardSimple
                    color={color}
                    name={name}
                    revTag={revTag}
                    isSelected={false}
                    isHoverable={true}
                    isAlignedToCenter={true}
                    onClick={() => {}}></UserCardSimple>
                <h5 className="middle">{user?.email}</h5>
                <div className="h3"></div>
                <h5>Név</h5>
                <input
                    minLength={3}
                    id="name"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    onBlur={handleColorGen}
                    autoComplete="off"
                />
                <h5>RevTag</h5>
                <input
                    name="revtag"
                    pattern="[^@]*"
                    title="Nem kell a @ karaktert is megadnod"
                    value={revTag}
                    onChange={(event) => setRevTag(event.target.value)}
                    onBlur={checkRevTag}
                    autoComplete="off"
                />
                {!freeTag && (
                    <p className="tagerror">Tag already registered to user!</p>
                )}
                <h5>Tag szín</h5>

                <input
                    id="color"
                    name="color"
                    type="color"
                    className={styles.color}
                    value={color}
                    onChange={(event) => {
                        console.log('submit')
                        setColor(event.target.value)
                        setCustomColor(true)
                    }}
                />

                <div className="h3"></div>

                <div>
                    <input
                        className="sbtn_with_h4"
                        type="submit"
                        value="Mentés"
                    />
                    {!props.disabled && (
                        <button
                            className="sbtn"
                            onClick={() => {
                                props.abort()
                            }}>
                            Mégse
                        </button>
                    )}
                    <a href="/api/auth/logout">Kijelentkezés</a>
                </div>
            </form>
        </div>
    )
}
