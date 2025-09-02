import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

const Navbar = ({ user, handleLogout }) => {
  return (
    <nav>
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          Home
        </Link>

        {user ? (
          <div className="user-nav">
            <Link to="/profile">Profile</Link>
            {user.userType === 'teacher' && (
              <>
                <Link to="/availability">Availability</Link>
                <Link to="/teacher-bookings">My Students</Link>
              </>
            )}
            {user.userType === 'student' && (
              <>
                <Link to="/teachers">Browse Teachers</Link>
                <Link to="/student-bookings">My Bookings</Link>
              </>
            )}
            <Link to="/login" className="logout-link" onClick={handleLogout}>
              Logout
            </Link>
          </div>
        ) : (
          <div className="user-nav">
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
