import React, { useEffect, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import './paymentModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from '../../types/types';
import { useNavigate } from 'react-router-dom';

interface PaymentModalProps {
    show: boolean;
    onClose: () => void;
    cart: CartItem[];
    clearCart: () => void;
    shipping: number;
    shippingValue: (value: number) => void;
    card: {
        cardName: string;
        cardNumber: string;
        expiration: string;
        cvv: string;
    };
}

const PaymentModal: React.FC<PaymentModalProps> = ({ show, onClose, cart, clearCart, shipping, shippingValue, card }) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [paymentComplete, setPaymentComplete] = useState(false);
    const [result, setResult] = useState('Payment successfully processed!')

    const validBinsCR = [
        "410864", // VISA
        "410865", // VISA
        "411061", // VISA
        "415276", // VISA
        "530323", // MASTERCARD
        "530325", // MASTERCARD
        "530387", // MASTERCARD
        "530397", // MASTERCARD
      ];

    const saveOrder = async () => {
      const email = localStorage.getItem('email')
      const response = await fetch('http://localhost:3000/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, cart, shipping }),
      });

      if (response.ok) {
        clearCart();
        shippingValue(0);
        navigate('/');
        location.reload();
      }
    }

    useEffect(() => {
        let processTimer: NodeJS.Timeout;
        let closeTimer: NodeJS.Timeout;

        if (show) {
            setLoading(true);
            setPaymentComplete(false);

                
                //Validar numero de tarjeta
                const binCard = card.cardNumber.substring(0, 6);
                if(!validBinsCR.includes(binCard)){
                    console.log('Validando numero')
                    setResult("Wrong card number!")
                } else {
                    //Validar fecha de expiracion
                    const expirationDate = card.expiration.split('/')
                    if(expirationDate.length < 2) {
                        setResult("Invalid expiration date year!")
                    } else {
                        console.log('Validando expiracion')
                        const today = new Date();
                        const year = today.getFullYear();
                        const month = String(today.getMonth() + 1).padStart(2, '0'); // +1 porque los meses van de 0 a 11
                        if(parseInt(expirationDate[1]) == year % 100) {
                            if(parseInt(expirationDate[0]) <= parseInt(month)) {
                                setResult('Invalid expiration date month!')
                            } else {
                                if(!(/^[0-9]+$/.test(card.cvv))) {
                                    setResult('Invalid CVV!')
                                }
                            }
                        } else {
                            if(parseInt(expirationDate[1]) > year % 100) {
                                if(!(/^[0-9]+$/.test(card.cvv))) {
                                        console.log('Validando cvv')
                                        setResult('Invalid CVV!')
                                }
                            }
                        }
                    }
                    
                }

            // Temporizador de 10 segundos para simular el procesamiento del pago
            processTimer = setTimeout(() => {
                setLoading(false);
                setPaymentComplete(true);

                console.log(result)

                // Temporizador adicional de 2.5 segundos para mostrar el mensaje de éxito
                closeTimer = setTimeout(() => {
                    setPaymentComplete(false);
                    onClose();                    
                    saveOrder();
                }, 25000000);
            }, 7000); // 7 segundos de procesamiento
        }

        // Limpiar los temporizadores al desmontar o cerrar el modal
        return () => {
            clearTimeout(processTimer);
            clearTimeout(closeTimer);
        };
    }, [show, onClose]);

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header>
                <Modal.Title className='title'>Processing Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center">
                        <Spinner animation="border" role="status" style={{color: "#BF665E"}}/>
                        <span className="ms-2">Processing your payment, please wait...</span>
                    </div>
                ) : paymentComplete ? ( <>
                    <FontAwesomeIcon icon={faCircleCheck} />
                    <span className='ms-2'>{result}</span>
                    </>
                ) : null}
            </Modal.Body>
        </Modal>
    );
};

export default PaymentModal;
