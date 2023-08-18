import axios from "axios";
import "../components/List/list.css"
import Expense from "../components/List/Expense/Expense";
import Transfer from "../components/List/Transfer/Transfer";
import { useState, useEffect } from "react";

export default function ListPage() {
  const [expenses, setExpenses] = useState(false);
  const [transfers, setTransfers] = useState(false);
  const [noExpense, setNoExpense] = useState(false);
  const [noTransfer, setNoTransfer] = useState(false);
  
  const refreshExpenses = () =>{
    const getExpenses = async () =>{
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "/expense"
      );
      const data = await response.data;
      setExpenses(data);
    }
    getExpenses();
  }
  const refreshTransfers = () => {
    const getTransfers = async () => {
      const response = await axios.get(
        process.env.REACT_APP_BASE_URL + "/transfer"
      );
      const data = await response.data;
      if(data.length===0) setNoTransfer(true);
      setExpenses(data);
    };
    getTransfers();
  }
  useEffect(() => {
    refreshExpenses();
    refreshTransfers();
  }, []);
  return (
    <div>
      {(expenses)?<Expense expenses={expenses} refresh={refreshExpenses}/>:noExpense?<h3>No expenses yet</h3>:<p>loading</p>}
      {(transfers)?<Transfer transfers={transfers} refresh={refreshTransfers}/>:noTransfer?<h3>No transfers yet</h3>:<p>loading</p>}
    </div>
  );
}
