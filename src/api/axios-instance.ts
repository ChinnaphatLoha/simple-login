import axios from 'axios'
import { ForbiddenError } from '@/errors'

const client = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

client.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.message

      switch (error.response?.status) {
        case 403:
          throw new ForbiddenError(errorMessage)
        default:
          throw error
      }
    }
    return Promise.reject(error)
  }
)

export default client
