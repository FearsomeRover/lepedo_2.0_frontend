import axios from "axios";
import { useState } from "react";
import "./newUserForm.css";
import { Link } from "react-router-dom";

export default function NewUserForm(props) {
  const [color, setColor] = useState("#000000");
  const [name, setName] = useState("");
  const [revTag, setRevTag] = useState("");
  const [freeTag, setFreeTag] = useState(true);
  const [customColor, setCustomColor] = useState(false);
  const colors = [
    "#D9515E",
    "#51BB88",
    "#F86E0B",
    "#0F8A8E",
    "#FFB100",
    "#9370DB",
    "#52BBE8",
  ];
  const checkRevTag = async () => {
    if (revTag) {
      const data = await axios.get(
        process.env.REACT_APP_BASE_URL + "/user/revtag/" + revTag
      );
      setFreeTag(data.data);
      console.log(data.data);
    }
  };
  const checkSubmit = (event) => {
    event.preventDefault();
    if (freeTag && name.length > 2) {
      axios.post(process.env.REACT_APP_BASE_URL + "/user", {
        name,
        revTag,
        color,
      });
    }
  };
  const handleColorGen = () => {
    if (!customColor) {
      setColor(
        colors[(name.charCodeAt(0) + name.charCodeAt(2)) % colors.length]
      );
      console.log('handle');
    }
  };
  return (
    <div className="popup" style={{display: (props.visible?'block':'none'), background:"white", padding:'10rem', border:"black"}}>
      <div className="h10"></div>
      <form
        method="post"
        onSubmit={checkSubmit}
        className="container"
        style={{ textAlign: "center" , background:"white"}}
      >
        <input
          placeholder="Név"
          minLength="3"
          id="name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          onBlur={handleColorGen}
        />
        <input
          placeholder="@revtag"
          name="revtag"
          pattern="[^@]*"
          title="Nem kell a @ karaktert is megadnod"
          value={revTag}
          onChange={(event) => setRevTag(event.target.value)}
          onBlur={checkRevTag}
        />
        {!freeTag && <p>Tag already registered to user!</p>}
        <input
          id="color"
          name="color"
          type="color"
          className="color"
          value={color}
          onChange={(event) => {
            setColor(event.target.value);
            setCustomColor(true);
          }}
        />
        <p>{color}</p>
        <div className="h5"></div>
        <div>
          <input className="sbtn_with_h4" type="submit" value="Mentés" />
          <button className="sbtn" onClick={props.abort}>
            <h4>Mégse</h4>
          </button>
        </div>
      </form>
    </div>
  );
}
