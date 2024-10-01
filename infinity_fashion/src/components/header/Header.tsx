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
import { faShoppingBag, faSearch } from '@fortawesome/free-solid-svg-icons';
import './header.css';
import { useState } from 'react';

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

  // Función para alternar la visibilidad del cuadro de búsqueda
  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

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
              <Link className="nav-link nav-titles" to='/'>HOME</Link>
              <Link className="nav-link nav-titles" to='/tops'>TOPS</Link>
              <Link className="nav-link nav-titles" to='/bottoms'>BOTTOMS</Link>
              <Link className="nav-link nav-titles" to='/outerwear'>OUTERWEAR</Link>
              <Link className="nav-link nav-titles" to='/accessories'>ACCESSORIES</Link>
              <Link className="nav-link nav-titles" to='/shoes'>SHOES</Link>
            </Nav>

            <div className="nav-right">
  
              <FontAwesomeIcon 
                icon={faSearch} 
                className="search-icon" 
                size="lg" 
                onClick={toggleSearch} 
                style={{ cursor: 'pointer', marginTop: '5px', marginRight: '-10px' }}
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
                            <img src={item.image} alt={item.name} className="search-result-image" />
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
                <Link className="nav-link" to='/signIn'>Sign In</Link>
                <div className='carrito'>
                  <Link className="nav-link" to='#'>
                    <FontAwesomeIcon icon={faShoppingBag} size="xl" />
                  </Link>
                  <div id='carrito' className='bg-white p-3'>
                    {isEmpty ? (
                      <h3 className='text-center'>El carrito está vacio</h3>
                    ) : (
                      <>
                        <table className='w-100 table'>
                          <thead>
                            <tr>
                              <th className='cart-titles'>Imagen</th>
                              <th className='cart-titles'>Nombre</th>
                              <th className='cart-titles'>Precio</th>
                              <th className='cart-titles'>Cantidad</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {cart.map(product => (
                              <tr key={product.id}>
                                <td>
                                  <img className='img-fluid' src={product.image} />
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
                        <p className='text-end'>Total pagar: <span className='fw-bold'>${cartTotal.toFixed(2)}</span></p>

                        <button
                          className='btn btn-dark'
                          onClick={clearCart}
                        >Vaciar Carrito</button>
                        <button
                          className='btn btn-pay w-100 mt-3 p-2'
                        >Finalizar Compra</button>
                      </>
                    )}
                  </div>
                </div>
              </Nav>
            </div>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
