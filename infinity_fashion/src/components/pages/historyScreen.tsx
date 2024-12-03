import React, { useEffect, useState } from 'react';
import './historyScreen.css';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { CartItem, Product, ProductID, userData } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import useValidation from '../../hooks/useValidation';
import { getPurchaseHistory } from '../../services/apiService';
import HistoryScreen from '../historyScreen/HistoryScreen';

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



export default function HistoryScreenComponent({ data, addToCart, cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, cartTotal }: HistoryProps) {
  const navigate = useNavigate();


  const [messageModal, setMessageModal] = useState<{
    isOpen: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    isOpen: false,
    message: '',
    type: 'success',
  });



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
      <HistoryScreen />
      <Footer />
    </div>
  );
}