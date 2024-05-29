import authorizedApi from '@/app/network/authorizedApi'
import { PatchUser } from '@/types/user'

export async function patchProfile(profile: PatchUser) {
    try {
        console.log('getprofile', profile)
        await authorizedApi.patch('/user', {
            ...profile,
        })
    } catch (e) {
        console.error(e)
    }
}
