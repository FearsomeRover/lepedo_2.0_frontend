import UserRow from "./UserRow";
import { useState } from "react";
import NewUserForm from "../Forms/NewUserForm";
import styles from "./table.module.css";

type SummaryTableProps = {
  table: any;
  refresh: () => void;
};
export default function SummaryTable(props: SummaryTableProps) {
  const table = props.table;
  const [visibleNewUser, setVisibleNewUser] = useState(false);
  const [userId, setUserId] = useState<string | null>();
  const handleEditUser = (userId: string) => {
    setVisibleNewUser(true);
    setUserId(userId);
  };
  return (
    <div className={styles.summary_table}>
      <table >
        <tbody>
          <tr>
            <th>
              <p className="left mw30">#</p>
            </th>
            <th>
              <p className="right">Költésben részesült</p>
            </th>
            <th>
              <p className="right">Fizetett</p>
            </th>
            <th>
              <p className="right">Utalt</p>
            </th>
            <th>
              <p className="right">Utaltak neki</p>
            </th>
            <th>
              <p className="right">Összesített mérleg</p>
            </th>
          </tr>
          {Object.keys(table).map((user) => (
            <UserRow
              key={user}
              userId={user}
              user={table[user]}
              editUser={handleEditUser}
              refresh={props.refresh}
            />
          ))}
        </tbody>
      </table>
      <button
        onClick={() => {
          setVisibleNewUser(true);
          setUserId(null);
        }}
        className="sbtn_with_h4"
      >
        + Új user
      </button>
      {visibleNewUser && (
        <NewUserForm
          abort={() => setVisibleNewUser(false)}
          refresh={props.refresh}
          user={userId ? table[userId] : null}
          disabled={false}
        />
      )}
    </div>
  );
}
