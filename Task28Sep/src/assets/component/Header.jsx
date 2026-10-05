// function Header() {
//   return (
//     <header className="site-header">
//       <div className="brand">
//         <a href="./">
//           <img
//             src="https://www.credosystemz.com/wp-content/uploads/2024/02/cropped-cropped-cropped-logo-1.png"
//             alt="Credo Systemz logo"
//           />
//         </a>
//       </div>
//     </header>
//   );
// }

// export default Header;

// import { NavLink } from "react-router-dom";

// function Header() {
//   const linkStyle = ({ isActive }) => ({
//     marginRight: "20px",
//     textDecoration: "none",
//     fontWeight: isActive ? "bold" : "normal",
//     color: isActive ? "red" : "blue",
//   });

//   return (
//     <nav style={{ padding: "15px", background: "#eee" }}>
//       <NavLink to="/" style={linkStyle}>
//         Home
//       </NavLink>
//       <NavLink to="/about" style={linkStyle}>
//         About
//       </NavLink>
//       <NavLink to="/contact" style={linkStyle}>
//         Contact
//       </NavLink>
//     </nav>
//   );
// }

// export default Header;

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Header() {
  const navLinkClass = ({ isActive }) =>
    isActive ? "header-link active" : "header-link";

  return (
    <Navbar expand="lg" className="modern-header">
      <Container fluid className="header-container">
        <Navbar.Brand as="div" className="brand-shell">
          <a href="/" className="brand-logo" aria-label="Credo home">
            <img
              src="https://www.credosystemz.com/wp-content/uploads/2024/02/cropped-cropped-cropped-logo-1.png"
              alt="Credo Systemz logo"
            />
          </a>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="main-navbar-nav"
          className="header-toggle"
        />
        <Navbar.Collapse id="main-navbar-nav" className="justify-content-end">
          <Nav className="header-nav">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>

            <NavDropdown
              title="Task_28-Sep"
              id="task-28-sep"
              className="header-dropdown"
            >
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
              <NavDropdown.Item as={NavLink} to="/dynamicinputhandling">
                Dynamic Input Handling
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/productionrefactor">
                Production-Ready Form Refactor
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/YupForm">
                Yup Form
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title="Task_03-Oct"
              id="task-03-oct"
              className="header-dropdown"
            >
              <NavDropdown.Item as={NavLink} to="/state-change-observer">
                State Change Observer
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/migrating-lifecycle-methods">
                Migrating Lifecycle Methods
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/dynamic-title-updater">
                Dynamic Title Updater
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/cleanup-logic-simulation">
                Cleanup Logic Simulation
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/lifecycle-performance-audit">
                Lifecycle Performance Audit
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/setting-up-navigation-foundation"
              >
                Setting Up the Navigation Foundation
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/structuring-routes">
                Structuring Routes
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/implementing-navigation-elements"
              >
                Implementing Navigation Elements
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/user-profiles/name">
                Dynamic Routing for User Profiles
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/advanced-directory-strategy-and-404-handling"
              >
                Advanced Directory Strategy & 404 Handling
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
