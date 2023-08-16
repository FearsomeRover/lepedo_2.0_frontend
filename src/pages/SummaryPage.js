import { useState, useEffect } from "react";
import axios from "axios";
import SummaryTable from "../components/Summary/SummaryTable";
import Cards from "../components/header/Cards";
import NewUserForm from "../components/NewUserForm";

export default function SummaryPage() {
  const [table, setTable] = useState(false);
  const [noUser, setNoUser] = useState(false);
  const handleRefresh = () => {
    const fetchData = async () => {
      console.log("refresh")
      try {
        const response = await axios.get(
          process.env.REACT_APP_BASE_URL + "/user/table"
        );
        if (response.status === 404) {
          return;
        }
        const data = await response.data;
        setTable(data);
      } catch (error) {
        if(error.request.status === 404){
          setTable(false);
          setNoUser(true);
        }
        else{
          console.error("Error fetching data:", error.request.status);
        }
      }
    };
    fetchData();
  };
  useEffect(() => {
    handleRefresh();
  }, []);
  return table ? (
    <div>
      <Cards summary={true} cardsData={table.stats} />
      <SummaryTable table={table.table} refresh={handleRefresh}/>
    </div>
  ) : (
    noUser?<NewUserForm refresh={handleRefresh} disabled={true} abort={()=>{setNoUser(false); setTable(false)}}/>:<p>loading</p>
  );
}
