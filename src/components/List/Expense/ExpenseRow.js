import UserCard from "../../UserCard";
import axios from "axios";
export default function ExpenseRow({ expense, refresh }) {
  const handleExpenseDelete = async () => {
    await axios.delete(
      process.env.REACT_APP_BASE_URL + "/expense/" + expense.id
    );
    refresh();
  };
  return (
    <tr>
      <td>
        <p title="<%= cur._id %>" className="left">
          ...{expense.id.slice(-3)}
        </p>
      </td>
      <td>
        <p>{expense.title} </p>
      </td>
      <td className="middle">
        <UserCard user={expense.payer} />
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
        {expense.received.map((user) => (
          <UserCard user={user} key={user.id}/>
        ))}
      </td>
      <td>
        <p className="right bold">{expense.amount} Ft </p>
      </td>
      <td className="min-width right">
        <button onClick={handleExpenseDelete}>
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
