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
    const res = await Client.get('/teachers/profile/me')
    return res.data
  } catch (error) {
    throw error
  }
}

// Update the logged-in teacher's profile
export const UpdateTeacherProfile = async (data) => {
  try {
    const res = await Client.put('/teachers/profile/me', data)
    return res.data
  } catch (error) {
    throw error
  }
}

// Delete the logged-in teacher's account
export const DeleteTeacher = async () => {
  try {
    const res = await Client.delete('/teachers/profile/me')
    return res.data
  } catch (error) {
    throw error
  }
}

// Add availability slots
export const AddAvailability = async (availability) => {
  try {
    const res = await Client.post('/teachers/availability', { availability })
    return res.data
  } catch (error) {
    throw error
  }
}

// Update an availability
export const UpdateAvailability = async (data) => {
  try {
    const res = await Client.put('/teachers/availability', data)
    return res.data
  } catch (error) {
    throw error
  }
}


// Delete an availability slot by index
export const DeleteAvailability = async (slotId) => {
  try {
    const res = await Client.delete(`/teachers/availability/${slotId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

