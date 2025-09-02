import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import StudentRegister from './components/StudentRegister'
import TeacherRegister from './components/TeacherRegister'
import Profile from './components/Profile'
import AvailabilityPage from './components/AvailabilityPage'
import TeachersListPage from './components/TeachersListPage'
import TeacherDetailsPage from './components/TeacherDetailsPage'
import StudentBooking from './components/StudentBooking'
import TeacherBooking from './components/TeacherBooking'
import { CheckSession } from './services/auth'

const App = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) checkUser()
  }, [])

  const checkUser = async () => {
    try {
      const data = await CheckSession()
      setUser(data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('token')
  }

  return (
    <>
      <Navbar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register/student" element={<StudentRegister />} />
        <Route path="/register/teacher" element={<TeacherRegister />} />
        {user && <Route path="/profile" element={<Profile user={user} />} />}
        <Route
          path="/availability"
          element={user && user.userType === 'teacher' ? <AvailabilityPage /> : <Navigate to="/" />}
        />
        <Route
          path="/teacher-bookings"
          element={user && user.userType === 'teacher' ? <TeacherBooking /> : <Navigate to="/" />}
        />
        <Route
          path="/teachers"
          element={user && user.userType === 'student' ? <TeachersListPage /> : <Navigate to="/" />}
        />
        <Route
          path="/teachers/:id"
          element={user && user.userType === 'student' ? <TeacherDetailsPage /> : <Navigate to="/" />}
        />
        <Route
          path="/student-bookings"
          element={user && user.userType === 'student' ? <StudentBooking /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  )
}

export default App
