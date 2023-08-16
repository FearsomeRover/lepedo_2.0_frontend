import axios from "axios";
import "./table.css";
import { useState } from "react";
export default function UserRow({ userId, user, editUser, refresh}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleUserDelete = async() => {
    await axios.delete(process.env.REACT_APP_BASE_URL + "/user/" + userId);
    refresh();
  }
  return (
    <tr>
      <td className="left">
        <div
          className="usertag"
          style={{ backgroundColor: user.color }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isHovered ?(`@${user.revTag}`): user.name}
        </div>
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
