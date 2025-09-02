import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GetTeachers } from '../services/teacher'
import { BASE_URL } from '../services/api'
import '../styles/TeachersListPage.css'

const TeachersListPage = () => {
  const [teachers, setTeachers] = useState([])

  useEffect(() => {
    const getTeachers = async () => {
      try {
        const data = await GetTeachers()
        setTeachers(data)
      } catch (err) {
        console.error(err)
      }
    }
    getTeachers()
  }, [])

  return (
    <div className="teachers-container">
      <h2>Browse Teachers</h2>
      {teachers.length === 0 ? (
        <div className="empty-state">No teachers available at the moment.</div>
      ) : (
        <>
          <div className="teachers-count">
            {teachers.length} teacher{teachers.length !== 1 ? 's' : ''} available
          </div>
          <ul className="teachers-list">
            {teachers.map((teacher) => (
              <li key={teacher._id} className="teacher-card">
                <div className="teacher-info">
                  <img
                    src={
                      teacher.profileImage
                        ? `${BASE_URL}/uploads/${teacher.profileImage}`
                        : `${BASE_URL}/uploads/default-avatar.png`
                    }
                    alt={teacher.name}
                    className="teacher-image"
                  />
                  <div>
                    <h3 className="teacher-name">{teacher.name}</h3>
                    {teacher.department && (
                      <p className="teacher-department">{teacher.department}</p>
                    )}
                    {teacher.office && (
                      <p className="teacher-office">Office: {teacher.office}</p>
                    )}
                  </div>
                </div>
                <Link to={`/teachers/${teacher._id}`} className="view-link">
                  View Availability
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default TeachersListPage
