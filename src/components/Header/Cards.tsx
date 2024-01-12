"use client";
import { useState } from "react";
import NewExpenseForm from "@/components/Forms/NewExpenseForm";
import NewTransferForm from "../Forms/NewTransferForm";
import { Cards } from "@/types/cardData";
import Card from "./Card";
export default function Cards(props: any) {
  const [visibleNewExpense, setVisibleNewExpense] = useState(false);
  const [visibleNewTransfer, setVisibleNewTransfer] = useState(false);
  if (props.summary) {
    return (
      <>
        {visibleNewExpense && (
          <NewExpenseForm
            abort={() => setVisibleNewExpense(false)}
            refresh={props.refresh}
          />
        )}
        {visibleNewTransfer && (
          <NewTransferForm
            abort={() => setVisibleNewTransfer(false)}
            refresh={() => {}}
          />
        )}
        <div className="floating-top">
          <Card
            color={"#51bb88"}
            title={"Összesen elszámolt"}
            value={props.cardsData.doneall + " Ft"}
            bottomLink={{
              name: "Új utalás",
              action: () => setVisibleNewTransfer(true),
            }}
          ></Card>
          <Card
            color={"#52bbe8"}
            title={"Összesen költött"}
            value={props.cardsData.spentall + " Ft"}
            bottomLink={{
              name: "Új költés",
              action: () => setVisibleNewExpense(true),
            }}
          ></Card>
          <Card
            color={"#d9515e"}
            title={"A spórolós"}
            value={props.cardsData.thrifty}
          ></Card>
        </div>
      </>
    );
  } else {
    console.log("fuck");
  }
}
