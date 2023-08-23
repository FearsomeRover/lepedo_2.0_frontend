import axios from "axios";
import styles from "./table.module.css";
import UserCard from "../UserCard/UserCard";
type UserRowProps = {
  userId: string;
  user: User;
  editUser: (userId: string) => void;
  refresh: () => void;
};
export default function UserRow({
  userId,
  user,
  editUser,
  refresh,
}: UserRowProps) {
  const handleUserDelete = async () => {
    await axios.delete(process.env.NEXT_PUBLIC_BASE_URL + "/user/" + userId);
    refresh();
  };
  return (
    <tr>
      <td className="left">
        <UserCard user={user} />
        <button onClick={() => editUser(userId)}>
          <img src="/images/pencil.svg" alt="edit" />
        </button>
        {user.deleteable ? (
          <button onClick={handleUserDelete}>
            <img src="/images/trash.svg" alt="delete" color="black" />
          </button>
        ) : (
          <button
            onClick={handleUserDelete}
            disabled
            title="A user még résztvesz legalább 1 tranzakcióban, ezért nem törölhető."
          >
            <img
              src="/images/trash.svg"
              className={styles.disabled}
              alt="delete"
            />
          </button>
        )}
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
