import React from 'react';
import './Product.css';

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  oldPrice?: string;
  discount?: string;
  isExclusive: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, name, price, oldPrice, discount, isExclusive }) => {
  return (
    <div className="product-card">
      <div className="image-container">
        <img src={image} alt={name} />
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
      </div>
    </div>
  );
};

export default ProductCard;
