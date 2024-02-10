'use client'
import UserCardSimple from '@/components/UserCard/UserCardSimple'
import { useUser } from '@auth0/nextjs-auth0/client'

export default function Page() {
    const { user, error, isLoading } = useUser()
    return (
        <>
            <h2 className={'activeheader'}>Tartozás felvétele</h2>
            {!user && (
                <>
                    <div className={'h5'}></div>
                    <h3 className={'middle'}>
                        Jelentkezz be tess, hogy striugálhass!
                    </h3>
                </>
            )}
            {user && (
                <>
                    <UserCardSimple
                        name={user!.name!}
                        onClick={() => {}}
                        color={'coral'}
                    />
                    <button className={'sbtn'}>Jóváhagyás</button>
                    <button className={'sbtn'}>Mégse</button>
                </>
            )}
        </>
    )
}
