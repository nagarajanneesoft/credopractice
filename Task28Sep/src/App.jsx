import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
// import HomePage from "./assets/component/Pages/Home";
// import AboutPage from "./assets/component/Pages/About";
import { Col, Container, NavDropdown, Row } from "react-bootstrap";
import ColorButtons from "./assets/component/Pages/Task28Sep/ColorButtons";
import ControlledInput from "./assets/component/Pages/Task28Sep/ControlledInput";
import AsyncCounter from "./assets/component/Pages/Task28Sep/AsyncCounter";
import CompareForm from "./assets/component/Pages/Task28Sep/CompareForm";
import FastClicker from "./assets/component/Pages/Task28Sep/FastClicker";
import LoginManual from "./assets/component/Pages/Task28Sep/LoginManual";
import LoginFormik from "./assets/component/Pages/Task28Sep/LoginFormik";
import RegistrationFormik from "./assets/component/Pages/Task28Sep/RegistrationFormik";
import SimpleCounter from "./assets/component/Pages/Task28Sep/SimpleCounter";
import FormikValidation from "./assets/component/Pages/Task28Sep/FormikValidation";
import YupForm from "./assets/component/Pages/Task28Sep/YupForm";
import DynamicInputHandling from "./assets/component/Pages/Task28Sep/DynamicInputHandling";
import RegisterForm from "./assets/component/Pages/Task28Sep/RegisterForm";

function App() {
  return (
    <BrowserRouter>
      <header className="site-header">
        <div className="brand">
          <a href="./">
            <img src="https://www.credosystemz.com/wp-content/uploads/2024/02/cropped-cropped-cropped-logo-1.png" />
          </a>
        </div>
      </header>

      <Container>
        <Row>
          <Col>
            <nav className="main-nav" aria-label="Main navigation">
              <ul>
                {/* <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                About
              </NavLink>
            </li> */}
                <li>
                  <NavDropdown title="Task-28-09" id="basic-nav-dropdown">
                    <NavDropdown.Item as={NavLink} to="/ColorButtons">
                      Color Buttons
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/ControlledInput">
                      Controlled Input
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/AsyncCounter">
                      Async Counter
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/SimpleCounter">
                      Simple Counter
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/CompareForm">
                      Compare Form
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/FastClicker">
                      Fast Clicker
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/LoginManual">
                      Login Manual
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/LoginFormik">
                      Login Formik
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/RegistrationFormik">
                      Registration Formik
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/FormikValidation">
                      Formik Validation Essentials
                    </NavDropdown.Item>
                    {/* <NavDropdown.Item
                      as={NavLink}
                      to="/dynamicinputhandling"
                      className="text-danger"
                    >
                      Dynamic Input Handling
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={NavLink}
                      to="/productionrefactor"
                      className="text-danger"
                    >
                      Production-Ready Form Refactor{" "}
                    </NavDropdown.Item> */}
                    <NavDropdown.Item as={NavLink} to="/YupForm">
                      Yup Form
                    </NavDropdown.Item>
                  </NavDropdown>
                </li>
              </ul>
            </nav>
          </Col>
        </Row>
        <Row>
          <Col>
            <Routes>
              {/* <Route path="/home" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} /> */}

              <Route path="/ColorButtons" element={<ColorButtons />} />
              <Route path="/ControlledInput" element={<ControlledInput />} />
              <Route path="/AsyncCounter" element={<AsyncCounter />} />
              <Route path="/SimpleCounter" element={<SimpleCounter />} />
              <Route path="/CompareForm" element={<CompareForm />} />
              <Route path="/FastClicker" element={<FastClicker />} />

              <Route path="/LoginManual" element={<LoginManual />} />
              <Route path="/LoginFormik" element={<LoginFormik />} />
              <Route
                path="/RegistrationFormik"
                element={<RegistrationFormik />}
              />
              <Route path="/formikvalidation" element={<FormikValidation />} />
              {/* <Route
                path="/dynamicinputhandling"
                element={<DynamicInputHandling />}
              />
              
              <Route path="/productionrefactor" element={<RegisterForm />} /> */}

              <Route path="/YupForm" element={<YupForm />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;
