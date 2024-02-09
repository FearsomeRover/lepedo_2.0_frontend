'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import SummaryTable from '@/components/Summary/SummaryTable'
import QuickActionButtons from '@/components/QuickActionButtons/QuickActionButtons'
import { stats } from '@/types/stats'
import { useUser } from '@auth0/nextjs-auth0/client'
import { User } from '@/types/user'

type Table = {
    table: Record<string, User>
    stats: stats
}
export default function Page() {
    //random comment
    const [noUser, setNoUser] = useState<boolean>(false)
    const [table, setTable] = useState<User[]>([])
    const { user, isLoading, error } = useUser()
    const handleRefresh = () => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    process.env.NEXT_PUBLIC_BASE_URL + '/user',
                )
                if (response.status === 404) {
                    return
                }
                const data = await response.data
                setTable(data)
            } catch (error: any) {
                if (error.request.status === 404) {
                    setNoUser(true)
                } else {
                    console.error('Error fetching data:', error.request.status)
                }
            }
        }
        fetchData()
    }
    useEffect(() => {
        handleRefresh()
    }, [,])
    return (
        <>
            <QuickActionButtons />
            <SummaryTable friendlyUsers={table} refresh={handleRefresh} />
        </>
    )
}
