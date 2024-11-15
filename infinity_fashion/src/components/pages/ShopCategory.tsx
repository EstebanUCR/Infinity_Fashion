import { useEffect, useState } from 'react';
import type { Product, CartItem, ProductID } from '../../types/types';
import './shopCategory.css';
import ProductCard from '../productCard/Product';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { getProducts } from '../../services/apiService';
import type { databaseProduct } from '../../types/entities';
import type { productWithCategory } from '../../types/entities';

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
  
  const [products, setProducts] = useState<productWithCategory[]>([])

  // on render
  useEffect(() => {
    fetchProducts()
    console.log(products)
  }, []);

  const fetchProducts = async () => {
    try {
      const response: productWithCategory[] = await getProducts();
      setProducts(response)
      
      console.log(response)

    } catch (err) {
      console.error('Error fetching products', err);
    } 
  };
  
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
            
              { 
                Array.isArray(products) ? 
                  products.map(product => {
                    if (category===product.categories.name.toLowerCase()) {
                      return <ProductCard key={product.id} product={product} />
                      //  addToCart={addToCart} 
                    } else {
                      return null;
                    }
                  })
                  :
                  null
              }
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}