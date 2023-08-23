import styles from "../list.module.css"
import ExpenseRow from "./ExpenseRow";
import { useEffect, useState } from "react";
import NewExpenseForm from "@/components/List/Expense/NewExpenseForm";
import { ExpenseType } from "@/types/expense";
import axios from "axios";
import { useStyleRegistry } from "styled-jsx";
export default function Expense() {
  const [expenses, setExpenses] = useState<ExpenseType[] | null>();
  const [noExpense, setNoExpense] = useState<boolean>(false);
  const [visibleNewExpense, setVisibleNewExpense] = useState<boolean>(false);
  const [expenseId, setExpenseId] = useState<string | null>()
  const refresh = () =>{
    const getExpenses = async () =>{
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + "/expense"
      );
      const data = await response.data;
      if(data.length===0) setNoExpense(true);
      setExpenses(data);
    }
    getExpenses();
  }
  const editExpense = (expenseId:string)=>{
    setVisibleNewExpense(true);
    setExpenseId(expenseId)
  }
  useEffect(() => {
    refresh();
  }, []);
  if(!expenses){
    return(<h2>Loading</h2>)
  }
  if(noExpense){
    return(
      <h2>Még nincsenek költések</h2>
    )
  }
  return (
    <div className={styles.secdiv}>
      {visibleNewExpense && <NewExpenseForm abort={()=>setVisibleNewExpense(false)} refresh={refresh} expense={expenses.find(expense=>expense.id===expenseId)}/>}
      <div className={styles.new_area}>
        <h3>Költések</h3>
        <button onClick={() => {setVisibleNewExpense(true); setExpenseId(null)}} className="sbtn">
          <h4 > + Új költés </h4>
        </button>
      </div>
      <div className={styles.scroll}>
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
              <th><p>Dátum</p></th>
              <th>
                <p>Összeg</p>
              </th>
              <th className={styles.actioncol}></th>
            </tr>
            {expenses.map((expense)=>(<ExpenseRow expense={expense} refresh={refresh} key={expense.id} editExpense={editExpense}/>))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
