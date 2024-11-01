import { CartItem, ProductID } from "../../types/types";
import Header from '../header/Header';
import Footer from '../footer/Footer';
import './shoppingBag.css';
import { faCreditCard, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
    MDBCol,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBValidation,
    MDBValidationItem,
  } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import PaymentModal from "./paymentModal";

type ShoppingProps = {
  cart: CartItem[]
  removeFromCart: (id: ProductID) => void
  increaseQuantity: (id: ProductID) => void
  decreaseQuantity: (id: ProductID) => void
  clearCart: () => void
  isEmpty: boolean
  cartTotal: number
  shipping: number
  shippingValue: (value: number) => void
}

export default function  ShoppingBag ({cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, isEmpty, cartTotal, shipping, shippingValue} : ShoppingProps) {

    const [showModal, setShowModal] = useState(false)
    const [isFormValid, setIsFormValid] = useState(false)
    const [formValues, setFormValues] = useState({
        cardName: '',
        cardNumber: '',
        expiration: '',
        cvv: ''
    })

    useEffect(() => {
        const isCardNameValid = formValues.cardName.length >= 3
        const isCardNumberValid = formValues.cardNumber.length === 16;
        const isExpirationValid = formValues.expiration.length === 5;
        const isCvvValid = formValues.cvv.length === 3;

        // Todos los campos deben estar llenos y ser válidos
        const allFieldsValid = isCardNameValid &&
            isCardNumberValid &&
            isExpirationValid &&
            isCvvValid;

        setIsFormValid(allFieldsValid);
    }, [formValues]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormValues({...formValues, [name]: value})   
    }
    
    const shippingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.value;
        if (selectedOption === "Standard-Delivery - $5.00") {
            shippingValue(5.00)
        } else if (selectedOption === "Pickup - $0.00") {
            shippingValue(0.00)
        } else {
            shippingValue(8.00)
        }
    }

    const handlePayment = () => {
        if(isFormValid) {
            setShowModal(true)
        }
    }
  
    return (
    <>
      <Header
        cart={cart} 
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />

      <div>
      <div className="card">
            <div className="row">
                <div className="col-md-8 cart">
                    <div className="title">
                        <div className="row">
                            <div className="col"><h4><b>Shopping Cart</b></h4></div>
                            <div className="col align-self-center text-right text-muted">
                              {cart.length > 1 ? `${cart.length} items` : `${cart.length} item`}
                            </div>
                        </div>
                    </div>    
                    {isEmpty ? (
                        <h3 className='text-center emptyCart'>No items!</h3>
                    ) : (
                        cart.map((product, index) => (
                            <div className={`row border-top ${index === cart.length - 1 ? 'border-bottom' : ''}`} key={product.id}>
                               <div className="row main align-items-center">
                                    <div className="col-2"><img className="img-fluid img-cart" src={product.image[0]} /></div>
                                    <div className="col">
                                        <div className="row">{product.name}</div>
                                        <div className="row text-muted unit-price">Unit price ${product.price}</div>
                                    </div>
                                    <div className="col">
                                        <button
                                            type='button'
                                            className='btn btnCart'
                                            onClick={() => decreaseQuantity(product.id)}
                                        >-</button>
                                        <span className="textQuantity">{product.quantity}</span>
                                        <button
                                            type='button'
                                            className='btn btnCart'
                                            onClick={() => increaseQuantity(product.id)}
                                        >+</button>
                                    </div>
                                    <div className="col">
                                        ${(product.price * product.quantity).toFixed(2)} 
                                        <button
                                            className='btn-remove'
                                            type='button'
                                            onClick={() => removeFromCart(product.id)}
                                        >X</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}                                
                    <div className="back-to-shop">
                        <Link className="text-muted" to='/'><FontAwesomeIcon icon={faArrowLeft}/> Back to shop</Link> 
                    </div>
                </div>
                <div className="col-md-4 summary">
                    <div><h5><b>Summary</b></h5></div>
                    <div className="row">
                        <div className="col">Subtotal</div>
                        <div className="col text-right">${cartTotal.toFixed(2)}</div>
                    </div>
                    <div className="row">
                        <div className="col text-left">Shipping</div>
                        <div className="col text-right">$ {(shipping).toFixed(2)}</div>
                    </div>
                    <div className="row">
                        <br></br>
                        <div className="col text-left totals">TOTAL PRICE</div>
                        <div className="col text-right totals">$ {(cartTotal + shipping).toFixed(2)}</div>
                    </div>
                    <MDBValidation isValidated>
                        <p><b>SHIPPING</b></p>
                        <select onChange={shippingChange}>                            
                            <option className="text-muted">Pickup - $0.00</option>   
                            <option className="text-muted">Standard-Delivery - $5.00</option>
                            <option className="text-muted">Priority-Delivery - $8.00</option>                         
                        </select>                        
                        <p><b>CARD DETAILS</b></p>
                        <p className="small">Card type</p>
                        <MDBIcon fab icon="cc-mastercard fa-2x me-2" />
                        <MDBIcon fab icon="cc-visa fa-2x me-2" />
                        <MDBIcon fab icon="cc-amex fa-2x me-2" />
                        {/* <MDBIcon fab icon="cc-paypal fa-2x me-2" /> */}
                        
                        <MDBValidationItem>
                            <MDBInput className="mb-2" name="cardName" label="Cardholder's Name" type="text" size="g"
                                minLength={3} placeholder="Cardholder's Name" contrast required onChange={handleInputChange}/>
                        </MDBValidationItem>
                        <MDBValidationItem>
                            <MDBInput className="mb-2" name="cardNumber" label="Card Number" type="text" size="g"
                                minLength={16} maxLength={16} placeholder="1234 5678 9012 3457" contrast required onChange={handleInputChange}/>
                        </MDBValidationItem>           
                        <MDBRow>
                            <MDBCol md="6">
                                <MDBValidationItem>
                                    <MDBInput className="mb-2" name="expiration" label="Expiration" type="text" size="g"
                                        minLength={5} maxLength={5} placeholder="MM/YY" contrast required onChange={handleInputChange}/>
                                </MDBValidationItem>                                
                            </MDBCol>
                            <MDBCol md="6">
                                <MDBValidationItem>
                                    <MDBInput className="mb-2" name="cvv" label="Cvv" type="text" size="g" minLength={3}
                                        maxLength={3} placeholder="&#9679;&#9679;&#9679;" contrast required onChange={handleInputChange}/>
                                </MDBValidationItem>                                
                            </MDBCol>
                        </MDBRow>
                    </MDBValidation>
                    <button className="btn btn-pay w-100 mt-3 p-2" type="submit" disabled={!isFormValid} onClick={handlePayment}><FontAwesomeIcon icon={faCreditCard}/> PAY</button>
                </div>
            </div>            
        </div>
      </div>

      <PaymentModal 
        show={showModal} 
        onClose={() => setShowModal(false)} 
        cart={cart}
        clearCart={clearCart}
        shipping={shipping}
        shippingValue={shippingValue}
      />

      <Footer />
    </>
  )
}