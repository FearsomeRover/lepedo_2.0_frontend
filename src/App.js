import "./App.css";
import Header from "./components/header/Header";
import { useState, useEffect } from "react";
import Summary from "./components/views/Summary";
import List from "./components/views/List";
import axios from "axios";

function App() {
  const [viewSum, setViewSum] = useState(true);
  const [table, setTable] = useState(false);
  useEffect(() => {
    console.log('useEffect')
    if (viewSum) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3300/user");
          const data = await response.data;
          setTable(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [viewSum]);

  const handleSumClick = () => {
    setViewSum(true);
  };
  const handleViewClick = () => {
    setViewSum(false);
  };
  return (
    <div>
      <Header onSumClick={handleSumClick} onListClick={handleViewClick} />
      {table
      ?(viewSum ? <Summary table={table}/> : <List />)
      :<p>loading</p>}
    </div>
  );
}

export default App;
