import React, { useEffect, useState } from 'react';
import './historyScreen.css';
import { getPurchaseHistory } from '../../services/apiService';
import { historyData } from '../../types/types';
import { Navigate } from 'react-router-dom';

const HistoryScreen: React.FC = () => {
    const [purchaseHistory, setPurchaseHistory] = useState<historyData[]>([]);

    const [historyData, setHistory] = useState<historyData>({
        id: 'None',
        shopping_cart_id: 'None',
        shopping_id: 'None',
        purchase_date: 'None',
        total: 0,
    });

    useEffect(() => {
        const fetchHistoryData = async () => {
            const data = await getPurchaseHistory();
            if (data) {
                setHistory(data);
            } else {
                console.log('No data');
            }
        };
        fetchHistoryData();
    }, []);


    useEffect(() => {
        // Datos de prueba
        const testData = [
            {
                id: '1',
                shopping_cart_id: 'cart123',
                shopping_id: 'shop123',
                purchase_date: '2023-10-01',
                total: 100.0,
            },
            {
                id: '2',
                shopping_cart_id: 'cart124',
                shopping_id: 'shop124',
                purchase_date: '2023-10-02',
                total: 150.0,
            },
            {
                id: '3',
                shopping_cart_id: 'cart125',
                shopping_id: 'shop125',
                purchase_date: '2023-10-03',
                total: 200.0,
            },
            {
                id: '3',
                shopping_cart_id: 'cart125',
                shopping_id: 'shop125',
                purchase_date: '2023-10-03',
                total: 200.0,
            },
            {
                id: '3',
                shopping_cart_id: 'cart125',
                shopping_id: 'shop125',
                purchase_date: '2023-10-03',
                total: 200.0,
            },
            {
                id: '3',
                shopping_cart_id: 'cart125',
                shopping_id: 'shop125',
                purchase_date: '2023-10-03',
                total: 200.0,
            },
            {
                id: '3',
                shopping_cart_id: 'cart125',
                shopping_id: 'shop125',
                purchase_date: '2023-10-03',
                total: 200.0,
            },
            {
                id: '3',
                shopping_cart_id: 'cart125',
                shopping_id: 'shop125',
                purchase_date: '2023-10-03',
                total: 200.0,
            },
            {
                id: '3',
                shopping_cart_id: 'cart125',
                shopping_id: 'shop125',
                purchase_date: '2023-10-03',
                total: 200.0,
            },
            {
                id: '3',
                shopping_cart_id: 'cart125',
                shopping_id: 'shop125',
                purchase_date: '2023-10-03',
                total: 200.0,
            },
            {
                id: '3',
                shopping_cart_id: 'cart125',
                shopping_id: 'shop125',
                purchase_date: '2023-10-03',
                total: 200.0,
            },
            {
                id: '3',
                shopping_cart_id: 'cart125',
                shopping_id: 'shop125',
                purchase_date: '2023-10-03',
                total: 200.0,
            },
            {
                id: '3',
                shopping_cart_id: 'cart125',
                shopping_id: 'shop125',
                purchase_date: '2023-10-03',
                total: 200.0,
            },
            {
                id: '3',
                shopping_cart_id: 'cart125',
                shopping_id: 'shop125',
                purchase_date: '2023-10-03',
                total: 200.0,
            },
            {
                id: '3',
                shopping_cart_id: 'cart125',
                shopping_id: 'shop125',
                purchase_date: '2023-10-03',
                total: 200.0,
            },
            {
                id: '3',
                shopping_cart_id: 'cart125',
                shopping_id: 'shop125',
                purchase_date: '2023-10-03',
                total: 200.0,
            },
            {
                id: '3',
                shopping_cart_id: 'cart125',
                shopping_id: 'shop125',
                purchase_date: '2023-10-03',
                total: 200.0,
            },
            {
                id: '3',
                shopping_cart_id: 'cart125',
                shopping_id: 'shop125',
                purchase_date: '2023-10-03',
                total: 200.0,
            },
        ];

        setPurchaseHistory(testData);
    }, []);

    React.useEffect(() => {
        getPurchaseHistory().then(data => {
            console.log(data);
        });
    }, []);

    return (
        <div className="history-container">
            <div className="history-header">
                <div className="column-header">Id</div>
                <div className="column-header">Shopping Cart</div>
                <div className="column-header">Shopping Id</div>
                <div className="column-header">Purchase Date</div>
                <div className="column-header">Total</div>
            </div>
            <div className="history-content">
                {purchaseHistory.slice(0, 15).map((history, index) => (
                    <div key={index} className="history-row">
                        <div className="column">{history.id}</div>
                        <div className="column">{history.shopping_cart_id}</div>
                        <div className="column">{history.shopping_id}</div>
                        <div className="column">{history.purchase_date}</div>
                        <div className="column">{history.total}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HistoryScreen;