import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Restaurants.css';
import { initialRestaurants } from '../data/restaurantData';

// Import all images
import serenityLogo from '../assets/images/Serenity.png';
import shawrysLogo from '../assets/images/Shawrieskitchen.png';
import bigBiteLogo from '../assets/images/bigbyte.png';
// Placeholder image
import coverImage from '../assets/images/Cover.png';

// object to map image filenames to their imported versions
const imageMap = {
  'Serenity.png': serenityLogo,
  'Shawries.png': shawrysLogo,
  'bigbyte.png': bigBiteLogo,
  
};

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState(initialRestaurants);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Restaurant name is required'),
    location: Yup.string().required('Location is required'),
    description: Yup.string().required('Description is required'),
    image: Yup.string().required('Image is required'),
  });

  const handleAddRestaurant = async (values, { resetForm }) => {
    try {
      console.log(values);
      const response = await fetch('http://127.0.0.1:5555/restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        throw new Error('Failed to add restaurant');
      }
      const newRestaurant = await response.json();
      setRestaurants([...restaurants, newRestaurant]);
      resetForm();
    } catch (error) {
      console.error('Error adding restaurant:', error);
    }
  };

  const reservation = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5555/restaurants');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    reservation();
  }, []);

  return (
    <div className="restaurant-container">
      <div className="restaurant-grid">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-card">
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
