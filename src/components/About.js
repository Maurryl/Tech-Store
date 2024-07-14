import React from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaHeart, FaSmile } from 'react-icons/fa';
import './About.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-section">
        <h2 className="about-title">Our Story</h2>
        <p className="about-text">PlatePal was founded on the idea that sharing a meal with others is one of life's greatest pleasures. Our team of foodies and tech enthusiasts came together to create a platform that makes it easy for people to discover and book tables at their favorite restaurants.</p>
        <p className="about-text">We believe that dining out should be a seamless and enjoyable experience, which is why we're dedicated to providing a user-friendly platform that connects diners with top-rated restaurants.</p>
      </div>

      <div className="mission-section">
        <h2 className="mission-title">Our Mission</h2>
        <div className="mission-grid">
          <div className="mission-item">
            <FaUtensils className="mission-icon" />
            <h3 className="mission-title">Delicious Experiences</h3>
            <img src="https://i.pinimg.com/236x/b5/4d/97/b54d9719620ddd06547b50a6d2e09c02.jpg" alt="Set dining table" className="mission-image" />
            <p className="mission-text">We're passionate about helping people discover new flavors and create unforgettable dining experiences.</p>
          </div>
          <div className="mission-item">
            <FaHeart className="mission-icon" />
            <h3 className="mission-title">Community Building</h3>
            <img src="https://i.pinimg.com/236x/75/4e/80/754e8033443f2aaf4dec1b5710704066.jpg" alt="Group dining" className="mission-image" />
            <p className="mission-text">We believe that sharing a meal with others is a powerful way to build connections and foster community.</p>
          </div>
          <div className="mission-item">
            <FaSmile className="mission-icon" />
            <h3 className="mission-title">Exceptional Service</h3>
            <img src="https://i.pinimg.com/474x/3f/3c/27/3f3c2791b6dd3c2557f9461742aa4f58.jpg" alt="Happy waitress" className="mission-image" />
            <p className="mission-text">We're committed to providing exceptional customer service and ensuring that every interaction with PlatePal is a positive one.</p>
          </div>
        </div>
      </div>

      <div className="team-section">
        <h2 className="team-title">Meet the Team</h2>
        <div className="team-grid">
          <div className="team-member">
            <img src="https://i.pinimg.com/236x/29/09/3a/29093a3ed0e806c065ec3ea588f07db7.jpg" alt="Team Member 1" className="team-image" />
            <h3 className="team-name">Whitney Makotsi</h3>
            <p className="team-role">Founder & CEO</p>
          </div>
          <div className="team-member">
            <img src="https://i.pinimg.com/236x/ce/ab/24/ceab24d311023b09bf075098b1d0a3ae.jpg" alt="Team Member 2" className="team-image" />
            <h3 className="team-name">Mary Stella</h3>
            <p className="team-role">CTO</p>
          </div>
          <div className="team-member">
            <img src="https://i.pinimg.com/236x/94/f5/e5/94f5e5c85b96c219ff181c41f85fd6a4.jpg" alt="Team Member 3" className="team-image" />
            <h3 className="team-name">Cheryl Mutanu</h3>
            <p className="team-role">Head of Marketing</p>
          </div>
        </div>
      </div>

      <div className="call-to-action">
        <Link to="/restaurants" className="cta-button">Find a Table</Link>
        <p className="cta-text">Ready to start dining with PlatePal? Browse our selection of top-rated restaurants and book a table today!</p>
      </div>
    </div>
  );
};

export default AboutPage;