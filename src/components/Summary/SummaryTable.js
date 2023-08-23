import UserRow from "./UserRow";
import { useState } from "react";
import NewUserForm from "../NewUserForm";

export default function SummaryTable(props) {
  const table = props.table;
  const [visibleNewUser, setVisibleNewUser] = useState(false);
  const[userId, setUserId] = useState();
  const handleEditUser = (userId) =>{
    setVisibleNewUser(true);
    setUserId(userId);
  }
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
        {Object.keys(table).map(user => <UserRow key={user} userId={user} user={table[user]} editUser={handleEditUser} refresh={props.refresh}/>)}
        <tr className="notable">
          <td>
            <button onClick={()=>{setVisibleNewUser(true); setUserId(null)}} className="usertag only-outline">
              + Új user 
            </button>
          </td>
          <td>
            <p>&nbsp;</p>
          </td>
        </tr>
      </tbody>
    </table>
      {visibleNewUser && <NewUserForm abort={()=>setVisibleNewUser(false)} refresh={props.refresh} user={userId?table[userId]:null} userId={userId}/>}
    </div>
  );
}
