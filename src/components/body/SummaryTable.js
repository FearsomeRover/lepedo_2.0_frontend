import UserRow from "./UserRow";
import { useState } from "react";
import NewUserForm from "../NewUserForm";

export default function SummaryTable({table}) {
  const [visibleNewUser, setVisibleNewUser] = useState(false);
  return (
    <div>
      <table className="summary_table">
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
        {Object.keys(table).map(user => <UserRow key={user} userId={user} user={table[user]}/>)}
        <tr className="notable">
          <td>
            <button onClick={()=>setVisibleNewUser((state=> !state))} className="usertag only-outline">
              + Új user 
            </button>
          </td>
          <td>
            <p>&nbsp;</p>
          </td>
        </tr>
      </tbody>
    </table>
      <NewUserForm visible={visibleNewUser} abort={()=>setVisibleNewUser(false)}/>
    </div>
  );
}
