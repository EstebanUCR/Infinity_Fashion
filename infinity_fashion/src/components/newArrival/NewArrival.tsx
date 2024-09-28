import './newArrival.css';
import { Carousel } from 'react-bootstrap';
import newArrivals_products from '../../assets/newArrivalProducts';
import ProductCard from '../productCard/Product';
import { Product } from '../../types/types';

type NewArrivalProps = {
  addToCart: (item: Product) => void
}

export default function NewArrival ({addToCart} : NewArrivalProps)  {
     // Agrupar productos de 3 en 3
  const groupedProducts = newArrivals_products.reduce((acc, curr, index) => {
    if (index % 4 === 0) {
      acc.push([curr]);
    } else {
      acc[acc.length - 1].push(curr);
    }
    return acc;
  }, [] as Product[][]);

  return (
    <div className="newArrival">
      <div className="title-container">
        <h2 className="elegant-title">New Arrivals</h2>
      </div>

      <Carousel>
        {groupedProducts.map((group, i) => (
          <Carousel.Item key={i}>
            <div className="carousel-container">
              {group.map((item) => (
                <ProductCard key={item.id} product={item} addToCart={addToCart}/>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

    </div>
  );
}