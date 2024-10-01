import "./footer.css"
import Container from 'react-bootstrap/Container';
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

const Footer = () => {
  return (
    <div>
      <Container className="footer" fluid>
        <Row className="mt-auto bg-body-tertiary">
          <Col>
            <h3>Help & Support</h3>
            <p>Lorem ipsum dolor</p>
            <p>Lorem ipsum dolor</p>
            <p>Lorem ipsum dolor</p>
          </Col>
          <Col>
            <h3>About Us</h3>
            <p>Lorem ipsum dolor</p>
            <p>Lorem ipsum dolor</p>
            <p>Lorem ipsum dolor</p>
          </Col>
          <Col>
            <h3>Follow Us!</h3>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Footer