import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Header from './components/header/Header'
import Home from './components/home/Home'
import BestSeller from './components/bestSeller/BestSeller';
import NewArrival from './components/newArrival/NewArrival';
import SignIn from './components/pages/SignIn';
import ShoppingBag from './components/pages/ShoppingBag';
import ShopCategory from './components/pages/ShopCategory';
import Product from './components/pages/Product';
import ProductCard from './components/productCard/Product';

function App() {
  const [count, setCount] = useState(0)

  return (

    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/tops' element={<ShopCategory filterName="Tops" category="tops" />} />
          <Route path='/bottoms' element={<ShopCategory filterName="Bottoms" category="bottoms"/>} />
          <Route path='/outerwear' element={<ShopCategory filterName="Outerwear" category="outerwear"/>} />
          <Route path='/accessories' element={<ShopCategory filterName="Accessories" category="accessories"/>} />
          <Route path='/shoes' element={<ShopCategory filterName="Shoes" category="shoes"/>} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/shoppingBag" element={<ShoppingBag />} />
          <Route path="/product/:productId" element={<Product />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
