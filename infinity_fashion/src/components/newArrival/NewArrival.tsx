import React from 'react';
import './newArrival.css';
import { Carousel, Card, Button } from 'react-bootstrap';

const NewArrival = () => {
  return (
    <div>

    <h2 className="elegant-title">New Arrivals</h2>
    
      <Carousel>
    
        <Carousel.Item>
          <div className="carousel-container">
            <Card className="custom-card">
              <Card.Img variant="top" src="https://via.placeholder.com/200" />
              <Card.Body>
                <Card.Title>Card 1</Card.Title>
                <Card.Text>Lorem ipsum dolor 1.</Card.Text>
              </Card.Body>
            </Card>

            <Card className="custom-card">
              <Card.Img variant="top" src="https://via.placeholder.com/200" />
              <Card.Body>
                <Card.Title>Card 2</Card.Title>
                <Card.Text>Lorem ipsum dolor 2.</Card.Text>
              </Card.Body>
            </Card>

            <Card className="custom-card">
              <Card.Img variant="top" src="https://via.placeholder.com/200" />
              <Card.Body>
                <Card.Title>Card 2</Card.Title>
                <Card.Text>Lorem ipsum dolor 2.</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Carousel.Item>


        <Carousel.Item>
          <div className="carousel-container">
            <Card className="custom-card">
              <Card.Img variant="top" src="https://via.placeholder.com/200" />
              <Card.Body>
                <Card.Title>Card 3</Card.Title>
                <Card.Text>Lorem ipsum dolor Card 3.</Card.Text>
              </Card.Body>
            </Card>

            <Card className="custom-card">
              <Card.Img variant="top" src="https://via.placeholder.com/200" />
              <Card.Body>
                <Card.Title>Card 4</Card.Title>
                <Card.Text>Lorem ipsum dolor Card 4.</Card.Text>
              </Card.Body>
            </Card>

            <Card className="custom-card">
              <Card.Img variant="top" src="https://via.placeholder.com/200" />
              <Card.Body>
                <Card.Title>Card 2</Card.Title>
                <Card.Text>Lorem ipsum dolor Card 2.</Card.Text>
              </Card.Body>
            </Card>
          </div>
        </Carousel.Item>
      </Carousel>

      <div className="centered-button">
        <Button variant="primary">Learn More</Button>
      </div>
    </div>
  );
}

export default NewArrival;
