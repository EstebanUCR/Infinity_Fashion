import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

interface ProductCardProps {
  id: number;
  image: string;
  name: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  isExclusive: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, image, name, price, oldPrice, discount, isExclusive }) => {
  return (
    <div className="product-card">
      <div className="image-container">
        <Link to={`/product/${id}`}><img src={image} alt={name} /></Link>
      </div>
      <div className="product-details">
        <h3>{name}</h3>
        <p>
          <span className={`price ${discount ? 'price-discount' : 'price-regular'}`}>
            {price}
          </span>{' '}
          <span className="old-price">{oldPrice}</span>{' '}
          <span className="discount">{discount}</span>
        </p>
        {isExclusive && <p className="exclusive">WEB EXCLUSIVE</p>}
      </div>
    </div>
  );
};

export default ProductCard;
