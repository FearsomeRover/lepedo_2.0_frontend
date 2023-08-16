import { useState, useEffect } from "react";
import axios from "axios";
import Expense from "../components/List/Expense/Expense";
import Transfer from "../components/List/Transfer/Transfer";

export default function ListPage() {
//   const [table, setTable] = useState(false);
//   useEffect(() => {
//     console.log("useEffect");
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://192.168.2.102:3000/user");
//         const data = await response.data;
//         setTable(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };
//     fetchData();
//   }, []);

  return (
    <div>
      <Expense/>
      <Transfer/>
    </div>
  );
}
