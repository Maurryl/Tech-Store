import React, { useState, useContext } from 'react';
import { CartContext } from './CartContext';
import { initialTechItems } from '../data/techItemsData';
import './TechItems.css';
import { FaCartPlus, FaStar } from 'react-icons/fa';
import Reviews from './Reviews';
import './Reviews.css';

const TechItems = () => {
    const { addToCart } = useContext(CartContext);
    const [techItems] = useState(initialTechItems);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showReviews, setShowReviews] = useState(false);

    const handleAddToCart = (item) => {
        addToCart(item);
        alert(`${item.name} added to cart`);
    };

    const handleShowReviews = (item) => {
        setSelectedItem(item);
        setShowReviews(true);
    };

    const handleCloseReviews = () => {
        setShowReviews(false);
        setSelectedItem(null);
    };

    return (
        <div className="tech-item-container">
            <h1 className="tech-item-heading">Explore Our Tech Items</h1>
            {['Laptops', 'Desktop Computers', 'Printers and Scanners', 'Software', 'Wireless Keyboards', 'Smart Watches'].map((category, index) => (
                <div key={index}>
                    <h2 className="devices-subs">{category}</h2>
                    <div className="tech-item-grid">
                        {techItems.filter(item => item.category === category).map((item, index) => (
                            <div key={index} className="tech-item-card">
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/images/${item.image}`}
                                    alt={item.name}
                                    className="tech-item-logo"
                                />
                                <div className="tech-item-info">
                                    <h3 className="tech-item-name">{item.name}</h3>
                                    <p className="tech-item-description">{item.description}</p>
                                    <button className="cart-button" onClick={() => handleAddToCart(item)}>
                                        <FaCartPlus /> Add to Cart
                                    </button>
                                    <button className="review-button" onClick={() => handleShowReviews(item)}>
                                        <FaStar /> Reviews
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {showReviews && selectedItem && (
                <>
                    <div className="modal-overlay" onClick={handleCloseReviews}></div>
                    <div className="reviews-modal">
                        <button className="close-modal" onClick={handleCloseReviews}>X</button>
                        <Reviews techItemId={selectedItem.id} />
                    </div>
                </>
            )}
        </div>
    );
};

export default TechItems;
