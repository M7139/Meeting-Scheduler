import Client from "./api"

// Get logged-in student profile
export const GetStudentProfile = async () => {
  try {
    const res = await Client.get("/students/me")
    return res.data
  } catch (error) {
    throw error
  }
}

// Update logged-in student profile
export const UpdateStudentProfile = async (formData) => {
  try {
    const res = await Client.put("/students/me", formData)
    return res.data
  } catch (error) {
    throw error
  }
}

// Delete logged-in student
export const DeleteStudent = async () => {
  try {
    const res = await Client.delete("/students/me")
    return res.data
  } catch (error) {
    throw error
  }
}
