import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap'

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg" className="navbar">
      <Container>
        <Navbar.Brand><Link to="/" style={{color: "black", textDecoration: "none"}}>Movies tracker</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse id="navbar">
          <Nav className="me-auto">
            <Link to='/' style={{color: "black", textDecoration: "none", margin: "10px"}}>Home</Link>
            <Link to='/login' style={{color: "black", textDecoration: "none", margin: "10px"}}>Login</Link>
            <Link to='/register' style={{color: "black", textDecoration: "none", margin: "10px"}}>Register</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation;