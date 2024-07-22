import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { CartContext } from './CartContext';
import { useNavigate } from 'react-router-dom';
import './CheckoutForm.css';

const CheckoutForm = () => {
    const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        paymentMethod: 'Credit Card',
    });
    const [submissionError, setSubmissionError] = useState(null);
    const [showPaymentMethods, setShowPaymentMethods] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleQuantityChange = (itemId, quantity) => {
        updateQuantity(itemId, parseInt(quantity, 10));
    };

    const handleRemoveFromCart = (itemId) => {
        removeFromCart(itemId);
    };

    const handlePlaceOrder = () => {
        const { name, email, address } = formData;
        if (!name || !email || !address) {
            setSubmissionError('Please fill out all the fields');
            return;
        }
        setShowPaymentMethods(true);
    };

    const handlePaymentMethod = async (paymentMethod) => {
        const totalPrice = calculateTotalPrice();
        if (isNaN(totalPrice) || totalPrice <= 0) {
            setSubmissionError('Invalid total price');
            return;
        }

        const orderData = {
            name: formData.name,
            email: formData.email,
            address: formData.address,
            total_price: String(totalPrice),  
            payment_method: paymentMethod,
            items: cartItems.map((item) => ({
                name: item.name,
                price: item.price.toString().replace(',', ''),  
                quantity: item.quantity || 1,
                description: item.description,
            })),
        };

        try {
            const response = await axios.post('http://localhost:5555/create_order', orderData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                setOrderDetails(response.data.order);
                setSuccessMessage('Order placed successfully!');
                setShowPaymentMethods(false);
            }
        } catch (error) {
            console.error('Error during payment:', error);
            setSubmissionError('There was an error processing your payment. Please try again.');
        }
    };



    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            const itemPrice = parseFloat(item.price.toString().replace(',', '')) || 0;
            const itemQuantity = parseInt(item.quantity) || 1;
            return total + itemPrice * itemQuantity;
        }, 0);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handlePlaceOrder();
    };

    return (
        <div className="checkout-page">
            <div className="checkout-header">
                <h1>Your Cart</h1>
            </div>
            {orderDetails && (
                <div className="order-details">
                    <h2>Order Details</h2>
                    <p><strong>Order ID:</strong> {orderDetails.id}</p>
                    <p><strong>Items:</strong></p>
                    <ul>
                        {orderDetails.items.map((item, index) => (
                            <li key={index}>
                                {item.name} - ${item.price} x {item.quantity}
                            </li>
                        ))}
                    </ul>
                    <p><strong>Total Price:</strong> ${orderDetails.total_price}</p>
                    <p><strong>Payment Method:</strong> {orderDetails.payment_method}</p>
                </div>
            )}
            {successMessage && <p className="success-message">{successMessage}</p>}
            {submissionError && <p className="error-message">{submissionError}</p>}
            <div className="checkout-content">
                <div className="form-section">
                    <h2>Checkout Form</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Address:</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Total Price:</label>
                            <input
                                type="number"
                                name="totalPrice"
                                value={calculateTotalPrice()}
                                readOnly
                            />
                        </div>
                        <div>
                            <label>Payment Method:</label>
                            <select
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="Credit Card">Credit Card</option>
                                <option value="PayPal">PayPal</option>
                            </select>
                        </div>
                        <button type="submit" className="checkout-button">Submit</button>
                    </form>
                    <div className="cart-items">
                        {cartItems.length > 0 ? (
                            cartItems.map((item, index) => (
                                <div key={index} className="cart-item">
                                    <img
                                        src={`../assets/images/${item.image}`}
                                        alt={item.name}
                                        className="cart-item-image"
                                    />
                                    <div className="cart-item-info">
                                        <h3>{item.name}</h3>
                                        <p>{item.description}</p>
                                        <p>Price: ${item.price}</p>
                                        <p>
                                            Quantity:
                                            <input
                                                type="number"
                                                value={item.quantity || 1}
                                                min="1"
                                                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                            />
                                        </p>
                                        <button
                                            className="cart-button"
                                            onClick={() => handleRemoveFromCart(item.id)}
                                        >
                                            Remove from Cart
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Your cart is empty.</p>
                        )}
                    </div>
                    {cartItems.length > 0 && (
                        <button
                            className="place-order-btn"
                            type="button"
                            onClick={handlePlaceOrder}
                        >
                            Place Order
                        </button>
                    )}
                </div>
                {showPaymentMethods && (
                    <div className="payment-methods">
                        <h3>Select Payment Method</h3>
                        <button type="button" onClick={() => handlePaymentMethod('Credit Card')}>
                            Credit Card
                        </button>
                        <button type="button" onClick={() => handlePaymentMethod('PayPal')}>
                            PayPal
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutForm;
