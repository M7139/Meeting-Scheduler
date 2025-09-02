import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { GetTeacherAvailability, GetTeacherById } from '../services/teacher'
import { CreateBooking } from '../services/booking'
import '../styles/TeacherDetailPage.css'

const TeacherDetailsPage = () => {
  const { id } = useParams()
  const [teacher, setTeacher] = useState(null)
  const [availability, setAvailability] = useState([])

  useEffect(() => {
    const getTeacherDetails = async () => {
      try {
        // Get basic teacher info
        const data = await GetTeacherById(id)
        setTeacher({
          _id: data._id,
          name: data.name,
          department: data.department
        })

        // Get only free slots
        const freeSlots = await GetTeacherAvailability(id)
        setAvailability(freeSlots)
      } catch (err) {
        console.error(err)
      }
    }
    getTeacherDetails()
  }, [id])

  const handleBook = async (slot) => {
    try {
      await CreateBooking({
        teacherId: teacher._id,
        day: slot.day,
        startTime: slot.startTime,
        endTime: slot.endTime
      })

      // Remove booked slot from availability list
      setAvailability((prev) => prev.filter((s) => s !== slot))
    } catch (err) {
      console.error(err)
    }
  }

  if (!teacher)
    return (
      <div className="teacher-detail-container">
        <div className="loading-message">Loading teacher information...</div>
      </div>
    )

  return (
    <div className="teacher-detail-container">
      <div className="teacher-header">
        <h2 className="teacher-name">{teacher.name}</h2>
        <p className="teacher-department">Department: {teacher.department}</p>
      </div>

      <div className="availability-section">
        <h3>Available Slots</h3>
        {availability.length === 0 ? (
          <div className="empty-slots">
            No available time slots at the moment. Please check back later or
            contact the teacher directly.
          </div>
        ) : (
          <>
            <div className="slots-count">
              {availability.length} slot{availability.length !== 1 ? 's' : ''}{' '}
              available
            </div>
            <ul className="slots-list">
              {availability.map((slot, index) => (
                <li key={index} className="slot-item">
                  <div className="slot-info">
                    <span className="slot-day">{slot.day}</span>
                    <span className="slot-time">
                      {slot.startTime} - {slot.endTime}
                    </span>
                  </div>
                  <button className="book-btn" onClick={() => handleBook(slot)}>
                    Book Slot
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}

export default TeacherDetailsPage
