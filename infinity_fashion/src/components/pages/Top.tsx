import React from 'react';
import './top.css';
import ProductCard from '../productCard/Product'; // Importamos el componente reutilizable
import Header from '../header/Header';
import Footer from '../footer/Footer';

const topProducts = [
  {
    image: 'https://via.placeholder.com/200',
    name: 'Leopard-Trim Flare Leg',
    price: '$17.49',
    isExclusive: true,
  },
  {
    image: 'https://via.placeholder.com/200',
    name: 'Leopard Print Flare Pants',
    price: '$17.49',
    oldPrice: '$24.99',
    discount: '30% OFF',
    isExclusive: true,
  },
  {
    image: 'https://via.placeholder.com/200',
    name: 'Jacquard Baroque Mini Skirt',
    price: '$13.99',
    isExclusive: false,
  },
  {
    image: 'https://via.placeholder.com/200',
    name: 'Fleece Drawstring Sweatshorts',
    price: '$12.59',
    isExclusive: false,
  },
  {
    image: 'https://via.placeholder.com/200',
    name: 'Bow Bodycon Maxi Skirt',
    price: '$17.49',
    isExclusive: true,
  },
  {
    image: 'https://via.placeholder.com/200',
    name: 'Bethel Denim Mini Skirt',
    price: '$17.49',
    oldPrice: '$24.99',
    discount: '30% OFF',
    isExclusive: true,
  },
  {
    image: 'https://via.placeholder.com/200',
    name: 'Striped Twill Pleated Mini Skirt',
    price: '$17.49',
    oldPrice: '$24.99',
    discount: '30% OFF',
    isExclusive: true,
  },
  {
    image: 'https://via.placeholder.com/200',
    name: 'High-Rise Corduroy Flare Pants',
    price: '$24.49',
    isExclusive: true,
  },
  {
    image: 'https://via.placeholder.com/200',
    name: 'Ribbed Knit Crop Top',
    price: '$10.99',
    isExclusive: false,
  },
  {
    image: 'https://via.placeholder.com/200',
    name: 'Printed Wrap Skirt',
    price: '$15.49',
    isExclusive: false,
  },
  {
    image: 'https://via.placeholder.com/200',
    name: 'Plaid Pleated Skirt',
    price: '$18.99',
    isExclusive: false,
  },
  {
    image: 'https://via.placeholder.com/200',
    name: 'Mesh Insert Bodycon Dress',
    price: '$22.49',
    oldPrice: '$29.99',
    discount: '30% OFF',
    isExclusive: true,
  },
];

const Top: React.FC = () => {
  return (
    <>
      <Header />
      <div className="product-grid">
        {topProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Top;
