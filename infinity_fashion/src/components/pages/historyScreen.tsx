import React, { useEffect } from 'react';
import './historyScreen.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { CartItem, Product, ProductID } from '../../types/types';

type HistoryProps = {
    cart: CartItem[]
    removeFromCart: (id: ProductID) => void
    increaseQuantity: (id: ProductID) => void
    decreaseQuantity: (id: ProductID) => void
    clearCart: () => void
    isEmpty: boolean
    cartTotal: number
    data: Product[]
    addToCart: (item: Product) => void
  }

export default function HistoryScreen ({ data, addToCart, cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, cartTotal } : HistoryProps ){
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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