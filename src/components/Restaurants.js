import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Restaurants.css';
import { initialRestaurants } from '../data/restaurantData';

// Import all images
import serenityLogo from '../assets/images/Serenity.png';
import shawrysLogo from '../assets/images/Shawrieskitchen.png';
import bigBiteLogo from '../assets/images/bigbyte.png';
import coverImage from '../assets/images/Cover.png';

// Object to map image filenames to their imported versions
const imageMap = {
    'Serenity.png': serenityLogo,
    'Shawries.png': shawrysLogo,
    'bigbyte.png': bigBiteLogo,
    'Cover.png': coverImage,
};

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState(initialRestaurants);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Restaurant name is required'),
        location: Yup.string().required('Location is required'),
        description: Yup.string().required('Description is required'),
        image: Yup.string().required('Image is required'),
    });

    const handleAddRestaurant = (values, { resetForm }) => {
        const newRestaurant = {
            id: restaurants.length + 1, // Generate a unique ID (replace with actual logic)
            name: values.name,
            location: values.location,
            description: values.description,
            image: values.image,
        };

        setRestaurants([...restaurants, newRestaurant]);
        resetForm();
    };

    return (
        <div className="restaurant-container">
            <h1 className="restaurant-heading">Restaurants</h1>

            <div className="restaurant-grid">
                {restaurants.map((restaurant, index) => (
                    <div key={index} className="restaurant-card">
                        <img
                            src={imageMap[restaurant.image] || coverImage}
                            alt={restaurant.name}
                            className="restaurant-logo"
                        />
                        <div className="restaurant-info">
                            <h3 className="restaurant-name">{restaurant.name}</h3>
                            <p className="restaurant-location">{restaurant.location}</p>
                            <p className="restaurant-description">{restaurant.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <Formik
                initialValues={{ name: '', location: '', description: '', image: '' }}
                validationSchema={validationSchema}
                onSubmit={handleAddRestaurant}
            >
                {({ errors, touched }) => (
                    <Form className="restaurant-form">
                        <Field name="name" placeholder="Restaurant Name" className="form-input" />
                        <ErrorMessage name="name" component="div" className="error-message" />
                        <Field name="location" placeholder="Location" className="form-input" />
                        <ErrorMessage name="location" component="div" className="error-message" />
                        <Field name="description" placeholder="Description" className="form-input" />
                        <ErrorMessage name="description" component="div" className="error-message" />
                        <Field name="image" placeholder="Image filename" className="form-input" />
                        <ErrorMessage name="image" component="div" className="error-message" />
                        <button type="submit" className="add-button">Add Restaurant</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Restaurants;
