import { createSlice } from '@reduxjs/toolkit'

export const manageUserSessionsSlice = createSlice({
  name: 'userSessions',
  initialState: {
    selectedUserToChange: {
      user: {
        username: '',
      },
    }
  },
  reducers: {
    setSelectedUserToChange: (state, action) => {
      state.selectedUserToChange = action.payload
    },
  },
})

export const { setSelectedUserToChange } = manageUserSessionsSlice.actions
