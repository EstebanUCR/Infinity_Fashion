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
    shippingValue: (value: number) => void
}

const PaymentModal: React.FC<PaymentModalProps> = ({ show, onClose, cart, clearCart, shipping, shippingValue }) => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [paymentComplete, setPaymentComplete] = useState(false);

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

            // Temporizador de 10 segundos para simular el procesamiento del pago
            processTimer = setTimeout(() => {
                setLoading(false);
                setPaymentComplete(true);

                // Temporizador adicional de 2.5 segundos para mostrar el mensaje de éxito
                closeTimer = setTimeout(() => {
                    setPaymentComplete(false);
                    onClose();                    
                    saveOrder();
                }, 2500);
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
                    <span className='ms-2'>Payment successfully processed!</span>
                    </>
                ) : null}
            </Modal.Body>
        </Modal>
    );
};

export default PaymentModal;
