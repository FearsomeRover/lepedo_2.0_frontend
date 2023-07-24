import { ChromePicker } from "react-color";
import { useState } from "react";

export default function CustomColorPicker(props) {
  const [blockPickerColor, setBlockPickerColor] = useState("#37d67a");
  const [pickerOpen, setPickerOpen] = useState(false);
  const handleClick = () => {
    setPickerOpen(true);
  };
  if (pickerOpen) {
    return (
      <div
        style={{
          position: "absolute",
          zIndex: "2",
          textAlign: "center",
          ...props.style
        }}
        className={props.className}
      >
        <div
          style={{
            position: "fixed",
            top: "0px",
            right: "0px",
            bottom: "0px",
            left: "0px",
          }}
          onClick={() => setPickerOpen(false)}
        />
        <ChromePicker
          disableAlpha={true}
          color={blockPickerColor}
          onChange={(color) => {
            setBlockPickerColor(color.hex);
            props.onChange(color.hex);
          }}
        />
      </div>
    );
  }
  return <button className="sbtn" onClick={() => setPickerOpen(true)}>Color</button>;
}
