import "./table.css";
import { useState } from "react";
export default function UserRow({ userId, user }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
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
        <a href="/edit_user/1">
          <img src="/images/pencil.svg" className="hideondark" alt="edit" />
          <img src="/images/pencil-white.svg" className="hideonlight" alt="edit" />
        </a>
        <a href="/delete_user/1">
          <img src="/images/trash.svg" className="hideondark" alt="delete" />
          <img src="/images/trash-white.svg" className="hideonlight" alt="delete" />
        </a>
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
