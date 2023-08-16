import "../list.css"
export default function Expense() {
  return (
    <div className="secdiv">
      <div className="new_area">
        <h3>Költések</h3>
        <a href="/add_expense" id="myLink" className="sbtn">
          <div className="loading-bottle"></div>
          <h4 id="myText"> + Új költés </h4>
        </a>
      </div>
      <div className="scroll">
        <table>
          <tbody>
            <tr>
              <th>
                <p className="left"> &nbsp; &nbsp; #</p>
              </th>
              <th>
                <p className="left">Megnevezés</p>
              </th>
              <th>
                <p>Fizetett</p>
              </th>
              <th className="min-width"></th>
              <th>
                <p>Résztvevők</p>
              </th>
              <th className="w7">
                <p>Összeg</p>
              </th>
              <th className="actioncol"></th>
            </tr>
            <tr>
              <td>
                <p title="<%= cur._id %>" className="left">
                  123
                </p>
              </td>
              <td>
                <p> bujdi </p>
              </td>
              {/* <td>
                <p className="middle"> 123 </p>
              </td> */}
              <td className="middle">
                <div className="usertag">bujdi</div>
              </td>
              <td>
                <img
                  className="arrow-right hideondark"
                  src="/images/arrow-right.svg"
                  alt="arrow-right"
                />
                <img
                  className="arrow-right hideonlight"
                  src="/images/arrow-right-white.svg"
                  alt="arrow-right"
                />
              </td>
              <td className="middle">
                <div className="usertag activateshowonhovertext"> mate </div>
              </td>
              <td>
                <p className="hideonhover right bold">123 Ft </p>
                <p className="showonhovertext right bold italic">123 Ft </p>
              </td>
              <td className="min-width right">
                <a href="/edit_expense/<%= cur._id %>">
                  <img src="/images/pencil.svg" className="hideondark" alt="edit" />
                  <img
                    src="/images/pencil-white.svg"
                    className="hideonlight"
                    alt="edit"
                  />
                </a>
                <a href="/delete_expense/<%= cur._id %>">
                  <img
                    src="/images/trash.svg"
                    className="hideondark"
                    alt="delete"
                  />
                  <img
                    src="/images/trash-white.svg"
                    className="hideonlight"
                    alt="delete"
                  />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
