import { useState } from "react";
import { Form, Alert, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { users } from "../Pages/data/userData";

function Login({ onLogin }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // ProtectedRoute la irundhu vandhaa andha page, illana /products
  const from = location.state?.from?.pathname || "/home";

  const handleSubmit = (e) => {
    e.preventDefault();

    // username + password rendum match aagura user-ah thedurom
    const foundUser = users.find(
      (u) => u.username === name.trim() && u.password === password,
    );

    if (!foundUser) {
      setError("Username or password Wrong 😕");
      return;
    }

    const safeUser = Object.fromEntries(
      Object.entries(foundUser).filter(
        ([key]) =>
          key !== "password" && key !== "accessToken" && key !== "refreshToken",
      ),
    );

    onLogin(safeUser); // App.js la user state + localStorage update aagum
    navigate(from, { replace: true }); // Back button la login page varaadhu
  };

  return (
    <Container className="py-4" style={{ maxWidth: 400 }}>
      <Row className="d-flex justify-content-center">
        <Col sm={6}>
          <Card className="p-5 rounded-4">
            <h6 className="text-center">Login</h6>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  placeholder="Test"
                  onChange={(e) => {
                    setName(e.target.value);
                    setError(""); // type panna error clear
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  placeholder="Test@123"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                />
              </Form.Group>

              <button type="submit" className="btn btn-success mt-2 w-100">
                Submit
              </button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
