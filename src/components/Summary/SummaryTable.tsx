import UserRow from './UserRow'
import { useState } from 'react'
import styles from './table.module.css'
import { User } from '@/types/user'

type SummaryTableProps = {
    friendlyUsers: User[]
    refresh: () => void
}
export default function SummaryTable(props: SummaryTableProps) {
    const [visibleNewUser, setVisibleNewUser] = useState(false)
    const [userId, setUserId] = useState<string | null>()
    const handleEditUser = (userId: string) => {
        setVisibleNewUser(true)
        setUserId(userId)
    }
    return (
        <div className={styles.summarytable}>
            <table>
                <tbody>
                    <tr>
                        <th>
                            <h5 className="left mw30">#</h5>
                        </th>
                        <th>
                            <h5 className="right">Költésben részesült</h5>
                        </th>
                        <th>
                            <h5 className="right">Fizetett</h5>
                        </th>
                        <th>
                            <h5 className="right">Utalt</h5>
                        </th>
                        <th>
                            <h5 className="right">Utaltak neki</h5>
                        </th>
                        <th>
                            <h5 className="right">Összesített mérleg</h5>
                        </th>
                    </tr>

                    {props.friendlyUsers.map((user) => (
                        <UserRow
                            key={user.id}
                            userId={user.id!}
                            user={user}
                            editUser={handleEditUser}
                            refresh={props.refresh}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
