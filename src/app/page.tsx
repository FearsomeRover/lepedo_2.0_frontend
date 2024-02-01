"use client";
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import SummaryTable from "@/components/Summary/SummaryTable";
import Cards from "@/components/Header/Cards";
import NewUserForm from "@/components/Forms/NewUserForm";
import { stats } from "@/types/stats";

type Table = {
  table: Record<string, User>;
  stats: stats;
};
export default function Page() {
  //random comment
  const [noUser, setNoUser] = useState<boolean>(false);
  const [table, setTable] = useState<User[]>([]);
  const handleRefresh = () => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BASE_URL + "/user"
        );
        if (response.status === 404) {
          return;
        }
        const data = await response.data;
        setTable(data);
      } catch (error: any) {
        if (error.request.status === 404) {
          setNoUser(true);
        } else {
          console.error("Error fetching data:", error.request.status);
        }
      }
    };
    fetchData();
  };
  useEffect(() => {
    handleRefresh();
  }, []);
  return (
    <div>
      <SummaryTable friendlyUsers={table} refresh={handleRefresh} />
    </div>
  );
}
