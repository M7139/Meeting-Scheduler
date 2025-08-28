import Client from "./api"

// Create a booking
export const CreateBooking = async (data) => {
  try {
    const res = await Client.post("/bookings", data)
    return res.data
  } catch (error) {
    throw error
  }
}

// Get booking by ID
export const GetBookingById = async (id) => {
  try {
    const res = await Client.get(`/bookings/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}

// Get bookings for logged-in student
export const GetStudentBookings = async () => {
  try {
    const res = await Client.get("/bookings/student")
    return res.data
  } catch (error) {
    throw error
  }
}

// Get bookings for logged-in teacher
export const GetTeacherBookings = async () => {
  try {
    const res = await Client.get("/bookings/teacher")
    return res.data
  } catch (error) {
    throw error
  }
}

// Update a booking
export const UpdateBooking = async (id, data) => {
  try {
    const res = await Client.put(`/bookings/${id}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}

// Delete (cancel) a booking
export const DeleteBooking = async (id) => {
  try {
    const res = await Client.delete(`/bookings/${id}`)
    return res.data
  } catch (error) {
    throw error
  }
}
