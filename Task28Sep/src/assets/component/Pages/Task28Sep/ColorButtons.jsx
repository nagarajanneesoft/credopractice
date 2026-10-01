import { useState } from "react";
import { Card } from "react-bootstrap";

function ColorButtons() {
  const [message, setMessage] = useState("");
  const handleClick = (event) => {
    const color = event.target.textContent;
    console.log(color + " button clicked");
    setMessage(color + " button clicked");
  };
  return (
    <div>
      <h5>Task 1: Color Buttons</h5>
      <div className="mt=2 d-flex gap-2">
        <button type="button" className="btn btn-danger" onClick={handleClick}>
          Red - Username
        </button>
        <button type="button" className="btn btn-success" onClick={handleClick}>
          Green
        </button>
        <button type="button" className="btn btn-info" onClick={handleClick}>
          Blue
        </button>
      </div>
      <div className="p-2 mt-2">
        <b>{message}</b>
      </div>
    </div>
  );
}

export default ColorButtons;
