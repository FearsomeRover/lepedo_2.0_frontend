
import { useState } from "react";
import Card from "./Card";
import NewExpenseForm from "../List/Expense/NewExpenseForm";
export default function Cards(props) {
  const [visibleNewExpense, setVisibleNewExpense] = useState(false);
    if(props.summary){
        return (
            <>
              {visibleNewExpense && <NewExpenseForm abort={()=>setVisibleNewExpense(false)}/>}
            <div className="floating-top">
            <Card
              color={"green"}
              title={"Összesen elszámolt"}
              value={props.cardsData.doneall + " Ft"}
              bottomLink={{ name: "Új utalás"}}
            ></Card>
              <Card
                color={"blue"}
                title={"Összesen költött"}
                value={props.cardsData.spentall + " Ft"}
                bottomLink={{ name: "Új költés", action:()=>setVisibleNewExpense(true)}}
              ></Card>
              <Card
                color={"red"}
                title={"A spórolós"}
                value={props.cardsData.thrifty}
              ></Card>
            </div>
            </>
            
          );
    }
    else{
        console.log('fuck')
    }
  
}
