import {useState} from "react";
import styles from "./linkbutton.module.css";


type LinkButtonProps = {
    text: String,
    textOnHover: String,
    href: String,
}
export default function LinkButton(props: LinkButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    
    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    return (
        <div
            className = {styles.sbtn}
            onMouseEnter = {handleMouseEnter}
            onMouseLeave = {handleMouseLeave}
            /*todo actual navigation to href*/
        >
            <h4>
                {isHovered ? `@${props.textOnHover}` : props.text}
            </h4>
        </div>
    );
}
