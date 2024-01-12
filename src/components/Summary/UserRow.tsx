import axios from "axios";
import styles from "./table.module.css";
import UserCard from "../UserCard/UserCard";
import Image from "next/image";
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
          <Image src="/images/pencil.svg" alt="edit" width="16" height="16" />
        </button>
        <button
          onClick={handleUserDelete}
          disabled={!user.deleteable}
          title={
            user.deleteable
              ? ""
              : "A user még résztvesz legalább 1 tranzakcióban, ezért nem törölhető."
          }
        >
          <Image
            src="/images/trash.svg"
            alt="delete"
            color={user.deleteable ? "black" : "gray"}
            width="16"
            height="16"
          />
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
