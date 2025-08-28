import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import StudentRegister from './components/StudentRegister'
import TeacherRegister from './components/TeacherRegister'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<Home />} />

        
        <Route path="/register/student" element={<StudentRegister />} />
        <Route path="/register/teacher" element={<TeacherRegister />} />
      </Routes>
    </>
  )
}

export default App
