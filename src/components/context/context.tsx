import { BasicUser } from '@/types/user'
import { ReactNode, createContext, useEffect, useState } from 'react'

type GlobalContextItems = {
    ownUser: BasicUser
    setOwnUser: React.Dispatch<React.SetStateAction<BasicUser>>
    users: BasicUser[]
    setUsers: React.Dispatch<React.SetStateAction<BasicUser[]>>
}

export const GlobalStateContext = createContext<GlobalContextItems>({
    ownUser: {
        id: 'NA',
        name: 'useless user',
        revTag: 'useless user',
        color: 'black',
    },
    setOwnUser: () => {},
    users: [],
    setUsers: () => {},
})
export default function GlobalContext({ children }: { children?: ReactNode }) {
    const [users, setUsers] = useState<BasicUser[]>([])
    const [ownUser, setOwnUser] = useState<BasicUser>({
        id: 'NA',
        name: 'useless user',
        revTag: 'useless user',
        color: 'black',
    })
    useEffect(() => {
        console.log('fetching users')
        fetch(process.env.NEXT_PUBLIC_BASE_URL + '/user')
            .then((res) => res.json())
            .then((data) => setUsers(data))
    }, [])
    return (
        <GlobalStateContext.Provider
            value={{ ownUser, setOwnUser, users, setUsers }}>
            {children}
        </GlobalStateContext.Provider>
    )
}
