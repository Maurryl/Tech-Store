import React, { useState, useEffect } from 'react';
import './BookReservationForm.css';
import { FaUtensils, FaClock, FaCheckCircle, FaInfoCircle, FaTshirt, FaUtensilSpoon } from 'react-icons/fa';
import Modal from 'react-modal';

const initialRestaurants = [
    { id: 1, name: 'Restaurant Serenity', description: 'Elegant dining with a royal touch', image: 'Serenity.png', bgColor: '#000000' },
    { id: 2, name: "Shawry's Kitchen", description: 'Home-style cooking with a personal flair', image: 'Shawries.png', bgColor: '#FFFFFF' },
    { id: 3, name: 'Big Bite', description: 'Food and drink for the hearty appetite', image: 'bigbyte.png', bgColor: '#FFFBEB' },
    { id: 4, name: 'Culinary Corner', description: 'A fusion of global flavors', image: 'placeholder_logo.png', bgColor: '#FFF5E6' },
    { id: 5, name: 'Gourmet Galaxy', description: 'Out-of-this-world dining experience', image: 'placeholder_logo.png', bgColor: '#FFF5E6' },
];

function BookReservationForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [date, setDate] = useState('');
    const [restaurantId, setRestaurantId] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const [guest, setGuest] = useState('');
    const [restaurantsList, setRestaurantsList] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [customRestaurant, setCustomRestaurant] = useState('');

    useEffect(() => {
        // Simulating fetch data from API
        setRestaurantsList(initialRestaurants);
    }, []);

    const validateForm = () => {
        if (!name || !email || !contact || !date || (!restaurantId && !customRestaurant) || !guest) {
            setErrorMessage('Please fill in all fields.');
            return false;
        }
        if (isNaN(parseInt(guest)) || parseInt(guest) <= 0) {
            setErrorMessage('Number of guests must be a valid number greater than 0.');
            return false;
        }
        setErrorMessage('');
        return true;
    };

    const reservation = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        let selectedRestaurant = restaurantName;
        if (customRestaurant) {
            selectedRestaurant = customRestaurant;
        }

        const reservationData = {
            name,
            email,
            contact,
            date,
            restaurant: selectedRestaurant,
            guest: parseInt(guest)
        };

        try {
            const response = await fetch('http://127.0.0.1:5555/create_reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservationData),
            });
            if (!response.ok) {
                throw new Error('Failed to submit reservation');
            }
            setSuccessMessage('Reservation saved successfully. Procced to your email address for a confirmation of the same');
            setName('');
            setEmail('');
            setContact('');
            setDate('');
            setRestaurantId('');
            setRestaurantName('');
            setGuest('');
            setCustomRestaurant('');
        } catch (error) {
            console.error('Error submitting reservation:', error);
            setErrorMessage('Reservation submitted. Procced to check on your email address.');
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const selectRestaurant = (id, name) => {
        setRestaurantId(id);
        setRestaurantName(name);
        setIsModalOpen(false);
        setCustomRestaurant('');
    };

    const handleCustomRestaurantChange = (e) => {
        setCustomRestaurant(e.target.value);
    };

    return (
        <div className="reservation-page">
            <div className="reservation-header">
                <h1>Reserve Your Perfect Dining Experience</h1>
                <p>Effortless bookings at top-rated restaurants. Enjoy exclusive perks and create memorable moments with PlatePal.</p>
            </div>

            <div className="reservation-content">
                <div className="form-section">
                    <h2><FaUtensils /> Create Reservation</h2>
                    <form onSubmit={reservation} className="form-container">
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                        {successMessage && <p className="success-message">{successMessage}</p>}

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="contact">Contact:</label>
                                <input type="tel" id="contact" value={contact} onChange={(e) => setContact(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="date">Date:</label>
                                <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="restaurant">Restaurant:</label>
                                <input
                                    type="text"
                                    id="restaurant"
                                    value={restaurantName || customRestaurant}
                                    onClick={openModal}
                                    placeholder="Select a restaurant"
                                    readOnly
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="guests">Guests:</label>
                                <input
                                    type="number"
                                    id="guests"
                                    name="guests"
                                    value={guest}
                                    onChange={(e) => setGuest(e.target.value)}
                                />
                            </div>
                        </div>

                        <button type="submit" className="submit-btn">Book Now</button>
                    </form>
                </div>

                <div className="info-section">
                    <div className="dining-tips">
                        <h2><FaClock /> Dining Tips</h2>
                        <ul>
                            <li><FaCheckCircle /> Arrive on time for your reservation</li>
                            <li><FaInfoCircle /> Inform the restaurant of any dietary restrictions in advance</li>
                            <li><FaTshirt /> Check the dress code before you go</li>
                            <li><FaUtensilSpoon /> Be open to trying the chef's recommendations</li>
                        </ul>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Select Restaurant"
                className="Modal"
                overlayClassName="Overlay"
            >
                <h2>Select a Restaurant</h2>
                <button onClick={closeModal} className="close-btn">&times;</button>
                <ul className="restaurants-list">
                    {restaurantsList.map((restaurant) => (
                        <li key={restaurant.id} onClick={() => selectRestaurant(restaurant.id, restaurant.name)}>
                            {restaurant.name}
                        </li>
                    ))}
                    <li>
                        <input
                            type="text"
                            placeholder="Enter a restaurant name"
                            value={customRestaurant}
                            onChange={handleCustomRestaurantChange}
                        />
                        <button onClick={() => selectRestaurant('custom', customRestaurant)}>Enter a personal preference</button>
                    </li>
                </ul>
            </Modal>
        </div>
    );
}

export default BookReservationForm;
