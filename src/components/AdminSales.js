import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminSales.css';

function AdminSales() {
    const [sales, setSales] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await axios.get('http://localhost:5555/sales');
                setSales(response.data);
            } catch (error) {
                setError('Error fetching sales data.');
            }
        };

        fetchSales();
    }, []);

    return (
        <div className="admin-sales-container">
            <h2>Sales Data</h2>
            {error && <p className="error-message">{error}</p>}
            <table className="sales-table">
                <thead>
                    <tr>
                        <th>Item ID</th>
                        <th>Item Name</th>
                        <th>Quantity Sold</th>
                        <th>Total Revenue</th>
                        <th>Date Sold</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale) => (
                        <tr key={sale.id}>
                            <td>{sale.item_id}</td>
                            <td>{sale.item_name}</td>
                            <td>{sale.quantity_sold}</td>
                            <td>{sale.total_revenue}</td>
                            <td>{new Date(sale.date_sold).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminSales;
