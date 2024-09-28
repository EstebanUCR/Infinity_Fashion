import './bestSeller.css'; // Mantén este archivo CSS
import bestsellers_products from '../../assets/bestSellerProducts';
import { Carousel } from 'react-bootstrap';
import ProductCard from '../productCard/Product';
import { Product } from '../../types/types';

type BestSellerProps = {
  addToCart: (item: Product) => void
}

export default function BestSeller({addToCart} : BestSellerProps) {
  // Agrupar productos de 3 en 3
  const groupedProducts = bestsellers_products.reduce((acc, curr, index) => {
    if (index % 4 === 0) {
      acc.push([curr]);
    } else {
      acc[acc.length - 1].push(curr);
    }
    return acc;
  }, [] as Product[][]);

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
                <ProductCard key={item.id} product={item} addToCart={addToCart} />
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

    </div>
  );
}