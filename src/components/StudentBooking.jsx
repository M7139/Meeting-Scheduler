import { useState, useEffect } from 'react'
import { GetStudentBookings, DeleteBooking } from '../services/booking'
import '../styles/StudentBooking.css'

const StudentBooking = () => {
  const [bookings, setBookings] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    const getBookings = async () => {
      try {
        const data = await GetStudentBookings()
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
    <div className="booking-container">
      <h2>Your Bookings</h2>
      {error && <div className="error-message">{error}</div>}
      {bookings.length === 0 ? (
        <div className="empty-state">
          No bookings found. Visit the teachers page to book your first session!
        </div>
      ) : (
        <ul className="booking-list">
          {bookings.map((booking) => (
            <li key={booking._id} className="booking-item">
              <div className="booking-info">
                <div className="booking-detail">
                  <span className="booking-label">Teacher</span>
                  <span className="booking-value teacher-name">{booking.teacher.name}</span>
                </div>
                <div className="booking-detail">
                  <span className="booking-label">Department</span>
                  <span className="booking-value">{booking.teacher.department}</span>
                </div>
                <div className="booking-detail">
                  <span className="booking-label">Day</span>
                  <span className="booking-value">{booking.day}</span>
                </div>
                <div className="booking-detail">
                  <span className="booking-label">Time</span>
                  <span className="booking-value">{booking.startTime} - {booking.endTime}</span>
                </div>
              </div>
              <button className="cancel-btn" onClick={() => handleCancel(booking._id)}>
                Cancel Booking
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default StudentBooking
