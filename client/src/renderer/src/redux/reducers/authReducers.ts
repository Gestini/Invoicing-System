import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  loginUser,
} from '../actions/authActions'
import { IAuthState } from '../../types/Auth'


const initialState: IAuthState = {
  
  userObject: null,
  userEmail: null,
  error: null,
  loading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Otros reducers síncronos
    setUserData: (state, action: PayloadAction<any>) => {
      state.userObject = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        // Actualiza el estado con el objeto de usuario cuando el login es exitoso
        console.log(
          'Login: 8 FINAL. seteando el objeto de usuario obtenido en el login en redux',
          action.payload
        )
        state.userObject = action.payload
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.error = action.payload
      })

      //Register *******************************************************************************
    //   .addCase(registerUser.pending, (state) => {
    //     state.loading = true
    //   })
    //   .addCase(registerUser.fulfilled, (state, action: PayloadAction<string>) => {
    //     state.loading = false
    //     console.log('Registration successful:', action.payload)
    //   })
    //   .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
    //     state.loading = false
    //     state.error = action.payload
    //     console.log('error, rejected register user in authreducer')
    //   })

      //Change password  ***********************************************************************

  


      

      

      


      
  },
})
export const {setUserData } = authSlice.actions
export const { reducer: authReducer } = authSlice

