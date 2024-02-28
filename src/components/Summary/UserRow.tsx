import axios from 'axios'
import UserCardSimple from '@/components/UserCard/UserCardSimple'
import { User } from '@/types/user'

type UserRowProps = {
    userId: string
    user: User
    editUser: (userId: string) => void
    refresh: () => void
}
export default function UserRow({ userId, user, editUser, refresh }: UserRowProps) {
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
                <p className="right fs18">{user.spent + ' Ft'}</p>
            </td>
            <td>
                <p className="right  fs18">{user.paid + ' Ft'}</p>
            </td>
            <td>
                <p className="right  fs18">{user.transferfrom + ' Ft'}</p>
            </td>
            <td>
                <p className="right  fs18">{user.transferto + ' Ft'}</p>
            </td>
            <td>
                <p className="right bold  fs18">{user.balance + ' Ft'}</p>
            </td>
        </tr>
    )
}
