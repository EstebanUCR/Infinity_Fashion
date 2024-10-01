import { useEffect, useMemo, useState } from "react";

import { all_products } from "../assets/all_products";

import type { Product, CartItem, ProductID } from "../types/types";

const useCart = () => {
  const initialCart = () : CartItem[] => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

  //State
  const [cart, setCart] = useState(initialCart)

  const [data] = useState(all_products)

  //Const
  const MIN_ITEMS = 1
  const MAX_ITEMS = 5

  //Effect to storage cart
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  //Functions
  function addToCart(item : Product) {
    const itemExist = cart.findIndex((product) => product.id === item.id)
    if (itemExist >= 0) {
      if (cart[itemExist].quantity >= MAX_ITEMS) return
      const updatedCart = [...cart]
      updatedCart[itemExist].quantity++
      setCart(updatedCart)
    } else {
      const newItem : CartItem = {...item, quantity: 1}
      setCart([...cart, newItem])
    }
  }

  function removeFromCart(id : ProductID) {
    setCart(prevCart => prevCart.filter(product => product.id !== id))
  }

  function increaseQuantity(id : ProductID) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1,
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function decreaseQuantity(id : ProductID) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function clearCart() {
    setCart([])
  }

  //useMemo
  const isEmpty = useMemo(() => cart.length === 0, [cart])
  const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])

  return {
    data,
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
    clearCart,
    isEmpty,
    cartTotal
  }
}

export default useCart