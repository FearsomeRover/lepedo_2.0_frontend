import { useState } from "react";
import styles from "./usercard.module.css";

type SimpleUserProps = {
    name: string;
    revTag: string;
    color: string;
};

export default function UserCardSimple( simple: SimpleUserProps ) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      style={{ backgroundColor: simple.color }}
      className="usertag"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered ? `@${simple.revTag}` : (simple.name == "" ?  "-" : simple.name)}
    </div>
  );
}
