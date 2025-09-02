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
        // Update existing slot
        await UpdateAvailability({
          slotId: slot._id,
          day: slot.day,
          startTime: slot.startTime,
          endTime: slot.endTime
        })
      } else {
        // Add new slot
        await AddAvailability([
          {
            day: slot.day,
            startTime: slot.startTime,
            endTime: slot.endTime
          }
        ])
      }

      // Refresh the data after saving
      getAvailability()
    } catch (err) {
      console.error('Failed to save slot', err)
    }
  }

  const handleDelete = async (slotId, index) => {
    try {
      if (slotId) {
        await DeleteAvailability(slotId)
      }
      // Remove from local state 
      setAvailability((prev) => prev.filter((_, i) => i !== index))
    } catch (err) {
      console.error('Failed to delete slot', err)
    }
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div className="availability-container">
      <h2>Manage Availability</h2>

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
