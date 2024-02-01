'use client'
import React, { useEffect, useState } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import LinkButton from '@/components/Button/LinkButton'
import NewUserForm from '@/components/Forms/NewUserForm'
import axios from 'axios'

export default function Cards(props: any) {
    const [visibleUserForm, setvisibleUserForm] = useState(false)
    const { user, error, isLoading } = useUser()
    const [dbUser, setDbUser] = useState<User | null>(null)
    const [users, setUsers] = useState<User[]>([])

    const getUser = async () => {
        if (!user) return
        const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/user')
        for (const u of response.data) {
            if (u.auth0sub === user.sub) {
                setDbUser(u)
                return
            }
        }

        /*if the user has not been seen before, create a database user for them*/
        const data = {
            name: user.name,
            revTag: user.name,
            color: '#000000',
            auth0sub: user.sub,
        }
        await axios.post(process.env.NEXT_PUBLIC_BASE_URL + '/user', data)
    }

    useEffect(() => {
        getUser()
    }, [user])


    function deleteUsers() {
        axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/user').then(response => setUsers(response.data)).then(() => {
            for (const u of users) {
                axios.delete(process.env.NEXT_PUBLIC_BASE_URL + `/user/${u.id}`)
            }
        })
    }

    if (props.summary) {
        return (
            <>
                <div className='floating-top'>
                    {user == undefined ? (
                        <LinkButton
                            text={'Bejelentkezés'}
                            href={'/api/auth/login'}
                        />
                    ) : (
                        <>


                            <button onClick={deleteUsers} className='sbtn'>
                                [drop users]
                            </button>
                            <LinkButton href={'/api/auth/logout'} text={'[logout]'} />


                            <button className='sbtn' onClick={() => {
                                setvisibleUserForm(true)
                                console.log('afsd')
                            }}>
                                {user?.name!}
                            </button>
                        </>
                    )}
                </div>
                {visibleUserForm && dbUser &&
                    <NewUserForm
                        refresh={() => {
                            getUser
                        }}
                        user={dbUser!}
                        abort={() => {
                            setvisibleUserForm(false)
                        }}
                        disabled={false} />
                }
            </>
        )
    } else {
        console.log('f')
    }
}
