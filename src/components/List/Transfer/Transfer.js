import axios from "axios";
import { useState, useEffect } from "react";

export default function Transfer({ transfers, refresh }) {
  console.log(transfers);
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
                <p className="left"> &nbsp; &nbsp; #</p>
              </th>
              <th>
                <p>Utaló</p>
              </th>
              <th className="min-width"></th>
              <th className="w7">
                <p>Kedvezményezett</p>
              </th>
              <th>
                <p>Dátum</p>
              </th>
              <th className="w7">
                <p>Összeg</p>
              </th>
              <th className="actioncol"></th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
