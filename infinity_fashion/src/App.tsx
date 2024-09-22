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
import Top from './components/pages/Top';
import Bottom from './components/pages/Bottom';
import Outwear from './components/pages/Outwear';
import SignIn from './components/pages/SignIn';
import ShoppingBag from './components/pages/ShoppingBag';
import Product from './components/productCard/Product';

function App() {
  const [count, setCount] = useState(0)

  return (

    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/top" element={<Top />} />
          <Route path="/bottom" element={<Bottom />} />
          <Route path="/outwear" element={<Outwear />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/shoppingBag" element={<ShoppingBag />} />
          <Route path="/product" element={<Product image={''} name={''} price={''} isExclusive={false} />} />
          <Route path=":productId" element={<Product image={''} name={''} price={''} isExclusive={false} />} /> 
        </Routes>
      </Router>
    </div>
  )
}

export default App
