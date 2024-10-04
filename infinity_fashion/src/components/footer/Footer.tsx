import "./footer.css"
import Container from 'react-bootstrap/Container';
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import facebookIcon from "../../assets/icons/facebook-brands-solid.svg"
import instagramIcon from "../../assets/icons/instagram-brands-solid.svg"
import xIcon from "../../assets/icons/x-twitter-brands-solid.svg"

const Footer = () => {
  return (
    <div>
      <Container className="footer" fluid>
        <Row className="mt-auto bg-body-tertiary">
          <Col>
            <h3>Help & Support</h3>
            <p>Private Policy</p>
            <p>Shipping Policy</p>
            <p>FAQ</p>
          </Col>
          <Col>
            <h3>About Us</h3>
            <p>History</p>
            <p>Contact</p>
            <p>Careers</p>
          </Col>
          <Col className="followContainer">
            <h3>Follow Us!</h3>
            <div className="iconsContainer">
              <img className="icon" src={facebookIcon} /> 
              <img className="icon" src={instagramIcon} /> 
              <img className="icon" src={xIcon} /> 
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Footer