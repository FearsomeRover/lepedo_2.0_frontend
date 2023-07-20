import UserRow from "./UserRow";

export default function SummaryTable({table}) {
  return (
    <table class="summary_table">
      <tbody>
        <tr>
          <th>
            <p class="left mw30">#</p>
          </th>
          <th>
            <p class="right">Költésben részesült</p>
          </th>
          <th>
            <p class="right">Fizetett</p>
          </th>
          <th>
            <p class="right">Utalt</p>
          </th>
          <th>
            <p class="right">Utaltak neki</p>
          </th>
          <th>
            <p class="right">Összesített mérleg</p>
          </th>
        </tr>
        {Object.keys(table).map(user => <UserRow userId={user} user={table[user]}/>)}
        

        <tr class="notable">
          <td>
            <button href="/add_user" class="usertag only-outline">
              + Új user 
            </button>
          </td>
          <td>
            <p>&nbsp;</p>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
