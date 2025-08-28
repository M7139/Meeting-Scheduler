import Client from './api'

// Get all teachers
export const GetTeachers = async () => {
  try {
    const res = await Client.get('/teachers')
    return res.data
  } catch (error) {
    throw error
  }
}

// Get a specific teacher by ID
export const GetTeacherById = async (id) => {
  try {
    const res = await Client.get(`/teachers/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

// Get availability of a specific teacher
export const GetTeacherAvailability = async (id) => {
  try {
    const res = await Client.get(`/teachers/${id}/availability`)
    return res.data
  } catch (error) {
    throw error
  }
}

// Get the logged-in teacher's own profile
export const GetTeacherProfile = async () => {
  try {
    const res = await Client.get('/teachers/me')
    return res.data
  } catch (error) {
    throw error
  }
}

// Update the logged-in teacher's profile
export const UpdateTeacherProfile = async (data) => {
  try {
    const res = await Client.put('/teachers/me', data)
    return res.data
  } catch (error) {
    throw error
  }
}

// Delete the logged-in teacher's account
export const DeleteTeacher = async () => {
  try {
    const res = await Client.delete('/teachers/me')
    return res.data
  } catch (error) {
    throw error
  }
}

// Add availability slots
export const AddAvailability = async (availability) => {
  try {
    const res = await Client.post('/teachers/me/availability', { availability })
    return res.data
  } catch (error) {
    throw error
  }
}

// Update an availability slot by index
export const UpdateAvailability = async (data) => {
  try {
    const res = await Client.put('/teachers/me/availability', data)
    return res.data
  } catch (error) {
    throw error
  }
}

// Delete an availability slot by index
export const DeleteAvailability = async (index) => {
  try {
    const res = await Client.delete('/teachers/me/availability', {
      data: { index }
    })
    return res.data
  } catch (error) {
    throw error
  }
}
