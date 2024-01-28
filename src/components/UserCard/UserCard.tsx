import { useState } from "react";
import styles from "./usercard.module.css";

export default function UserCard({ user }: { user: User }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      style={{ backgroundColor: user.color }}
      className="usertag"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}

    >
      {isHovered ? `@${user.revTag}` : user.name}
    </div>
  );
}
