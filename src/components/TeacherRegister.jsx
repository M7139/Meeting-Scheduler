import { useState } from "react"
import { RegisterTeacher } from "../services/auth"

const TeacherRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    office: ""
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await RegisterTeacher(form)
      alert("Teacher registered successfully!")
    } catch (err) {
      console.error(err)
      alert("Error registering teacher")
    }
  }

  return (
    <div>
      <h2>Teacher Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
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
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
        />
        <input
          type="text"
          name="office"
          placeholder="Office"
          value={form.office}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default TeacherRegister
