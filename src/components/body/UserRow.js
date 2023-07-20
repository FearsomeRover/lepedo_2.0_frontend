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
      <td class="left">
        <div
          className="usertag"
          style={{ backgroundColor: user.color }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isHovered ? user.name : user.revTag}
        </div>
        <a href="/edit_user/1">
          <img src="/images/pencil.svg" class="hideondark" alt="edit" />
          <img src="/images/pencil-white.svg" class="hideonlight" alt="edit" />
        </a>
        <a href="/delete_user/1">
          <img src="/images/trash.svg" class="hideondark" alt="delete" />
          <img src="/images/trash-white.svg" class="hideonlight" alt="delete" />
        </a>
      </td>
      <td>
        <p class="right">{user.spent + " Ft"}</p>
      </td>
      <td>
        <p class="right">{user.paid + " Ft"}</p>
      </td>
      <td>
        <p class="right">{user.transferfrom + " Ft"}</p>
      </td>
      <td>
        <p class="right">{user.transferto + " Ft"}</p>
      </td>
      <td>
        <p class="right bold">{user.balance + " Ft"}</p>
      </td>
    </tr>
  );
}
