'use client'
import React, { useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import LinkButton from '@/components/Button/LinkButton'
import NewUserForm from '@/components/Forms/NewUserForm'
import axios from 'axios'
import { User } from '@/types/user'
import { GlobalStateContext } from '@/components/context/context'

export default function Cards(props: any) {
    const [visibleUserForm, setvisibleUserForm] = useState(false)
    const { user, error, isLoading } = useUser()
    const [curdbUser, setCurdbUser] = useState<User | null>(null)
    const [users, setUsers] = useState<User[]>([])
    const context = React.useContext(GlobalStateContext)

    const getUser = async () => {
        if (!user) return
        const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/user/auth0/' + user.sub)
        console.log(response.data)
        if (response.data !== undefined && response.data !== null && response.data.id !== undefined) {
            const curdbUser = response.data
            context.setOwnUser(curdbUser)
            return
        }
        const data = {
            name: user.name,
            revTag: user.name,
            color: '#000000',
            auth0sub: user.sub,
        }
        await axios.post(process.env.NEXT_PUBLIC_BASE_URL + '/user', data, {
            headers: {
                Authorization: `Bearer ${user.sub}`, // Assumes sub contains the JWT token
            },
        })
        if (user && user.name && curdbUser && curdbUser.id)
            context.setOwnUser({ id: curdbUser?.id, name: user.name, revTag: user.name, color: '#000000' })

        console.log('user created')
        //todo this code is terryfying
    }

    useEffect(() => {
        getUser()
    }, [user])

    function deleteUsers() {
        axios
            .get(process.env.NEXT_PUBLIC_BASE_URL + '/user')
            .then((response) => setUsers(response.data))
            .then(() => {
                for (const u of users) {
                    axios.delete(process.env.NEXT_PUBLIC_BASE_URL + `/user/${u.id}`)
                }
            })
    }

    if (props.summary) {
        return (
            <>
                <div className="floating-top">
                    {user == undefined ? (
                        <LinkButton text={'Bejelentkezés'} href={'/api/auth/login'} />
                    ) : (
                        <>
                            <button onClick={deleteUsers} className="sbtn">
                                [drop users]
                            </button>
                            <LinkButton href={'/api/auth/logout'} text={'[logout]'} />

                            <button
                                className="sbtn"
                                onClick={() => {
                                    setvisibleUserForm(true)
                                    console.log('afsd')
                                }}>
                                {user?.name!}
                            </button>
                        </>
                    )}
                </div>
                {visibleUserForm && curdbUser && (
                    <NewUserForm
                        refresh={() => {
                            getUser
                        }}
                        user={curdbUser!}
                        abort={() => {
                            setvisibleUserForm(false)
                        }}
                        disabled={false}
                    />
                )}
            </>
        )
    } else {
        console.log('f')
    }
}
