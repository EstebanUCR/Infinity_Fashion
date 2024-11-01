import type { Product, CartItem, ProductID } from '../../types/types';
import './shopCategory.css';
import ProductCard from '../productCard/Product';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';
import Accordion from 'react-bootstrap/Accordion';

type ShopCategoryProps = {
  cart: CartItem[]
  removeFromCart: (id: ProductID) => void
  increaseQuantity: (id: ProductID) => void
  decreaseQuantity: (id: ProductID) => void
  clearCart: () => void
  isEmpty: boolean
  cartTotal: number
  data: Product[]
  addToCart: (item: Product) => void
  filterName: string
  category: string
}


export default function ShopCategory ({cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, cartTotal, data, addToCart, filterName, category} : ShopCategoryProps) {
  return (
    <div className='shop-category'>
      <Header 
        cart={cart} 
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />
      <Container>
        <Row>
          <h1 className='categoryTitle'>{filterName}</h1>
        </Row>
        <Row>
          <Col md="auto">
            <div className='filters'>
              <Accordion defaultActiveKey="0" flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Filter</Accordion.Header>
                  <Accordion.Body>
                    <Link className="filter-link" to='/tops'>Tops</Link>
                    <Link className="filter-link" to='/bottoms'>Bottoms</Link>
                    <Link className="filter-link" to='/outerwear'>Outerwear</Link>
                    <Link className="filter-link" to='/accessories'>Accessories</Link>
                    <Link className="filter-link" to='/shoes'>Shoes</Link>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </Col>
          <Col>
            <div className='shopcategory-products'>
            
            {data.map((item)=>{
              if (category===item.category) {
                return <ProductCard key={item.id} product={item} addToCart={addToCart}  />
              }
              else {
                return null;
              }
            })}
          
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}