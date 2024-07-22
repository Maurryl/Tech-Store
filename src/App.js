import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import TechItems from './components/TechItems';
import CheckoutForm from './components/CheckoutForm';
import Auth from './components/Login';
import { CartProvider } from './components/CartContext';

const validateToken = async (token) => {
  if (token === "valid-token") {
    return { username: "User" };
  } else {
    throw new Error("Invalid token");
  }
};

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      validateToken(token)
        .then(user => {
          setUser(user);
          setIsAuthenticated(true);
        })
        .catch(() => {
          localStorage.removeItem('token');
        });
    }
  }, []);

  return (
    <Fragment>
      <Router>
        <CartProvider>
          <div className="App">
            <Navbar user={user} isAuthenticated={isAuthenticated} />
            <main>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/tech-items" element={<TechItems />} />
                <Route
                  path="/book"
                  element={isAuthenticated ? <CheckoutForm /> : <Navigate to="/login" />}
                />
                <Route path="/login" element={<Auth setUser={setUser} setIsAuthenticated={setIsAuthenticated} />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </Router>
    </Fragment>
  );
}

export default App;
