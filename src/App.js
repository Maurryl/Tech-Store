// App.js or where your routing is defined
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Restaurants from './components/Restaurants';
import BookReservationForm from './components/BookReservationForm';
import Reservation from './components/Reservation';
import EditReservation from './components/EditReservation';
import Auth from './components/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/book" element={<BookReservationForm />} />
            <Route path="/Reservation/:id" element={<Reservation />} />
            <Route path="/Edit/:id" element={<EditReservation />} />
            <Route path="/login" element={<Auth />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
