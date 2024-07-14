import React, { useEffect, useState } from 'react';
import './Reservation.css';
import { Link, useParams } from 'react-router-dom';

function Reservation() {
  const { id } = useParams();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5555/restaurant/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (data.length > 0) {
          setReservations(data);
        } else {
          console.log('No reservation data found');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchReservation();
  }, [id]);

  const handleDelete = async (reservationId) => {
    try {
      const response = await fetch(`http://127.0.0.1:5555/reservation/${reservationId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete reservation');
      }
      setReservations((prevReservations) => prevReservations.filter((reservation) => reservation.id !== reservationId));
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  return (
    <div className="reservation-container">
        <div>
        <p className='head'>Reservation</p>
      </div>
      <main className="cd__main">
        <div className="profile-page">
          {reservations.map((reservation) => (
            <div className="content" key={reservation.id}>
              <div className="content__title">
                <h1>{reservation.customer?.name}</h1>
                <span></span>
              </div>
              <div className="content__description">
                <p>Email: {reservation.customer?.email}</p>
                <p>Contact: {reservation.customer?.contact}</p>
              </div>
              <div className="content__grid">
                <div className="content__item">
                  <span>{reservation.number_guests}</span>
                  <p>Number Of Guests</p>
                </div>
                <div className="content__item">
                  <span>{reservation.reservation_time}</span>
                  <p>Time</p>
                </div>
                <div className="content__item">
                  <span>{reservation.restaurant?.location}</span>
                  <p>Location</p>
                </div>
              </div>
              <div className="content__button">
                <Link to={`/Edit/${reservation.id}`}>
                  <button type="submit" className="submit-btn-edit">Edit</button>
                </Link>

                <div>
                  <button type="submit" className="submit-btn-delete" onClick={() => handleDelete(reservation.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Reservation;
