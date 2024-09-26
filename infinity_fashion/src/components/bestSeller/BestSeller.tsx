import React from 'react';
import './bestSeller.css'; // Mantén este archivo CSS
import bestsellers_products from '../../assets/bestSellerProducts';
import { Carousel, Button } from 'react-bootstrap';
import ProductCard from '../productCard/Product';

const BestSeller = () => {
  // Agrupar productos de 3 en 3
  const groupedProducts = bestsellers_products.reduce((acc, curr, index) => {
    if (index % 4 === 0) {
      acc.push([curr]);
    } else {
      acc[acc.length - 1].push(curr);
    }
    return acc;
  }, [] as any[][]);

  return (
    <div className="bestseller-section">
      <div className="title-container">
        <h2 className="elegant-title">Best Sellers</h2>
      </div>

      <Carousel>
        {groupedProducts.map((group, i) => (
          <Carousel.Item key={i}>
            <div className="carousel-container">
              {group.map((item) => (
                <ProductCard key={item.id} {...item} />
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

    </div>
  );
}

export default BestSeller;
