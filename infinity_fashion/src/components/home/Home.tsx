import React from 'react'
import "./home.css"
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../../assets/Home/Picture1.png';
import img2 from '../../assets/Home/Picture2.png';
import { Container } from 'react-bootstrap';
import Header from '../header/Header';
import BestSeller from '../bestSeller/BestSeller';
import NewArrival from '../newArrival/NewArrival';
import Footer from '../footer/Footer';
import Button from 'react-bootstrap/Button';

export const Home = () => {
  return (
    <div className="container-fluid">
      <Header />
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
              <p>Take advantage of these limited-time promotions</p>
              <Button variant="outline-light" className="btn-lg terracotta-btn">Shop Now</Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={img1}
              alt="Second slide"
            />
            <Carousel.Caption className="carousel-caption-left">
              <h3>ON SALE ONLY FOR THIS MONTH</h3>
              <p>Take advantage of these limited-time promotions</p>
              <Button variant="outline-light" className="btn-lg terracotta-btn">Shop Now</Button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={img1}
              alt="Third slide"
            />
            <Carousel.Caption className="carousel-caption-left">
              <h3>ON SALE ONLY FOR THIS MONTH</h3>
              <p>Take advantage of these limited-time promotions</p>
              <Button variant="outline-light" className="btn-lg terracotta-btn">Shop Now</Button>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <BestSeller />
        <NewArrival />
        <Footer />
      </Container >
    </div>
  )
}

export default Home