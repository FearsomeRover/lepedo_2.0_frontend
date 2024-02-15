'use client'
import UserCardSimple from '@/components/UserCard/UserCardSimple'
import { useUser } from '@auth0/nextjs-auth0/client'
import styles from '@/components/Forms/forms.module.css'
import Image from 'next/image'
import axios from 'axios'

export default function Page() {
    /*todo fetch real user data from new context*/
    const { user, error, isLoading } = useUser()

    function fetchData() {}
    function handleAccept() {}

    return (
        <>
            <h2 className={'activeheader'}>Tartozás felvétele</h2>
            {!user && (
                <>
                    <div className={'h5'}></div>
                    <h3 className={'middleinside'}>
                        Jelentkezz be tess, hogy striugálhass!
                    </h3>
                </>
            )}
            {user && (
                <>
                    <div className={'h5'}></div>
                    <p className={'middleself fs36'}>300 Ft</p>
                    <div className={'h3'}></div>
                    <div className={'flex-row-space-between mw700 middleself'}>
                        <UserCardSimple
                            name={user!.name!}
                            onClick={() => {}}
                            color={'coral'}
                            isAlignedToCenter={true}
                            isHoverable={true}
                            revTag={'kfadsfakl;ajdf'}
                        />
                        <div className={'imageContainer'}>
                            <Image
                                className={'arrow'}
                                src="/images/arrow-right.svg"
                                alt="arrow-right"
                                fill></Image>
                        </div>
                        <UserCardSimple
                            name={user!.name!}
                            onClick={() => {}}
                            color={'coral'}
                            isAlignedToCenter={true}
                            isHoverable={true}
                            revTag={'kfadsfakl;ajdf'}
                        />
                    </div>
                    <div className={'h5'}></div>
                    <div className={'middleinside'}>
                        <button className={'sbtn'}>Jóváhagyás</button>
                        <button className={'sbtn'}>Mégse</button>
                    </div>
                </>
            )}
        </>
    )
}
