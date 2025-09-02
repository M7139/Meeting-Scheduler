import { useState, useEffect } from 'react'
import {
  GetTeacherProfile,
  AddAvailability,
  UpdateAvailability,
  DeleteAvailability
} from '../services/teacher'
import '../styles/Availability.css'

const AvailabilityPage = () => {
  const [availability, setAvailability] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    getAvailability()
  }, [])

  const getAvailability = async () => {
    try {
      setLoading(true)
      const profile = await GetTeacherProfile()
      setAvailability(profile.availability || [])
    } catch (err) {
      console.error('Failed to get availability', err)
      setMessage('Failed to load availability')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (index, field, value) => {
    const updated = [...availability]
    updated[index][field] = value
    setAvailability(updated)
  }

  const handleAdd = () => {
    setAvailability([...availability, { day: '', startTime: '', endTime: '' }])
  }

  const handleSave = async (index) => {
    try {
      const slot = availability[index]

      if (slot._id) {
        // Update existing slot using _id
        await UpdateAvailability({
          slotId: slot._id,
          day: slot.day,
          startTime: slot.startTime,
          endTime: slot.endTime
        })
        setMessage('Slot updated successfully')
      } else {
        // Add new slot
        const updatedTeacher = await AddAvailability([
          { day: slot.day, startTime: slot.startTime, endTime: slot.endTime }
        ])
        setAvailability(updatedTeacher.availability)
        setMessage('Slot added successfully')
      }

      await getAvailability()
    } catch (err) {
      console.error('Failed to save slot', err)
      setMessage('Failed to save slot')
    }
  }

  const handleDelete = async (slotId, index) => {
    try {
      if (slotId) {
        await DeleteAvailability(slotId)
        setMessage('Slot deleted successfully')
      }

      // Remove from local state immediately
      setAvailability((prev) => prev.filter((_, i) => i !== index))
    } catch (err) {
      console.error('Failed to delete slot', err)
      setMessage('Failed to delete slot')
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="availability-container">
      <h2>Manage Availability</h2>

      {message && <div className="message">{message}</div>}

      {availability.map((slot, index) => (
        <div key={slot._id || index} className="availability-slot">
          <input
            type="text"
            placeholder="Day"
            value={slot.day}
            onChange={(e) => handleChange(index, 'day', e.target.value)}
          />
          <input
            type="time"
            value={slot.startTime}
            onChange={(e) => handleChange(index, 'startTime', e.target.value)}
          />
          <input
            type="time"
            value={slot.endTime}
            onChange={(e) => handleChange(index, 'endTime', e.target.value)}
          />
          <button onClick={() => handleSave(index)} className="save-btn">
            Save
          </button>
          <button
            onClick={() => handleDelete(slot._id, index)}
            className="delete-btn"
          >
            Delete
          </button>
        </div>
      ))}

      <button onClick={handleAdd} className="add-btn">
        Add New Slot
      </button>
    </div>
  )
}

export default AvailabilityPage
