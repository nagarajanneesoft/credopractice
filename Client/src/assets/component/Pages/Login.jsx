import { useState } from "react";
import { Form, Alert, Button, Spinner, InputGroup } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaArrowLeft,
  FaCheckCircle,
  FaKey,
} from "react-icons/fa";
import { encryptPassword } from "./ApiMethods/encryptPassword";
import "../../Style/Login.css";

// Live la Vercel env VITE_API_URL (Render URL + /api); local la localhost
const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const features = [
  { icon: FaLock, text: "End-to-end encrypted password" },
  { icon: FaShieldAlt, text: "Two-step OTP verification" },
  { icon: FaCheckCircle, text: "Protected dashboard access" },
];

function Login({ onLogin }) {
  const [step, setStep] = useState("credentials"); // "credentials" -> "otp"
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ProtectedRoute la irundhu vandhaa andha page, illana /home
  const from = location.state?.from?.pathname || "/home";

  const getErrorMessage = (err) =>
    err.response
      ? err.response.data?.message ||
        "Something went wrong. Thirumba try pannunga"
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
    setResending(true);
    try {
      const res = await axios.post(`${API}/resend-otp`, {
        username: name.trim(),
      });
      setInfo(res.data.message);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setResending(false);
    }
  };

  const backToLogin = () => {
    setStep("credentials");
    setPassword("");
    setOtp("");
    setError("");
    setInfo("");
  };

  const isOtpStep = step === "otp";
  const canSubmitCredentials = name.trim() && password && !loading;

  return (
    <div className="login-page">
      <div className="login-shell">
        {/* ===== Left: Brand panel (desktop only) ===== */}
        <aside className="login-brand d-none d-lg-flex">
          <div className="login-brand-logo">
            <img
              src="https://www.credosystemz.com/wp-content/uploads/2024/02/cropped-cropped-cropped-logo-1.png"
              alt="Credo Systemz logo"
            />
          </div>

          <div className="login-brand-body">
            <h1 className="login-brand-title">
              Learn. Build.
              <br />
              Grow.
            </h1>
            <p className="login-brand-text">
              Your React practice workspace — tasks, hooks, APIs and projects,
              all in one place.
            </p>

            <ul className="login-features">
              {features.map(({ icon: Icon, text }) => (
                <li key={text}>
                  <span className="login-feature-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <p className="login-brand-footer">
            © {new Date().getFullYear()} Credo Systemz
          </p>
        </aside>

        {/* ===== Right: Form ===== */}
        <main className="login-form-side">
          <div className="login-form-inner">
            {/* Mobile la mattum logo */}
            <div className="login-mobile-logo d-lg-none">
              <img
                src="https://www.credosystemz.com/wp-content/uploads/2024/02/cropped-cropped-cropped-logo-1.png"
                alt="Credo Systemz logo"
              />
            </div>

            {/* Step indicator */}
            <div className="login-steps" aria-label="Login progress">
              <div className={`login-step ${!isOtpStep ? "current" : "done"}`}>
                <span className="login-step-dot">
                  {isOtpStep ? <FaCheckCircle /> : "1"}
                </span>
                Sign in
              </div>
              <div className="login-step-line" />
              <div className={`login-step ${isOtpStep ? "current" : ""}`}>
                <span className="login-step-dot">2</span>
                Verify
              </div>
            </div>

            {/* Heading */}
            <div className="mb-4">
              <h2 className="login-title">
                {isOtpStep ? "Check your email" : "Welcome back"}
              </h2>
              <p className="login-subtitle">
                {isOtpStep
                  ? "Enter the 6-digit code we sent to continue."
                  : "Sign in to continue to your dashboard."}
              </p>
            </div>

            {error && (
              <Alert variant="danger" className="login-alert">
                {error}
              </Alert>
            )}
            {isOtpStep && info && (
              <Alert variant="success" className="login-alert">
                {info}
              </Alert>
            )}

            {!isOtpStep ? (
              /* ===== STEP 1: Credentials ===== */
              <Form onSubmit={handleCredentials} noValidate>
                <Form.Group className="mb-3" controlId="login-username">
                  <Form.Label className="login-label">Username</Form.Label>
                  <InputGroup className="login-input-group">
                    <InputGroup.Text>
                      <FaUser aria-hidden="true" />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      size="lg"
                      value={name}
                      placeholder="Admin / Demo"
                      autoComplete="username"
                      autoFocus
                      onChange={(e) => {
                        setName(e.target.value);
                        setError("");
                      }}
                    />
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-4" controlId="login-password">
                  <Form.Label className="login-label">Password</Form.Label>
                  <InputGroup className="login-input-group">
                    <InputGroup.Text>
                      <FaLock aria-hidden="true" />
                    </InputGroup.Text>
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      size="lg"
                      value={password}
                      placeholder="Admin@123 / Demo@123"
                      autoComplete="current-password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                    />
                    <Button
                      variant="link"
                      className="login-eye-btn"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputGroup>
                </Form.Group>

                <Button
                  type="submit"
                  size="lg"
                  className="btn-login w-100"
                  disabled={!canSubmitCredentials}
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" className="me-2" />
                      Checking...
                    </>
                  ) : (
                    "Continue"
                  )}
                </Button>

                <p className="login-secure-note">
                  <FaShieldAlt aria-hidden="true" /> Your password is encrypted
                  before it leaves this device.
                </p>
              </Form>
            ) : (
              /* ===== STEP 2: OTP ===== */
              <Form onSubmit={handleOtp} noValidate>
                <Form.Group className="mb-4" controlId="login-otp">
                  <Form.Label className="login-label">
                    <FaKey aria-hidden="true" className="me-1" /> Verification
                    code
                  </Form.Label>
                  <Form.Control
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    value={otp}
                    placeholder="••••••"
                    className="login-otp-input"
                    autoFocus
                    onChange={(e) => {
                      // number mattum allow
                      setOtp(e.target.value.replace(/\D/g, ""));
                      setError("");
                    }}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  size="lg"
                  className="btn-login w-100"
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? (
                    <>
                      <Spinner size="sm" className="me-2" />
                      Verifying...
                    </>
                  ) : (
                    "Verify & Sign in"
                  )}
                </Button>

                <div className="login-otp-actions">
                  <Button
                    variant="link"
                    className="login-text-btn"
                    onClick={backToLogin}
                  >
                    <FaArrowLeft aria-hidden="true" className="me-1" /> Back
                  </Button>
                  <span className="text-body-secondary small">
                    Didn't get it?{" "}
                    <Button
                      variant="link"
                      className="login-text-btn fw-semibold"
                      onClick={handleResend}
                      disabled={resending}
                    >
                      {resending ? "Sending..." : "Resend code"}
                    </Button>
                  </span>
                </div>
              </Form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Login;
