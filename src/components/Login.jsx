import { useState } from "react"
import { Login } from "../services/auth"
import { useNavigate } from "react-router-dom"
import '../styles/Login.css'

const LoginPage = ({ setUser }) => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const user = await Login(form)
      setUser(user) 
      user.userType === 'student'
          ? navigate("/student-bookings")
          : navigate("/teacher-bookings")
       
    } catch (err) {
      console.error(err)
      
    }
  }

  return (
  <div className="login-container">
  <h2>Login</h2>
  <form className="login-form" onSubmit={handleSubmit}>
    <input
      type="email"
      name="email"
      placeholder="Email"
      value={form.email}
      onChange={handleChange}
      required
    />
    <input
      type="password"
      name="password"
      placeholder="Password"
      value={form.password}
      onChange={handleChange}
      required
    />
    <button type="submit">Login</button>
  </form>
</div>
  )
}

export default LoginPage
