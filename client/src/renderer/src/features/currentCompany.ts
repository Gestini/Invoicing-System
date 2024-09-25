import { createSlice } from '@reduxjs/toolkit'

export const manageCurrentCompany = createSlice({
  name: 'currentCompany',
  initialState: {} as any,
  reducers: {
    setCompany: (_, action) => action.payload,
  },
})

export const { setCompany } = manageCurrentCompany.actions
