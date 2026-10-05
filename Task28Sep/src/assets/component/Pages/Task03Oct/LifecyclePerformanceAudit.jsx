import { useState, useCallback, memo } from "react";
import { Form, Card } from "react-bootstrap";

const Child = memo(function Child({ name, onClick }) {
  console.log("Child rendered 😩");
  return <button onClick={onClick}>{name}</button>;
});

function LifecyclePerformanceAudit() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const handleClick = useCallback(() => {
    console.log("Child button clicked");
  }, []);

  return (
    <div>
      <h5>Task 5: Lifecycle Performance Audit</h5>
      <p>Count: {count}</p>

      <Form>
        <Form.Group className="mb-3" controlId="">
          <button
            type="button"
            className="btn btn-success mb-2"
            onClick={() => setCount(count + 1)}
          >
            Increase
          </button>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="form-control mb-2"
          />
          <Child name="Child Button" onClick={handleClick} />
        </Form.Group>
      </Form>
      <Card className="p-2 mt-2">
        <p className="p-0 m-0 text-danger">Doute</p>
      </Card>
    </div>
  );
}

export default LifecyclePerformanceAudit;
