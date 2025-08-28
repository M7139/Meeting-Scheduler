import Client from './api'

// Register student
export const RegisterStudent = async (data) => {
  try {
    const res = await Client.post('/auth/register/student', data) 
    return res.data
  } catch (error) {
    throw error
  }
}

// Register teacher
export const RegisterTeacher = async (data) => {
  try {
    const res = await Client.post('/auth/register/teacher', data) 
    return res.data
  } catch (error) {
    throw error
  }
}

// Login (student or teacher)
export const Login = async (data) => {
  try {
    const res = await Client.post('/auth/login', data)
    // Save token to localStorage
    localStorage.setItem('token', res.data.token)
    return res.data.user
  } catch (error) {
    throw error
  }
}

// Check session
export const CheckSession = async () => {
  try {
    const res = await Client.get('/auth/session')
    return res.data
  } catch (error) {
    throw error
  }
}
