import { useState } from "react";
export default function UserCard({user}) {
    const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      className="usertag"
      style={{ backgroundColor: user.color }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered ? `@${user.revTag}` : user.name}
    </div>
  );
}
