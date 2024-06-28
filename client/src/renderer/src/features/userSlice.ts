import { createSlice } from '@reduxjs/toolkit'

export const manageUserSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setMyUser: (_, action) => action.payload,
  },
})

export const { setMyUser } = manageUserSlice.actions
