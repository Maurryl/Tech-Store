import React from 'react';
import { Link } from 'react-router-dom';
import { FaLaptop, FaMobileAlt, FaHeadphones } from 'react-icons/fa';
import './About.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-section">
        <h2 className="about-title">Our Story</h2>
        <p className="about-text">TechMarz was founded on the idea that technology can enhance our lives in incredible ways. Our team of tech enthusiasts came together to create a platform that makes it easy for people to discover and purchase the latest tech gadgets and innovations.</p>
        <p className="about-text">We believe that exploring new technology should be a seamless and exciting experience, which is why we're dedicated to providing a user-friendly platform that connects tech lovers with cutting-edge products.</p>
      </div>

      <div className="mission-section">
        <h2 className="mission-title">Our Mission</h2>
        <div className="mission-grid">
          <div className="mission-item">
            <FaLaptop className="mission-icon" />
            <h3 className="mission-title">Innovative Technology</h3>
            <img src="https://wallpapers.com/laptop" alt="Laptop" className="mission-image" />
            <p className="mission-text">We're passionate about helping people discover the latest tech innovations and creating exceptional experiences with new gadgets.</p>
          </div>
          <div className="mission-item">
            <FaMobileAlt className="mission-icon" />
            <h3 className="mission-title">Tech for Everyone</h3>
            <img src="https://i.pinimg.com/236x/51/a4/29/51a429c0efdf8b9b5c816d93efb4cf51.jpg" alt="Mobile phone" className="mission-image" />
            <p className="mission-text">We believe that technology should be accessible to everyone, and we strive to provide a range of products to meet diverse needs.</p>
          </div>
          <div className="mission-item">
            <FaHeadphones className="mission-icon" />
            <h3 className="mission-title">Exceptional Service</h3>
            <img src="https://i.pinimg.com/474x/7c/3e/5e/7c3e5e02c77e1c9fc56e50a2040488b1.jpg" alt="Headphones" className="mission-image" />
            <p className="mission-text">We're committed to providing exceptional customer service and ensuring that every interaction with TechMarz is a positive one.</p>
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
        <Link to="/tech-items" className="cta-button">Explore Tech Items</Link>
        <p className="cta-text">Ready to dive into the world of tech? Browse our selection of the latest gadgets and innovations and find your next favorite device today!</p>
      </div>
    </div>
  );
};

export default AboutPage;
