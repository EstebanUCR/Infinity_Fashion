import { CartItem, ProductID } from "../../types/types";
import Header from '../header/Header';
import Footer from '../footer/Footer';
import './shoppingBag.css';
import { faCreditCard, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

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
                                    <div className="col-2"><img className="img-fluid img-cart" src={product.image} /></div>
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
                        <div className="col totals">Subtotal</div>
                        <div className="col text-right totals">${cartTotal.toFixed(2)}</div>
                    </div>
                    <form>
                        <p>SHIPPING</p>
                        <select onChange={shippingChange}>                            
                            <option className="text-muted">Pickup - $0.00</option>   
                            <option className="text-muted">Standard-Delivery - $5.00</option>
                            <option className="text-muted">Priority-Delivery - $8.00</option>                         
                        </select>
                        <p>GIVE CODE</p>
                        <input id="code" placeholder="Enter your code" />
                    </form>
                    <div className="row">
                        <div className="col text-left totals">TOTAL PRICE</div>
                        <div className="col text-right totals">$ {(cartTotal + shipping).toFixed(2)}</div>
                    </div>
                    <button className="btn btn-pay w-100 mt-3 p-2"><FontAwesomeIcon icon={faCreditCard}/> PAY</button>
                </div>
            </div>
            
        </div>
      </div>

      <Footer />
    </>
  )
}