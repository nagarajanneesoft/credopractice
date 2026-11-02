import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";
import { NavLink, useLocation } from "react-router-dom";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import ThemeToggle from "./ThemeToggle";
import { useCart } from "../context/CartContext";
import { megaMenu } from "../component/menuData";
import "./../Style/Header.css";

function Header({ user, onLogout }) {
  const navLinkClass = ({ isActive }) =>
    isActive ? "header-link active" : "header-link";

  const { cartCount } = useCart();
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");

  // Search filter - type panna topic mattum kaatum
  const search = query.trim().toLowerCase();
  const filteredMenu = megaMenu
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.label.toLowerCase().includes(search),
      ),
    }))
    .filter((section) => section.items.length > 0);

  // Current page mega menu la irundha "Learning" highlight aagum
  const isMegaActive = megaMenu.some((section) =>
    section.items.some((item) => item.to !== "/" && item.to === pathname),
  );

  return (
    <Navbar expand="lg" className="modern-header" fixed="top">
      <Container className="header-container">
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
          <Nav className="header-nav align-items-lg-center">
            {/* ===== Mega Menu ===== */}
            <NavDropdown
              title="Learning"
              id="mega-menu"
              className={`header-dropdown mega-dropdown ${
                isMegaActive ? "mega-active" : ""
              }`}
              onToggle={(isOpen) => {
                if (!isOpen) setQuery(""); // close aanaa search reset
              }}
            >
              {/* Search box */}
              <div className="mega-search">
                <FaSearch className="mega-search-icon" aria-hidden="true" />
                <Form.Control
                  size="sm"
                  type="search"
                  placeholder="Search topics..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    // Typing pannumbodhu dropdown keyboard handling thadukkaama irukka
                    if (e.key !== "Escape") e.stopPropagation();
                  }}
                  aria-label="Search topics"
                />
              </div>

              {filteredMenu.length === 0 ? (
                <p className="text-muted small text-center my-3">
                  No topics found for "{query}"
                </p>
              ) : (
                <div className="mega-grid">
                  {filteredMenu.map((section) => {
                    const Icon = section.icon;
                    return (
                      <div className="mega-section" key={section.title}>
                        <h6 className="mega-title">
                          <Icon aria-hidden="true" /> {section.title}
                        </h6>
                        {section.items.map((item) => (
                          <NavDropdown.Item
                            key={item.label}
                            as={NavLink}
                            to={item.to}
                            end
                            className="mega-link"
                          >
                            {item.label}
                            {item.doubt && (
                              <Badge
                                bg="danger-subtle"
                                text="danger"
                                className="ms-2"
                              >
                                Doubt
                              </Badge>
                            )}
                          </NavDropdown.Item>
                        ))}
                      </div>
                    );
                  })}
                </div>
              )}
            </NavDropdown>

            <ThemeToggle />

            {/* Cart */}
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `${navLinkClass({ isActive })} cart-link`
              }
              aria-label={`Cart, ${cartCount} items`}
            >
              <FaShoppingCart aria-hidden="true" size={20} />
              {cartCount > 0 && (
                <Badge bg="danger" pill className="cart-badge">
                  {cartCount}
                </Badge>
              )}
            </NavLink>

            {/* User */}
            <div className="d-flex align-items-center gap-2 ms-lg-3">
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
