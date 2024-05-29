import { getProfile } from '@/network/getProfile'
import { patchProfile } from '@/network/patchProfile'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
    const profile = await getProfile()
    console.log('profile', profile)
    return NextResponse.json(profile)
}
export async function PATCH(request: NextRequest) {
    const body = await request.json()
    console.log('body', body)
    const resp = await patchProfile(body)
    console.log('resp', resp)
    return NextResponse.json({ success: true })
}
