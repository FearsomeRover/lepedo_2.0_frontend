import { useState } from "react"
import NewUserForm from "../NewUserForm";
export default function NewUser(){
    const [visible, setVisible] = useState(false);
    return(
    <div>
        <button onClick={() => setVisible((state)=> !state)}>show</button>
        <NewUserForm visible={visible}/>
    </div>
    )
}