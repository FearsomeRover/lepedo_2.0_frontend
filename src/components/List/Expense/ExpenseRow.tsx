import { ExpenseType } from "@/types/expense";
import UserCard from "@/components/UserCard";
import axios from "axios";
type ExpenseRowProps = {
  expense: ExpenseType;
  refresh: ()=>void;
  editExpense: (expenseId: string)=>void;
}
export default function ExpenseRow(props:ExpenseRowProps) {
  const handleExpenseDelete = async () => {
    await axios.delete(
      process.env.NEXT_PUBLIC_BASE_URL + "/expense/" + props.expense.id
    );
    props.refresh();
  };
  return (
    <tr>
      <td>
        <p className="left">
          ...{props.expense.id.slice(-4)}
        </p>
      </td>
      <td>
        <p>{props.expense.title} </p>
      </td>
      
      <td className="middle">
        <UserCard user={props.expense.payer} />
      </td>
      <td>
        <img
          className="arrow-right hideondark"
          src="/images/arrow-right.svg"
          alt="arrow-right"
        />
        <img
          className="arrow-right hideonlight"
          src="/images/arrow-right-white.svg"
          alt="arrow-right"
        />
      </td>
      <td className="middle">
        {props.expense.received.map((user) => (
          <UserCard user={user} key={user.id}/>
        ))}
      </td>
      <td><p className="middle">    {props.expense.date}   </p></td>
      <td>
        <p className="right bold">{props.expense.amount} Ft </p>
      </td>
      <td className="min-width right">
        <button onClick={()=>props.editExpense(props.expense.id)}>
          <img src="/images/pencil.svg" className="hideondark" alt="edit" />
          <img
            src="/images/pencil-white.svg"
            className="hideonlight"
            alt="edit"
          />
        </button>
        <button onClick={handleExpenseDelete}>
          <img src="/images/trash.svg" className="hideondark" alt="delete" />
          <img
            src="/images/trash-white.svg"
            className="hideonlight"
            alt="delete"
          />
        </button>
      </td>
    </tr>
  );
}
