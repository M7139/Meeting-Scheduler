import { useState, useEffect } from 'react'
import { GetTeacherBookings, DeleteBooking } from '../services/booking'
import '../styles/TeacherBooking.css'

const TeacherBooking = () => {
  const [bookings, setBookings] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const getBookings = async () => {
      try {
        const data = await GetTeacherBookings()
        setBookings(data)
      } catch (err) {
        console.error(err)
        setError('Failed to get your bookings.')
      }
    }
    getBookings()
  }, [])

  const handleCancel = async (id) => {
    try {
      await DeleteBooking(id)
      setBookings((prev) => prev.filter((booking) => booking._id !== id))
    } catch (err) {
      console.error(err)
      setError('Failed to cancel booking.')
    }
  }

  return (
    <div className="teacher-booking-container">
      <h2>Your Students' Bookings</h2>
      {error && <div className="error-message">{error}</div>}
      {bookings.length === 0 ? (
        <div className="empty-state">No student bookings yet.</div>
      ) : (
        <>
          <div className="bookings-count">
            {bookings.length} booking{bookings.length !== 1 ? 's' : ''}{' '}
            scheduled
          </div>
          <ul className="bookings-list">
            {bookings.map((booking) => (
              <li key={booking._id} className="booking-item">
                <div className="booking-header">
                  <div className="student-info">
                    <h3 className="student-name">{booking.student.name}</h3>
                    <p className="student-email">{booking.student.email}</p>
                  </div>
                </div>

                <div className="booking-details">
                  <div className="booking-detail">
                    <span className="booking-label">Day</span>
                    <span className="booking-value">{booking.day}</span>
                  </div>
                  <div className="booking-detail">
                    <span className="booking-label">Time</span>
                    <span className="booking-value">
                      {booking.startTime} - {booking.endTime}
                    </span>
                  </div>
                </div>

                <button
                  className="cancel-btn"
                  onClick={() => handleCancel(booking._id)}
                >
                  Cancel Booking
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default TeacherBooking
