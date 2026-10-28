import { useState } from "react";
import { Form, Alert, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { encryptPassword } from "./ApiMethods/encryptPassword";

// Live la Vercel env VITE_API_URL (Render URL + /api); local la localhost
const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function Login({ onLogin }) {
  const [step, setStep] = useState("credentials"); // "credentials" -> "otp"
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ProtectedRoute la irundhu vandhaa andha page, illana /home
  const from = location.state?.from?.pathname || "/home";

  const getErrorMessage = (err) =>
    err.response
      ? err.response.data?.message || "Something went wrong. Thirumba try pannunga"
      : "Server connect aagala. node server.js run pannunga";

  // STEP 1: username + password -> OTP anuppu
  const handleCredentials = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1) Server kitta public key + nonce vaangurom
      const keyRes = await axios.get(`${API}/public-key`);

      // 2) Password-ah encrypt pannurom (plain password network la pogaadhu)
      const encryptedPassword = await encryptPassword(
        password,
        keyRes.data.publicKey,
        keyRes.data.nonce,
      );

      // 3) Encrypted password anuppurom
      const res = await axios.post(`${API}/login`, {
        username: name.trim(),
        encryptedPassword,
      });

      setInfo(res.data.message); // "OTP anuppiyaachu: a***@gmail.com"
      setOtp("");
      setStep("otp");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: OTP verify -> login
  const handleOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${API}/verify-otp`, {
        username: name.trim(),
        otp: otp,
      });

      // Server token anuppala na (pazhaya server.js run aagudhu) stop pannurom
      if (!res.data.token) {
        setError(
          "Server la session token varala. server.js latest ah replace panni restart pannunga",
        );
        return;
      }

      // Session token-ah browser la save pannurom (ellaa API call kum use aagum)
      localStorage.setItem("accessToken", res.data.token);

      onLogin(res.data.user); // App.js la user state + localStorage update aagum
      navigate(from, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    try {
      const res = await axios.post(`${API}/resend-otp`, {
        username: name.trim(),
      });
      setInfo(res.data.message);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const backToLogin = () => {
    setStep("credentials");
    setPassword("");
    setOtp("");
    setError("");
    setInfo("");
  };

  return (
    <Container className="py-4" style={{ maxWidth: 400 }}>
      <Row className="d-flex justify-content-center">
        <Col sm={6}>
          <Card className="p-5 rounded-4">
            <h6 className="text-center">
              {step === "credentials" ? "Login" : "Verify OTP"}
            </h6>

            {error && <Alert variant="danger">{error}</Alert>}
            {step === "otp" && info && <Alert variant="success">{info}</Alert>}

            {step === "credentials" ? (
              <Form onSubmit={handleCredentials}>
                <Form.Group className="mb-3">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    placeholder="admin"
                    onChange={(e) => {
                      setName(e.target.value);
                      setError("");
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    placeholder="Admin@123"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                  />
                </Form.Group>

                <button
                  type="submit"
                  className="btn btn-success mt-2 w-100"
                  disabled={loading}
                >
                  {loading ? "Checking..." : "Submit"}
                </button>
              </Form>
            ) : (
              <Form onSubmit={handleOtp}>
                <Form.Group className="mb-3">
                  <Form.Label>Enter OTP</Form.Label>
                  <Form.Control
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otp}
                    placeholder="6 digit OTP"
                    autoFocus
                    onChange={(e) => {
                      // number mattum allow
                      setOtp(e.target.value.replace(/\D/g, ""));
                      setError("");
                    }}
                  />
                </Form.Group>

                <button
                  type="submit"
                  className="btn btn-success mt-2 w-100"
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? "Verifying..." : "Verify & Login"}
                </button>

                <div className="d-flex justify-content-between mt-3">
                  <button
                    type="button"
                    className="btn btn-link p-0"
                    onClick={backToLogin}
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-link p-0"
                    onClick={handleResend}
                  >
                    Resend OTP
                  </button>
                </div>
              </Form>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
