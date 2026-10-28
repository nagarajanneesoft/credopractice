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
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import ThemeToggle from "./ThemeToggle";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

function Header({ user, onLogout }) {
  const navLinkClass = ({ isActive }) =>
    isActive ? "header-link active" : "header-link";
  const { cart } = useCart();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Navbar expand="lg" className="modern-header" fixed="top">
      <Container fluid className="header-container">
        <Navbar.Brand as="div" className="brand-shell">
          <a href="/login" className="brand-logo" aria-label="Credo home">
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
            <NavLink to="/home" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
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
                Login Formik <span className="text-danger">Doute</span>
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/RegistrationFormik">
                Registration Formik <span className="text-danger">Doute</span>
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/FormikValidation">
                Formik Validation Essentials{" "}
                <span className="text-danger">Doute</span>
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/dynamicinputhandling">
                Dynamic Input Handling{" "}
                <span className="text-danger">Doute</span>
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/productionrefactor">
                Production-Ready Form Refactor
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/YupForm">
                Yup Form
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="Task_Oct"
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
                Cleanup Logic Simulation{" "}
                <span className="text-danger">Doute</span>
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/lifecycle-performance-audit">
                Lifecycle Performance Audit{" "}
                <span className="text-danger">Doute</span>
              </NavDropdown.Item>
              <NavDropdown.Item
                as={NavLink}
                to="/setting-up-navigation-foundation"
              >
                Setting Up the Navigation Foundation{" "}
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
              <hr />
              <NavDropdown.Item as={NavLink} to="/">
                Dark & Light Theame
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/">
                Auth
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/translate">
                Translate
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/cartdemo">
                Cart Demo
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/homedash">
                Dashboard
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="Practice"
              id="task-03-oct"
              className="header-dropdown"
            >
              <NavDropdown.Item as={NavLink} to="/sample-product-list">
                Sample Product List
              </NavDropdown.Item>

              <NavDropdown.Item as={NavLink} to="/location-route-page">
                Location RoutePage
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/dynamic-route-page">
                Dynamic RoutePage
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="Routing"
              id="11-oct"
              className="header-dropdown"
            >
              <NavDropdown.Item as={NavLink} to="/products">
                Products
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Hooks" id="Oct" className="header-dropdown">
              <NavDropdown.Item as={NavLink} to="/hooks">
                React Hooks
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/one">
                useState
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/two">
                useEffect
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/three">
                useRef
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/four">
                useMemo
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/five">
                useCallback
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/six">
                useReducer
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/seven">
                useContext
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/eight">
                useCustom
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="API" id="Oct" className="header-dropdown">
              <NavDropdown.Item as={NavLink} to="/fetch">
                Fetch Method
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/axiosget">
                Axios Get Method
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/axiospost">
                Axios Post Method
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/axiosnewpost">
                Axios New Post
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/axiosinstance">
                Axios Instance
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/lazzy">
                Lazzy Loader
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/memo">
                Memo
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/call">
                Use Call Back
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/emp">
                Employees
              </NavDropdown.Item>
            </NavDropdown>

            <ThemeToggle />
            <NavLink
              to="/cartdemo"
              className={navLinkClass}
              aria-label={`Cart, ${cartCount} items`}
            >
              <FaShoppingCart aria-hidden="true" />{" "}
              <sup>
                {" "}
                <h6>
                  <span className="badge bg-secondary">{cartCount}</span>
                </h6>
              </sup>
            </NavLink>
            <div className="d-flex align-items-center gap-2 ms-lg-3">
              {/* {user?.image && (
                <Image
                  src={user.image}
                  alt=""
                  roundedCircle
                  width={32}
                  height={32}
                />
              )} */}
              <span>{user?.username}</span>
              <Button size="sm" variant="danger" onClick={onLogout}>
                Logout
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
