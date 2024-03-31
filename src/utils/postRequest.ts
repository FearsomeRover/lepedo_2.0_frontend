import axios from 'axios'

export async function postRequest(url: string, { arg }: { arg: { data: any } }) {
    return axios.post(process.env.NEXT_PUBLIC_BASE_URL + url, arg.data).then((res) => res.data)
}
