import { useParams } from 'react-router-dom';
import type { Product, CartItem, ProductID } from '../../types/types';
import ProductDisplay from '../productDisplay/ProductDisplay';
import Header from '../header/Header';
import Footer from '../footer/Footer';

type ProductProps = {
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

const Product = ({ data, addToCart, cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, cartTotal }: ProductProps) => {
  const allProduct = data;
  const { productId } = useParams();
  const product = allProduct.find((product) => product.id === parseInt(productId || '', 10));

  if (!product) {
    return (
      <div>
        <Header 
          cart={cart} 
          removeFromCart={removeFromCart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          clearCart={clearCart}
          isEmpty={isEmpty}
          cartTotal={cartTotal}
        />
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
      <Header 
          cart={cart} 
          removeFromCart={removeFromCart}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          clearCart={clearCart}
          isEmpty={isEmpty}
          cartTotal={cartTotal}
        />
      <ProductDisplay 
        addToCart={addToCart}
        product={product}
      />
      <Footer />
    </div>
  );
}

export default Product;