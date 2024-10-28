import { Product, CartItem, ProductID } from "../../types/types";
import { useRef } from "react";
import "./home.css"
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../../assets/Home/Picture1.png';
import img2 from '../../assets/Home/Picture2.jpg';
import img3 from '../../assets/Home/Picture3.jpg';
import { Container } from 'react-bootstrap';
import Header from '../header/Header';
import BestSeller from '../bestSeller/BestSeller';
import NewArrival from '../newArrival/NewArrival';
import Footer from '../footer/Footer';
import Button from 'react-bootstrap/Button';

type HomeProps = {
  cart: CartItem[]
  removeFromCart: (id: ProductID) => void
  increaseQuantity: (id: ProductID) => void
  decreaseQuantity: (id: ProductID) => void
  clearCart: () => void
  isEmpty: boolean
  cartTotal: number
  addToCart: (item: Product) => void
}

export default function Home ({cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, cartTotal, addToCart} : HomeProps) {

  const shopNow = useRef<HTMLInputElement | null>(null);
  
  const handleShopNowButton = () => {
    shopNow.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }

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
      <Container fluid>
        <Carousel className="magaain">
          <Carousel.Item className="carousel-item">
            <img
              className="d-block w-100"
              src={img1}
              alt="First slide"
            />
            <Carousel.Caption className="carousel-caption-left">
              <h3>ON SALE ONLY FOR THIS MONTH</h3>
              <p className="home-p">Take advantage of these limited-time promotions</p>
              <Button variant="outline-light" className="terracotta-btn" onClick={handleShopNowButton}>Shop Now</Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={img2}
              alt="Second slide"
            />
            <Carousel.Caption className="carousel-caption-left">
              <h3>ON SALE ONLY FOR THIS MONTH</h3>
              <p>Take advantage of these limited-time promotions</p>
              <Button variant="outline-light" className="terracotta-btn" onClick={handleShopNowButton}>Shop Now</Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={img3}
              alt="Third slide"
            />
            <Carousel.Caption className="carousel-caption-left">
              <h3>ON SALE ONLY FOR THIS MONTH</h3>
              <p>Take advantage of these limited-time promotions</p>
              <Button variant="outline-light" className="terracotta-btn" onClick={handleShopNowButton}>Shop Now</Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div ref={shopNow}>
          <BestSeller 
            addToCart={addToCart}
          />
          <NewArrival 
            addToCart={addToCart}
          />
        </div>
      </Container >
      <Footer />
    </div>
  )
}