import React from 'react'
import './shopCategory.css';
import ProductCard from '../productCard/Product';
import all_products from '../../assets/all_products';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface MyProps {
  filterName: string;
  category: string;
}

const ShopCategory: React.FC<MyProps> = ({ filterName, category }) => {
  return (
    <div className='shop-category'>
      <Header />
      <Container>
        <Row>
          <h1>{filterName}</h1>
        </Row>
        <Row>
          <Col md="auto">
            <div className='filters'>
              <h2>Filters</h2>
              <Link className="filter-link" to='/tops'>Tops</Link>
              <Link className="filter-link" to='/bottoms'>Bottoms</Link>
              <Link className="filter-link" to='/outerwear'>Outerwear</Link>
              <Link className="filter-link" to='/accessories'>Accessories</Link>
              <Link className="filter-link" to='/shoes'>Shoes</Link>
            </div>
          </Col>
          <Col>
            <div className='shopcategory-products'>
            
            {all_products.map((item, i)=>{
              if (category===item.category) {
                return <ProductCard key={i} {...item} />
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


export default ShopCategory