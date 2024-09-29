import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import all_products from '../../assets/all_products';
import ProductDisplay from '../productDisplay/ProductDisplay';
import Header from '../header/Header';
import Footer from '../footer/Footer';

const Product = () => {
  const allProduct = all_products;
  const { productId } = useParams();
  const product = allProduct.find((product) => product.id === parseInt(productId || '', 10));

  if (!product) {
    return (
      <div>
        <Header />
        <h1>Product not found</h1>
        <Footer />
      </div>
    );
  }

/*
TODO: agregar esto a all products
description={product?.description} 
stock={product?.stock} 
*/
  return (
    <div>
      <Header />
      <ProductDisplay 
        id={product.id} 
        image={product.image} 
        name={product.name} 
        price={product.price}
        oldPrice={product.oldPrice}
        discount={product.discount}
        isExclusive={product.isExclusive} 
        category={product.category} 
      />
      <Footer />
    </div>
  );
}

export default Product;