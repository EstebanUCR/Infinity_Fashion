import React, { useEffect, useState } from 'react';
import './historyScreen.css';
import { getPurchaseHistory } from '../../services/apiService';
import { historyData } from '../../types/types';
import { Navigate } from 'react-router-dom';

const HistoryScreen: React.FC = () => {
    const [purchaseHistory, setPurchaseHistory] = useState([]);

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
            {purchaseHistory.map((history = historyData, index) => (
                <div key={index} className="history-row">
                    <div className="column">{history.id}</div>
                    <div className="column">{history.shopping_cart_id}</div>
                    <div className="column">{history.shopping_id}</div>
                    <div className="column">{history.purchase_date}</div>
                    <div className="column">{history.total}</div>
                </div>
            ))}
        </div>
    );
};

export default HistoryScreen;