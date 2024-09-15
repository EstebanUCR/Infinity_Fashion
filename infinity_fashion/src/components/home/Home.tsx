import React from 'react'
import "./home.css"
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../../assets/Home/Picture1.png';
import { Container } from 'react-bootstrap';
import Header from '../header/Header';
import BestSeller from '../bestSeller/BestSeller';
import NewArrival from '../newArrival/NewArrival';
import Footer from '../footer/Footer';

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
              <button className="btn btn-primary">Shop Now</button>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={img1}
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={img1}
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <BestSeller />
        <NewArrival />
        <Footer/>
      </Container >
    </div>
  )
}

export default Home