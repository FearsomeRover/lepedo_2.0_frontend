'use client'
import React, { useState } from 'react'
import NewExpenseForm from '@/components/Forms/NewExpenseForm'
import NewTransferForm from '../Forms/NewTransferForm'
import Card from './Card'
import { useUser } from '@auth0/nextjs-auth0/client'
import LinkButton from '@/components/Button/LinkButton'
import { redirect } from 'next/navigation'

export default function Cards(props: any) {
    const [visibleNewExpense, setVisibleNewExpense] = useState(false)
    const [visibleNewTransfer, setVisibleNewTransfer] = useState(false)
    const { user, error, isLoading } = useUser()

    if (props.summary) {
        return (
            <>
                {visibleNewExpense && (
                    <NewExpenseForm
                        abort={() => setVisibleNewExpense(false)}
                        refresh={props.refresh}
                    />
                )}
                {visibleNewTransfer && (
                    <NewTransferForm
                        abort={() => setVisibleNewTransfer(false)}
                        refresh={() => {}}
                    />
                )}
                <div className="floating-top">
                    {user == undefined ? (
                        <LinkButton
                            text={'Bejelentkezés'}
                            href={'/api/auth/login'}
                        />
                    ) : (
                        <>
                            <LinkButton
                            text={user?.name!}
                            href={'/api/auth/logout'}
                            textOnHover={'Kijelentkezés'}
                        />
                        </>
                    )}
                </div>
            </>
        )
    } else {
        console.log('fuck')
    }
}
