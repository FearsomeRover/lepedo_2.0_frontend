"use client"
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import SummaryTable from "@/components/Summary/SummaryTable"
import Cards from "@/components/header/Cards";
import NewUserForm from "@/components/NewUserForm";
import { stats } from "@/types/stats";


type Table  = {
  table: Record<string, User>;
  stats: stats;
}
export default function Page() {
  const [table, setTable] = useState<Table | null>(null);
  const [noUser, setNoUser] = useState<boolean>(false);
  const handleRefresh = () => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BASE_URL + "/user/table"
        );
        if (response.status === 404) {
          return;
        }
        const data = await response.data;
        setTable(data);
      } catch (error: any) {
        if(error.request.status === 404){
          setTable(null);
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
      <Cards summary={true} cardsData={table.stats} refresh={handleRefresh}/>
      <SummaryTable table={table.table} refresh={handleRefresh}/>
    </div>
  ) : (
    noUser?<NewUserForm refresh={handleRefresh} disabled={true} abort={()=>{setNoUser(false); setTable(null)}}/>:<p>loading</p>
  );
}
