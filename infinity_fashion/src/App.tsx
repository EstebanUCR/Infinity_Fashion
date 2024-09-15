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
        </Routes>
      </Router>
    </div>
  )
}

export default App
