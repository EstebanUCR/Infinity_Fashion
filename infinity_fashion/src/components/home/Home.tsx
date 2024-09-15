import React from "react";
import "./home.css"
import Carousel from 'react-bootstrap/Carousel';
import { Container, Image } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import carousel1 from "../../assets/carousel1.jpg"

const Home = () => {
  return (
    <div>

      {/* Advertisement */}

      {/* On Sale */}

      <h1>On Sale!</h1>
      <Carousel>
      <Carousel.Item>
        <Image className="carouselImage" src={carousel1} alt="First slide"></Image>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <Image className="carouselImage" src={carousel1} alt="Second slide"></Image>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <Image className="carouselImage" src={carousel1} alt="Third slide"></Image>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      </Carousel>

      {/* Bestsellers */}
      <h1>Bestsellers</h1>
      <div className="bestSellersCards">
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={carousel1} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            $$$
          </Card.Text>
        </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={carousel1} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            $$$
          </Card.Text>
        </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={carousel1} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            $$$
          </Card.Text>
        </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={carousel1} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            $$$
          </Card.Text>
        </Card.Body>
        </Card>
      </div>
      <Button className="viewMoreButton" variant="primary">View More</Button>
      

      {/* New Arrivals */}
      <h1>New Arrivals</h1>
      <div className="bestSellersCards">
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={carousel1} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            $$$
          </Card.Text>
        </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={carousel1} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            $$$
          </Card.Text>
        </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={carousel1} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            $$$
          </Card.Text>
        </Card.Body>
        </Card>
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={carousel1} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            $$$
          </Card.Text>
        </Card.Body>
        </Card>
      </div>
      <Button className="viewMoreButton" variant="primary">View More</Button>

    </div>
  )
}

export default Home