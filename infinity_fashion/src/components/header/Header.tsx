import { CartItem, ProductID } from '../../types/types';
import { all_products } from "../../assets/all_products";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import img1 from '../../assets/Home/logoWithOutBackground.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag, faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import './header.css';
import { useState, useEffect } from 'react';
import { useUserContext } from '../Context/userContext';

type HeaderProps = {
  cart: CartItem[]
  removeFromCart: (id: ProductID) => void
  increaseQuantity: (id: ProductID) => void
  decreaseQuantity: (id: ProductID) => void
  clearCart: () => void
  isEmpty: boolean
  cartTotal: number
}

export default function Header({ cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, cartTotal }: HeaderProps) {
  const [search, setSearch] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Función para alternar la visibilidad del cuadro de búsqueda
  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  
  // TODO: Revisar cambiar el estado en tiempo real
  const [userData, setUser] = useState(null);
  const [userToken, setUserToken] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const { user } = useUserContext();

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    if (userToken) {
      // setUser(JSON.parse(storedUser));
      validateToken()
    }
  }, []);

  const validateToken = async () => {
    const userToken = localStorage.getItem('token');
    if (userToken) {
      console.log(userToken)
      const response = await fetch('http://localhost:3000/protected', {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'authorization': 'Basic ' + userToken
        },
      });
      console.log(userToken)
      const data = await response.json();
      console.log('Protected data:', data);
      
      setUserToken(userToken)
    }
  } 

  const handleLogOut = () => {
    localStorage.clear()
    location.reload()
  };
  
  return (
    <header>
      <div className="menu-toggle" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="close-btn" onClick={toggleSidebar}>
            &times;
          </button>
        </div>
        <nav className="sidebar-nav">
          <div className="sidebar-search">
            <FontAwesomeIcon
              icon={faSearch}
              className="search-icon"
              size="lg"
              onClick={toggleSearch}
              style={{ cursor: 'pointer' }}
            />

            {isSearchOpen && (
              <Form className="search-form">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="search-input"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search !== '' && (
                  <div className="search-results">
                    {all_products.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
                      .map((item, index) => (
                        <div key={index} className="search-result-item">
                          <Link to={`/product/${item.id}`}>
                            <img src={item.image[0]} alt={item.name} className="search-result-image" />
                            <span>{item.name}</span>
                          </Link>
                        </div>
                      ))}
                  </div>
                )}
              </Form>
            )}
          </div>
          <Link className="nav-link nav-titles" to='/'>HOME</Link>
          <Link className="nav-link nav-titles" to='/tops'>TOPS</Link>
          <Link className="nav-link nav-titles" to='/bottoms'>BOTTOMS</Link>
          <Link className="nav-link nav-titles" to='/outerwear'>OUTERWEAR</Link>
          <Link className="nav-link nav-titles" to='/accessories'>ACCESSORIES</Link>
          <Link className="nav-link nav-titles" to='/shoes'>SHOES</Link>
          { userToken.length > 0 ? (
            <Link className="nav-link" to='/' onClick={handleLogOut}>Log Out</Link>
          ) : (
            <Link className="nav-link" to='/signIn'>Sign In</Link>
          )}
          <div className="sidebar-icons">
            <Link to='/shoppingBag'>
              <FontAwesomeIcon
                icon={faShoppingBag}
                className="cart-icon-sidebar"
                size="lg"
                style={{ cursor: 'pointer' }}
              />
            </Link>
          </div>
        </nav>
      </div>
      <Container fluid className="logo-container">
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
              <Link className="nav-link nav-titles" to='/'>HOME</Link>
              <Link className="nav-link nav-titles" to='/tops'>TOPS</Link>
              <Link className="nav-link nav-titles" to='/bottoms'>BOTTOMS</Link>
              <Link className="nav-link nav-titles" to='/outerwear'>OUTERWEAR</Link>
              <Link className="nav-link nav-titles" to='/accessories'>ACCESSORIES</Link>
              <Link className="nav-link nav-titles" to='/shoes'>SHOES</Link>
            </Nav>

            <Nav className="nav-right">

              <FontAwesomeIcon
                icon={faSearch}
                className="search-icon"
                size="lg"
                onClick={toggleSearch}
                style={{ cursor: 'pointer' }}
              />

              {isSearchOpen && (
                <Form className="search-form">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="search-input"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button variant="outline-dark" className="search-button">Search</Button>


                  {search !== '' && (
                    <div className="search-results">
                      {all_products.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
                        .map((item, index) => (
                          <div key={index} className="search-result-item">
                            <Link to={`/product/${item.id}`}>
                              {/* Mostrar la imagen del producto */}
                              <img src={item.image[0]} alt={item.name} className="search-result-image" />
                              {/* Mostrar el nombre del producto */}
                              <span>{item.name}</span>
                            </Link>
                          </div>
                        ))}
                    </div>
                  )}
                </Form>
              )}

              <Nav className="auth-links">
              
                { userToken.length > 0 ? (
                  <Link className="nav-link" to='/' onClick={handleLogOut}>Logout</Link>
                ) : (
                  <Link className="nav-link" to='/signIn'>Sign In</Link>
                )}
                
                <div className='carrito'>
                  <Link className="nav-link" to='#'>
                    <FontAwesomeIcon icon={faShoppingBag} size="xl" />
                  </Link>
                  <div id='carrito' className='bg-white p-3'>
                    {isEmpty ? (
                      <h3 className='text-center'>No items!</h3>
                    ) : (
                      <>
                        <table className='w-100 table'>
                          <thead>
                            <tr>
                              <th className='cart-titles'>Image</th>
                              <th className='cart-titles'>Name</th>
                              <th className='cart-titles'>Price</th>
                              <th className='cart-titles'>Quantity</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {cart.map(product => (
                              <tr key={product.id}>
                                <td>
                                  <img className='img-fluid' src={product.image[0]} />
                                </td>
                                <td>{product.name}</td>
                                <td className='fw-bold'>
                                  ${product.price}
                                </td>
                                <td className='flex align-items-start gap-4'>
                                  <button
                                    type='button'
                                    className='btn btn-dark'
                                    onClick={() => decreaseQuantity(product.id)}
                                  >-</button>
                                  {product.quantity}
                                  <button
                                    type='button'
                                    className='btn btn-dark'
                                    onClick={() => increaseQuantity(product.id)}
                                  >+</button>
                                </td>
                                <td>
                                  <button
                                    className='btn btn-danger'
                                    type='button'
                                    onClick={() => removeFromCart(product.id)}
                                  >X</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <p className='text-end'>Total: <span className='fw-bold'>${cartTotal.toFixed(2)}</span></p>

                        <button
                          className='btn btn-dark'
                          onClick={clearCart}
                        >Clear Cart</button>
                        <Link className='btn btn-pay w-100 mt-3 p-2' to='/shoppingBag'>Go to checkout</Link>
                      </>
                    )}
                  </div>
                </div>
              </Nav>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
