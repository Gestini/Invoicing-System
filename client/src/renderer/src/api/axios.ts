import axios from 'axios'

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
})

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})

api.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response && error.response.status === 401) {
    console.error('Token expired or invalid')
  }
  return Promise.reject(error)
})


export const apiNode = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_NODE,
})