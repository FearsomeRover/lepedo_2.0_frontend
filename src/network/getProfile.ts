import authorizedApi from '@/app/network/authorizedApi'
import { User } from '@/types/user'

export async function getProfile(): Promise<User | null> {
    try {
        const response = await authorizedApi.get<User>('/auth/me')
        return response.data
    } catch (e) {
        return null
    }
}
