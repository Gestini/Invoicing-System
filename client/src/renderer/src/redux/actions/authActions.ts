import { createAsyncThunk,createAction  } from '@reduxjs/toolkit'
import { ILogin } from '../../types/Auth'
import axios from 'axios'


export const loginUser = createAsyncThunk(
    'auth/login',
    async (data: ILogin, { rejectWithValue }) => {
      try {
        const response = await axios.post('/api/login/', data)
        const result = response.data
        const tokenCreationDate = Date.now() 
        localStorage.setItem('user_token', result.token)
        console.log(result.data)
        return result.data
      } catch (error: any) {
        console.error('login: error during login process', error)

        // Uso adecuado de rejectWithValue para manejar errores en acciones asincrónicas de Redux Toolkit
        return rejectWithValue(error.response?.data?.message || 'An error occurred at loginUser')
      }
    }
  )