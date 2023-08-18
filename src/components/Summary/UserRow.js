import axios from "axios";
import "./table.css";
import UserCard from "../UserCard";
export default function UserRow({ userId, user, editUser, refresh}) {
  const handleUserDelete = async() => {
    await axios.delete(process.env.REACT_APP_BASE_URL + "/user/" + userId);
    refresh();
  }
  return (
    <tr>
      <td className="left">
        <UserCard user={user}/>
        <button onClick={() => editUser(userId)}>
          <img src="/images/pencil.svg" className="hideondark" alt="edit" />
          <img src="/images/pencil-white.svg" className="hideonlight" alt="edit" />
        </button>
        <button onClick={handleUserDelete}>
          <img src="/images/trash.svg" className="hideondark" alt="delete" />
          <img src="/images/trash-white.svg" className="hideonlight" alt="delete" />
        </button>
      </td>
      <td>
        <p className="right">{user.spent + " Ft"}</p>
      </td>
      <td>
        <p className="right">{user.paid + " Ft"}</p>
      </td>
      <td>
        <p className="right">{user.transferfrom + " Ft"}</p>
      </td>
      <td>
        <p className="right">{user.transferto + " Ft"}</p>
      </td>
      <td>
        <p className="right bold">{user.balance + " Ft"}</p>
      </td>
    </tr>
  );
}
