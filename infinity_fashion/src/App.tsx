import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Home from './components/home/Home'
import SignIn from './components/pages/SignIn';
import ShoppingBag from './components/pages/ShoppingBag';
import ShopCategory from './components/pages/ShopCategory';
import './index.css'
import useCart from './hooks/useCart';
import Product from './components/pages/Product';

function App() {
  const {data, cart, addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart, isEmpty, cartTotal} = useCart()

  return (

    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home cart={cart} removeFromCart={removeFromCart} decreaseQuantity={decreaseQuantity} increaseQuantity={increaseQuantity} clearCart={clearCart} isEmpty={isEmpty} cartTotal={cartTotal} addToCart={addToCart}/>} />
          <Route path='/tops' element={<ShopCategory cart={cart} removeFromCart={removeFromCart} decreaseQuantity={decreaseQuantity} increaseQuantity={increaseQuantity} clearCart={clearCart} isEmpty={isEmpty} cartTotal={cartTotal} data={data} addToCart={addToCart} filterName="Tops" category="tops" />} />
          <Route path='/bottoms' element={<ShopCategory cart={cart} removeFromCart={removeFromCart} decreaseQuantity={decreaseQuantity} increaseQuantity={increaseQuantity} clearCart={clearCart} isEmpty={isEmpty} cartTotal={cartTotal} data={data} addToCart={addToCart} filterName="Bottoms" category="bottoms"/>} />
          <Route path='/outerwear' element={<ShopCategory cart={cart} removeFromCart={removeFromCart} decreaseQuantity={decreaseQuantity} increaseQuantity={increaseQuantity} clearCart={clearCart} isEmpty={isEmpty} cartTotal={cartTotal} data={data} addToCart={addToCart} filterName="Outerwear" category="outerwear"/>} />
          <Route path='/accessories' element={<ShopCategory cart={cart} removeFromCart={removeFromCart} decreaseQuantity={decreaseQuantity} increaseQuantity={increaseQuantity} clearCart={clearCart} isEmpty={isEmpty} cartTotal={cartTotal} data={data} addToCart={addToCart} filterName="Accessories" category="accessories"/>} />
          <Route path='/shoes' element={<ShopCategory cart={cart} removeFromCart={removeFromCart} decreaseQuantity={decreaseQuantity} increaseQuantity={increaseQuantity} clearCart={clearCart} isEmpty={isEmpty} cartTotal={cartTotal} data={data} addToCart={addToCart} filterName="Shoes" category="shoes"/>} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/shoppingBag" element={<ShoppingBag />} />
          <Route path="/product/:productId" element={<Product />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
