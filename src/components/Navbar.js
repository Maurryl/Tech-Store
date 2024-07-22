import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, isAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">TechMarz</Link>
        </div>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/tech-items">Tech Items</Link></li>
          <li><Link to="/book" className="book-btn">MY CART</Link></li><br /><br />
          {isAuthenticated ? (
            <li>
              <button onClick={handleLogout} className="auth-button">Logout</button>
            </li>
          ) : (
            <li><Link to="/login" className="auth-button">Login</Link></li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
