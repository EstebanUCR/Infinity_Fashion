import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import img1 from '../../assets/Home/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import './header.css';

const Header: React.FC = () => {
  return (
    <header>
      <Container className="logo-container">
        <img
          src={img1}
          className="logo"
          alt="Infinity Fashion Logo"
        />
      </Container>

      <Navbar expand="lg" className="navbar-custom">
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">

            <Nav className="nav-links">
              <Link className="nav-link" to='/'>HOME</Link>
              <Link className="nav-link" to='/tops'>TOPS</Link>
              <Link className="nav-link" to='/bottoms'>BOTTOMS</Link>
              <Link className="nav-link" to='/outerwear'>OUTERWEAR</Link>
              <Link className="nav-link" to='/accessories'>ACCESSORIES</Link>
              <Link className="nav-link" to='/shoes'>SHOES</Link>
            </Nav>

            <div className="nav-right">
              <Form className="search-form">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  aria-label="Search"
                />
                <Button variant="outline-dark" className="search-button">Search</Button>
              </Form>
              <Nav className="auth-links">
                <Link className="nav-link" to='/signIn'>Sign In</Link>
                <Link className="nav-link" to='/shoppingBag'>
                  <FontAwesomeIcon icon={faShoppingBag} size="xl" />
                </Link>
              </Nav>
            </div>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
