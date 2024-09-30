import type { Product } from '../../types/types';
import './Product.css';
import { Link } from 'react-router-dom';

type ProductProps = {
  product: Product,
  addToCart: (item: Product) => void
}

export default function ProductCard ({product, addToCart} : ProductProps)  {
  return (
    <div className="product-card">
      <div className="image-container">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-details">
        <h3>{product.name}</h3>
        <p>
          <span className={`price ${product.discount} ? 'price-discount' : 'price-regular'}`}>
            ${product.price}
          </span>{' '}
          <span className="old-price">{product.oldPrice}</span>{' '}
          <span className="discount">{product.discount}</span>
        </p>
      </div>
      <div className='d-flex justify-content-end'>
        <Link className='w-100 mt-3 p-2' to={`/product/${product.id}`}>
          <button
            className='w-100 mt-3 p-2'
            onClick={() => addToCart(product)}
          >Agregar</button>
        </Link>
      </div>
      
    </div>
  );
};

