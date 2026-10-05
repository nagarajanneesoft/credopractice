import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

function DynamicTitleUpdater() {
  const [name, setName] = useState("");
  useEffect(() => {
    document.title = name ? `${name}` : "Default Title";
  }, [name]);
  return (
    <div>
      <h5>Task 3: Dynamic Title Updater</h5>
      <Form>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Enter Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
      </Form>
    </div>
  );
}

export default DynamicTitleUpdater;
