import "./expense.css"
import ExpenseRow from "./ExpenseRow";
import { useState } from "react";
import NewExpenseForm from "./NewExpenseForm";
export default function Expense({expenses, refresh}) {
  const [visibleNewExpense, setVisibleNewExpense] = useState(false);
  return (
    <div className="secdiv">
      {visibleNewExpense && <NewExpenseForm abort={()=>setVisibleNewExpense(false)} refresh={refresh}/>}
      <div className="new_area">
        <h3>Költések</h3>
        <button onClick={() => setVisibleNewExpense(true)} className="sbtn">
          <h4 > + Új költés </h4>
        </button>
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
              <th><p>Dátum</p></th>
              <th className="payedheader">
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
            {expenses.map((expense)=>(<ExpenseRow expense={expense} refresh={refresh} key={expense.id}/>))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
