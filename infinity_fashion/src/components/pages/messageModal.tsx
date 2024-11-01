import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import './messageModal.css';
import { Link } from 'react-router-dom';

const AutoCloseModal: React.FC<{ message: string; show: boolean; onClose: () => void }> = ({ message, show, onClose }) => {

    useEffect(() => {
        // Cerrar el modal después de 5 segundos
        const timer = setTimeout(() => { 
            onClose(); // Llama a la función onClose cuando se cierra el modal
        }, 3000);

        // Limpiar el timer si el componente se desmonta
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <Modal show={show} onHide={() => onClose} centered>
            <Modal.Header>
                <Modal.Title className='title'>Alert!</Modal.Title>
            </Modal.Header>
            <Modal.Body>{message}</Modal.Body>
            <Modal.Footer>
              <Link className="btn btn-login" to='/signIn'>Sign In</Link>
            </Modal.Footer>
        </Modal>
    );
};

export default AutoCloseModal;
