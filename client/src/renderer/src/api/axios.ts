import axios from 'axios'

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
})

export const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
})

export const apiNode = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_NODE,
})