import useSWR from 'swr'

import { User } from '@/types/user'
import { fetcher } from '@/utils/fetcher'

export function useProfile() {
    return useSWR<User>('/api/profile', fetcher<User>)
}
