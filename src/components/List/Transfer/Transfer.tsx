import axios from "axios";
import { useState, useEffect } from "react";
import styles from "../list.module.css"
import NewTransferForm from "@/components/List/Transfer/NewTransferForm"
import TransferRow from "./TransferRow";
import {Transfer} from "@/types/transfer"

export default function Transfer() {
  const [visibleNewTransfer, setVisibleTransfer] = useState(false);
  const [transfers, setTransfers] = useState<Transfer[] | null>();
  
  const [noTransfer, setNoTransfer] = useState(false);
  
  
  const refresh = () => {
    const getTransfers = async () => {
      const response = await axios.get(
        process.env.NEXT_PUBLIC_BASE_URL + "/transfer"
      );
      const data = await response.data;
      if(data.length===0) setNoTransfer(true);
      setTransfers(data);
    };
    getTransfers();
  }
  useEffect(() => {
    refresh();
  }, []);
  if(!transfers){
    return(<h2>Loading</h2>)
  }
  if(noTransfer){
    return(
      <h2>Még nincsenek költések</h2>
    )
  }
  return (
    
    <div className={styles.secdiv}>
      {visibleNewTransfer && <NewTransferForm abort={()=>setVisibleTransfer(false)} refresh={refresh}/>}
      <div className={styles.new_area}>
        <h3>Utalások</h3>
        <button onClick={()=>{setVisibleTransfer(true)}} className="sbtn">
          <div className="loading-bottle"></div>
          <h4 id="myText"> + Új utalás </h4>
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
                <p>Utaló</p>
              </th>
              <th className="min-width"></th>
              <th>
                <p>Kedvezményezett</p>
              </th>
              <th>
                <p>Dátum</p>
              </th>
              <th>
                <p>Összeg</p>
              </th>
              <th className="actioncol"></th>
            </tr>
            {transfers.map((transfer)=><TransferRow transfer={transfer} refresh={refresh} key={transfer.id}/>)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
