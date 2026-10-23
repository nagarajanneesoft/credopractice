import React from "react";
import { Container, Nav } from "react-bootstrap";

function Footer() {
  return (
    <footer className="footer mt-auto py-3 bg-light" id="footer_section">
      <Container>
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          <div className="text-muted">
            <p className="footer_title">
              &copy; VFS Global. All Rights Reserved
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
