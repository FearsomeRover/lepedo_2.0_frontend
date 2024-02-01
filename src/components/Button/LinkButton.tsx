import {useState} from "react";
import {useRouter} from "next/navigation";


type LinkButtonProps = {
    text: String,
    textOnHover?: String,
    href: String,
}
export default function LinkButton(props: LinkButtonProps) {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();
    
    const handleMouseEnter = () => {
        setIsHovered(true);
    };
    
    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    
    const handleClick = () => {
        router.push(props.href.toString());
    }
    return (
        <div
            className = "sbtn"
            onMouseEnter = {handleMouseEnter}
            onMouseLeave = {handleMouseLeave}
            onClick = {handleClick}
        >
            <h4>
                {isHovered && props.textOnHover ? `${props.textOnHover}` : props.text}
            </h4>
        </div>
    );
}
