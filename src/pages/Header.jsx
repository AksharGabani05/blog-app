import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // Importing a hamburger icon from react-icons

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          My Blog
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <FaBars className="text-white" size={24} /> {/* Custom hamburger icon */}
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="text-white">
              Home
            </Nav.Link>
            <Nav.Link href="#about" className="text-white">
              About
            </Nav.Link>
            <Nav.Link href="#contact" className="text-white">
              Contact
            </Nav.Link>
          </Nav>
          <Button as={Link} to="/create" variant="primary" className="ms-3">
            + Create New Post
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
