import { useState } from "react";
import { Form } from "react-bootstrap";

function LoginManual() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, password });
  };
  return (
    <div>
      <h5>Task 1A: Login (useState)</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Enter Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Enter Password</Form.Label>
          <Form.Control
            type="password"
            className="form-control"
            value={password}
            placeholder="name@123"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <button type="submit" className="btn btn-success mt-2">
          Submit
        </button>
      </Form>

      <h6>Name : {name}</h6>
      <h6>Password : {password}</h6>
    </div>
  );
}

export default LoginManual;
