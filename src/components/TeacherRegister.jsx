import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { RegisterTeacher } from "../services/auth"
import "../styles/TeacherRegister.css"

const TeacherRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    office: ""
  })
  const [profileImage, setProfileImage] = useState(null)
  const [errorMsg, setErrorMsg] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0])
  }

  // Frontend password validation
  const isPasswordValid = (password) => {
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    return pattern.test(password)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMsg("")

    if (!isPasswordValid(form.password)) {
      setErrorMsg(
        "Password must be at least 8 characters long and include uppercase, lowercase, and a number."
      )
      return
    }

    try {
      const formData = new FormData()
      formData.append("name", form.name)
      formData.append("email", form.email)
      formData.append("password", form.password)
      formData.append("department", form.department)
      formData.append("office", form.office)
      if (profileImage) formData.append("profileImage", profileImage) // optional

      await RegisterTeacher(formData)

      navigate("/login") // redirect after successful registration
    } catch (err) {
      console.error(err)
      setErrorMsg(err.response?.data?.msg || "Registration failed.")
    }
  }

  return (
    <div className="register-container">
      <h2>Teacher Registration</h2>
      {errorMsg && <p className="error">{errorMsg}</p>}
      <form className="register-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <input type="text" name="department" placeholder="Department" value={form.department} onChange={handleChange} />
        <input type="text" name="office" placeholder="Office" value={form.office} onChange={handleChange} />
        <input type="file" name="profileImage" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default TeacherRegister
