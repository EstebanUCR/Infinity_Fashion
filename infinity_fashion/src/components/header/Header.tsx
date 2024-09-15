import React from 'react';
import "./header.css";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import img1 from '../../assets/Home/logo.png'; 

const Header = () => {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid className="d-flex justify-content-center">
          <Navbar.Brand href="#">
            <img
              src={img1}
              alt="Logo"
              width="200" 
              height="100" 
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>

         <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid className="d-flex justify-content-center">
         <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
           <Nav className="ms-auto">
            <Nav.Link href="#signIn">Sign In</Nav.Link>
            <Nav.Link href="#shoppingBag">Shopping Bag</Nav.Link>
          </Nav>
             
        </Container>
      </Navbar>

      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0 mx-auto nav-links" style={{ maxHeight: '100px' }} navbarScroll>
              <Link className="nav-link" to='/'>HOME</Link>
              <Link className="nav-link" to='/top'>TOPS</Link>
              <Link className="nav-link" to='/bottom'>BOTTOMS</Link>
              <Link className="nav-link" to='/outwear'>OUTWEARS</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </div>
  );
};

export default Header;
