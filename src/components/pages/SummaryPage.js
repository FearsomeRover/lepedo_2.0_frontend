import { useState, useEffect } from "react";
import axios from "axios";
import SummaryTable from "../body/SummaryTable";
import Cards from '../header/Cards'
import NewUserForm from "../NewUserForm";


export default function SummaryPage() {
  const [table, setTable] = useState(false);

  useEffect(() => {
    console.log("useEffect");
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_BASE_URL + "/user");
        const data = await response.data;
        setTable(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return table ? (
    <div>
      <Cards summary={true} cardsData={table.stats} />
      <SummaryTable table={table.table} />
      
    </div>
  ) : (
    <p>loading</p>
  );
}
