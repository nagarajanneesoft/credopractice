import { NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
function Header() {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary bg-header border-bottom"
      fixed="top"
    >
      <Container>
        <Navbar.Brand href="./">
          <div className="">
            <img
              src="https://www.credosystemz.com/wp-content/uploads/2024/02/cropped-cropped-cropped-logo-1.png"
              alt="Credo Systemz logo"
            />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <NavDropdown
            title="React Hooks"
            id="hooks-dropdown"
            className="header-dropdown"
          >
            <NavDropdown.Item as={Link} to="/one">
              useState
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/two">
              useEffect
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/three">
              useRef
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/four">
              useMemo
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/five">
              useCallback
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/six">
              useReducer
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/seven">
              useContext
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/eight">
              useCustom
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
