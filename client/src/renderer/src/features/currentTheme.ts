import { createSlice } from '@reduxjs/toolkit'

export const manageCurrentTheme = createSlice({
  name: 'currentTheme',
  initialState: null as null | any,
  reducers: {
    setCurrentTheme: (_, action) => action.payload,
  },
})

export const { setCurrentTheme } = manageCurrentTheme.actions
