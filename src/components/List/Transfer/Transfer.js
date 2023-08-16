export default function Transfer() {
  return (
    <div className="secdiv">
      <div className="new_area">
        <h3>Utalások</h3>
        <a href="/add_expense" id="myLink" className="sbtn">
          <div className="loading-bottle"></div>
          <h4 id="myText"> + Új utalás </h4>
        </a>
      </div>
      <div className="scroll">
        <table>
          <tbody>
            <tr>
              <th>
                <p class="left"> &nbsp; &nbsp; #</p>
              </th>
              <th>
                <p>Utaló</p>
              </th>
              <th class="min-width"></th>
              <th class="w7">
                <p>Kedvezményezett</p>
              </th>
              <th class="w7">
                <p>Összeg</p>
              </th>
              <th class="actioncol"></th>
            </tr>
            <tr>
              <td>
                <p title="<%= cur._id %>" className="left">
                  123
                </p>
              </td>
              {/* <td>
                    <p className="middle"> 123 </p>
                  </td> */}
              <td className="middle">
                <div className="usertag">bujdi</div>
              </td>
              <td class="min-width">
                <img
                  class="arrow-right hideondark"
                  src="/images/arrow-right.svg"
                  alt="arrow-right"
                />
                <img
                  class="arrow-right hideonlight"
                  src="/images/arrow-right-white.svg"
                  alt="arrow-right"
                />
              </td>
              <td className="middle">
                <div className="usertag activateshowonhovertext"> mate </div>
              </td>
              <td><p class="right bold">      123 Ft</p></td>
              <td className="min-width right">
                <a href="/edit_expense/<%= cur._id %>">
                  <img
                    src="/images/pencil.svg"
                    className="hideondark"
                    alt="edit"
                  />
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
