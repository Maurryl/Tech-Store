import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">DineMate</Link>
        </div>
        {/* Link Routes */}
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/restaurants">Restaurants</Link></li>
          <li><Link to="/book" className="book-btn">Book a Table</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;