import { BasicUser } from '@/types/user'
import { ReactNode, createContext, useEffect, useState } from 'react'

type GlobalContextItems = {
    users: BasicUser[]
    setUsers: React.Dispatch<React.SetStateAction<BasicUser[]>>
}

export const GlobalStateContext = createContext<GlobalContextItems>({
    users: [],
    setUsers: () => {},
})
export default function GlobalContext({ children }: { children?: ReactNode }) {
    const [users, setUsers] = useState<BasicUser[]>([])
    useEffect(() => {
        console.log('fetching users')
        fetch(process.env.NEXT_PUBLIC_BASE_URL + '/user')
            .then((res) => res.json())
            .then((data) => setUsers(data))
    }, [])
    return (
        <GlobalStateContext.Provider value={{ users, setUsers }}>
            {children}
        </GlobalStateContext.Provider>
    )
}