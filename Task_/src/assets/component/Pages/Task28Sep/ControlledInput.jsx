import { useState } from "react";
import Form from "react-bootstrap/Form";

function ControlledInput() {
  const [text, setText] = useState("");
  return (
    <div>
      <h5>Task 2: Controlled Input Field</h5>
      <div className="mt=2 d-flex gap-2">
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Enter Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>
        </Form>
      </div>
      <h6>Username : {text}</h6>
      <h6>Username Count : {text.length}</h6>
    </div>
  );
}

export default ControlledInput;
