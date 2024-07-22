import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaStar, FaGift, FaCog, FaSearch, FaCalendarAlt, FaCheck, FaDesktop, FaArrowRight } from 'react-icons/fa';
import backgroundImage from '../assets/images/Cover.jpg';
import goToAppAward from '../assets/images/Go-to-app.png';
import foodIndustryAward from '../assets/images/Foodindustryinnovation.png';
import './Home.css';

const HomePage = () => {
  const [bookingCount, setBookingCount] = useState(1500);
  const [greeting, setGreeting] = useState('');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);


  const backgroundImageStyle = {
    content: '',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '4000px',
    backgroundRepeat: 'no-repeat',
    height: '4000px',
    backgroundSize: 'cover', /* Ensure the image covers the entire area */
    backgroundPosition: 'center', /* Center the image within the area */
    zIndex: '-1', /* Ensure the background is behind the content */
  }
  const testimonials = [
    { quote: "Using TechMarz has been a game-changer for our tech meetups. The ease of booking and the special perks for members have made organizing events enjoyable and stress-free!", author: "Halley" },
    { quote: "TechMarz made our anniversary hackathon so special. We got the best venue without any hassle!", author: "Sarah Mungai" },
    { quote: "I've been using TechMarz for several months now, and it's the best way to book tech venues in the city. Highly recommended!", author: "John" },
    { quote: "TechMarz made booking venues so effortless! I love how I can browse through top tech spaces and secure a spot in just a few taps. It’s my go-to app for tech events!", author: "John" },
    { quote: "TechMarz made booking venues so effortless! I love how I can browse through top tech spaces and secure a spot in just a few taps. It’s my go-to app for tech events!", author: "John" },
  ];

  useEffect(() => {
    // Simulating booking count increase
    const bookingInterval = setInterval(() => {
      setBookingCount(prevCount => prevCount + 1);
    }, 5000);

    // Set greeting based on time of day
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting('Good morning');
      else if (hour < 18) setGreeting('Good afternoon');
      else setGreeting('Good evening');
    };

    updateGreeting();
    const greetingInterval = setInterval(updateGreeting, 60000); // Update greeting every minute

    // Rotate testimonials
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => {
      clearInterval(bookingInterval);
      clearInterval(greetingInterval);
      clearInterval(testimonialInterval);
    };
  }, [testimonials.length]); // Include testimonials.length in the dependency array

  return (
    <div className="home-page">
      <div style={backgroundImageStyle}></div>
      {/* Hero section */}
      <div className="hero-section">
        <div className="hero-grid">
          <div className="hero-image parallax" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
          <div className="hero-content">
            <span className="greeting">{greeting}!</span>
            <h1>Your Perfect Tech Devices Await</h1>
            <h2 className="secondary-headline">Browse,Order and Pickup with Ease</h2>
            <p className="secondary-subheadline">Effortless reservations at your favorite tech venues</p>
            <Link to="/tech-spaces" className="cta-button pulse">Find a Space</Link>
            <div className="social-proof">
              <span>{bookingCount.toLocaleString()}+</span>
              <p className='socialproof-header'>Happy Clients Served</p>
            </div>

            <div className="hero-benefits">
              <h3>Discover the TechMarz Difference</h3>
              <div className="benefits">
                <div className="benefit-item">
                  <FaClock className="benefit-icon" />
                  <span id='benefit-header'>Secure Delivery</span>
                </div>
                <div className="benefit-item">
                  <FaStar className="benefit-icon" />
                  <span id='benefit-header'>Curated Selection</span>
                </div>
                <div className="benefit-item">
                  <FaGift className="benefit-icon" />
                  <span id='benefit-header'>Special Perks</span>
                </div>
                <div className="benefit-item">
                  <FaCog className="benefit-icon" />
                  <span id='benefit-header'>Easy Management</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero section 2 */}
      <section className="how-it-works">
        <h2>Simple Steps to Your Next Great Tech Acquisition</h2>
        <ol>
          <li>
            <h3><FaSearch /> Discover</h3>
            <p>Browse our curated list of top-rated tech devices</p>
          </li>
          <li>
            <h3><FaCalendarAlt /> Select</h3>
            <p>Choose your preference</p>
          </li>
          <li>
            <h3><FaCheck /> Book</h3>
            <p>Instantly confirm your order details</p>
          </li>
          <li>
            <h3><FaDesktop /> Innovate</h3>
            <p>Pick up and enjoy your perfectly prepared tech space at delivery point</p>
          </li>
        </ol>
      </section>

      <section className="featured-tech-spaces">
        <div className="featured-card">
          <FaDesktop className="featured-icon" />
          <h2>Explore Local Tech Devices</h2>
          <p>From comfy devices to state-of-the-art innovation accompaniments, find the perfect device for any occasion</p>
          <Link to="/tech-spaces" className="view-all-btn">
            View All Tech Devices
            <FaArrowRight className="arrow-icon" />
          </Link>
        </div>
      </section>

      <section className="testimonial">
        <h2>What Our Users Say</h2>
        {testimonials.map((testimonial, index) => (
          <div key={index} className={`testimonial-item ${index === currentTestimonial ? 'active' : ''}`}>
            <blockquote>{testimonial.quote}</blockquote>
            <cite>- {testimonial.author}</cite>
          </div>
        ))}
      </section>

      <section className="special-offer">
        <h2>New to TechMarz?</h2>
        <p>Enjoy 20% off your first order</p>
        <Link to="/book" className="cta-button pulse">Claim Offer</Link>
      </section>

      {/* Trust Indicators section */}
      <section className="trust-indicators">
        <h2 className="trust-indicators-heading">Award-Winning Excellence</h2>
        <div className="awards-container">
          <div className="award">
            <img src={goToAppAward} alt="Tech Magazine Award" className="award-badge" />
            <p>The Go-To Tech Space Reservation App</p>
            <span className="award-year">2021</span>
          </div>
          <div className="award">
            <img src={foodIndustryAward} alt="Best Tech Industry Innovation Award" className="award-badge" />
            <p>Best Tech Industry Innovation</p>
            <span className="award-year">2023</span>
          </div>
        </div>
        <div className="additional-trust">
          <p><strong>Trusted by over 1000 tech enthusiasts</strong></p>
          <p><strong> Exclusive partnerships with over 500 top-rated tech venues </strong></p>
        </div>
      </section>

      {/* Final cta section */}
      <section className="final-cta">
        <h2>Ready for your next unforgettable tech device experience?</h2>
        <Link to="/book" className="cta-button pulse">Order Your Preference Now</Link>
      </section>
    </div>
  );
};

export default HomePage;
