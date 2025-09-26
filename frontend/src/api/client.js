import axios from 'axios'

const api = axios.create({
  baseURL: 'https://simple-task-manager-magnet-brain-task.onrender.com/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message || error.message
    return Promise.reject(new Error(message))
  }
)

export default api





