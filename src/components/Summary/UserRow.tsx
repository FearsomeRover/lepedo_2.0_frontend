import axios from 'axios'
import Image from 'next/image'
import UserCardSimple from '@/components/UserCard/UserCardSimple'
import { User } from '@/types/user'

type UserRowProps = {
    userId: string
    user: User
    editUser: (userId: string) => void
    refresh: () => void
}
export default function UserRow({
    userId,
    user,
    editUser,
    refresh,
}: UserRowProps) {
    const handleUserDelete = async () => {
        await axios.delete(process.env.NEXT_PUBLIC_BASE_URL + '/user/' + userId)
        refresh()
    }
    return (
        <tr>
            <td className="left">
                <UserCardSimple
                    name={user.name}
                    revTag={user.revTag}
                    color={user.color}
                    isHoverable={true}
                    onClick={() => {}}
                />
            </td>
            <td>
                <p className="right">{user.spent + ' Ft'}</p>
            </td>
            <td>
                <p className="right">{user.paid + ' Ft'}</p>
            </td>
            <td>
                <p className="right">{user.transferfrom + ' Ft'}</p>
            </td>
            <td>
                <p className="right">{user.transferto + ' Ft'}</p>
            </td>
            <td>
                <p className="right bold">{user.balance + ' Ft'}</p>
            </td>
        </tr>
    )
}
