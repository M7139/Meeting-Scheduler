import { useState, useEffect } from 'react'
import Client from '../services/api'
import '../styles/Profile.css'

const Profile = ({ user }) => {
  const [form, setForm] = useState(user || {})
  const [editing, setEditing] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    setForm(user)
  }, [user])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg('')

    try {
      const endpoint = user.userType === 'student' 
        ? '/students/profile/me' 
        : '/teachers/profile/me'

      const formData = new FormData()
      formData.append('name', form.name)
      formData.append('email', form.email)
      
      if (user.userType === 'teacher') {
        formData.append('office', form.office || '')
        formData.append('department', form.department || '')
      }
      if (profileImage) formData.append('profileImage', profileImage)

      const res = await Client.put(endpoint, formData)
      setForm(res.data)
      setEditing(false)
      setProfileImage(null)
    } catch (err) {
      setErrorMsg(err.response?.data?.msg || 'Update failed.')
    }
  }

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      
      {!editing ? (
        <div>
          <div className="profile-info">
            {form.profileImage && (
              <img
                src={`http://localhost:3000/uploads/${form.profileImage}`}
                alt="Profile"
                className="profile-pic"
              />
            )}
            <p><strong>Name:</strong> {form.name}</p>
            <p><strong>Email:</strong> {form.email}</p>
            <p><strong>Role:</strong> {user.userType}</p>
            
            {/* Always show department and office for teachers */}
            {user.userType === 'teacher' && (
              <>
                <p><strong>Office:</strong> {form.office || 'Not specified'}</p>
                <p><strong>Department:</strong> {form.department || 'Not specified'}</p>
              </>
            )}
          </div>
          <button className="edit-btn" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        </div>
      ) : (
        <form className="profile-form" onSubmit={handleSubmit}>
          {form.profileImage && !profileImage && (
            <img
              src={`http://localhost:3000/uploads/${form.profileImage}`}
              alt="Profile"
              className="profile-pic"
            />
          )}
          {profileImage && (
            <img
              src={URL.createObjectURL(profileImage)}
              alt="New Profile"
              className="profile-pic"
            />
          )}
          
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          
          {user.userType === 'teacher' && (
            <>
              <input
                type="text"
                name="office"
                value={form.office || ''}
                onChange={handleChange}
                placeholder="Office"
              />
              <input
                type="text"
                name="department"
                value={form.department || ''}
                onChange={handleChange}
                placeholder="Department"
              />
            </>
          )}
          
          {errorMsg && <p className="error">{errorMsg}</p>}
          
          <div className="button-group">
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default Profile