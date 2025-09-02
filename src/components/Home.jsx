import { Link } from 'react-router-dom'
import '../styles/Home.css'


const Home = () => {
  return (
    <div className="home-container">
  <h1>Welcome to the Booking App</h1>
  <p>Please select your role to register:</p>
  <div className="button-container">
    <Link to="/register/student">
      <button>Register as Student</button>
    </Link>
    <Link to="/register/teacher">
      <button>Register as Teacher</button>
    </Link>
  </div>
</div>
  )
}

export default Home
