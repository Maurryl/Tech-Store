import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import "./Auth.css";
import './Reviews.css';

const Reviews = ({ techItemId }) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: '', comment: '' });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                if (techItemId) {
                    const response = await axios.get(`http://localhost:5555/reviews/${techItemId}`);
                    setReviews(response.data.reviews);
                }
            } catch (error) {
                console.error('Error fetching reviews:', error.response ? error.response.data : error.message);
                setError('Unable to fetch reviews at the moment. Please try again later.');
            }
        };
        fetchReviews();
    }, [techItemId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReview((prevReview) => ({
            ...prevReview,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token);

            if (!token) {
                navigate('/login');
                return;
            }

            // Check the structure of the token
            const segments = token.split('.');
            if (segments.length !== 3) {
                setError('Invalid token format');
                return;
            }

            // Decode token to check its content
            const decodedToken = jwtDecode(token); // Use the named export
            console.log('Decoded Token:', decodedToken);

            // Check if the token contains the user ID
            if (!decodedToken.sub || !decodedToken.sub.id) {
                setError('User ID not found in token');
                return;
            }

            const response = await axios.post('http://localhost:5555/reviews', {
                order_item_id: techItemId,
                rating: parseInt(newReview.rating), // Ensure rating is a number
                comment: newReview.comment
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Update reviews state immediately after submission
            setSuccessMessage('Review submitted successfully!');
            setNewReview({ rating: '', comment: '' });
            setReviews(prevReviews => [response.data.review, ...prevReviews]);
        } catch (error) {
            console.error('Error submitting review:', error.response ? error.response.data : error.message);
            setError('There was an error submitting your review. Please try again.');
        }
    };


    return (
        <div className="reviews">
            <h2>Reviews</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Rating (1-5):</label>
                    <input
                        type="number"
                        name="rating"
                        value={newReview.rating}
                        onChange={handleInputChange}
                        min="1"
                        max="5"
                        required
                    />
                </div>
                <div>
                    <label>Comment:</label>
                    <textarea
                        name="comment"
                        value={newReview.comment}
                        onChange={handleInputChange}
                        rows="4"
                    />
                </div>
                <button type="submit" className="auth-button">Submit Review</button>
            </form>
            <div className="review-list">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="review-item">
                            <p><strong>Rating:</strong> {review.rating}</p>
                            <p><strong>Comment:</strong> {review.comment}</p>
                            <p><small>{new Date(review.timestamp).toLocaleString()}</small></p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>
        </div>
    );
};

export default Reviews;
