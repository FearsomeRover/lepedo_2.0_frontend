'use client'
import React, { useEffect, useState } from 'react'
import LinkButton from '@/components/Button/LinkButton'
import NewUserForm from '@/components/Forms/NewUserForm'
import axios from 'axios'
import { User } from '@/types/user'
import { GlobalStateContext } from '@/components/context/context'
import { useProfile } from '@/hooks/queries/useProfile'

export default function Cards(props: any) {
    const [visibleUserForm, setvisibleUserForm] = useState(false)
    const [users, setUsers] = useState<User[]>([])
    const { data: user, mutate } = useProfile()
    console.log(user)
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
                        <LinkButton text={'Bejelentkezés'} href={`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`} />
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
                {visibleUserForm && user && (
                    <NewUserForm
                        refresh={mutate}
                        user={user!}
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
