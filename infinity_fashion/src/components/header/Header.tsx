import React from "react";
import "./header.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <div>

    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Infinity Fashion</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <Nav.Link href="#search">Search</Nav.Link>
            <Nav.Link href="#signIn">Sign In</Nav.Link>
            <Nav.Link href="#shoppingBag">Shopping Bag</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
          <Nav className="mx-auto">
          <Nav.Link href="#tops">Tops</Nav.Link>
            <Nav.Link href="#bottoms">Bottoms</Nav.Link>
            <Nav.Link href="#dresses">Dresses</Nav.Link>
            <Nav.Link href="#jackets">Jackets</Nav.Link>
            <Nav.Link href="#shoes">Shoes</Nav.Link>
          </Nav>
      </Container>
    </Navbar>

    </div>
  )
}

export default Header