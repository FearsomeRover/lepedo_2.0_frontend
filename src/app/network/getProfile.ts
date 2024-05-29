import { User } from '@/types/user'
import authorizedApi from './authorizedApi'

export async function getProfile(): Promise<User | null> {
    try {
        const response = await authorizedApi.get<User>('/user/profile')
        console.log('response', response.data)
        return response.data
    } catch (e) {
        return null
    }
}
