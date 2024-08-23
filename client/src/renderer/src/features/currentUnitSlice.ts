import { createSlice } from '@reduxjs/toolkit'

export const manageCurrentUnit = createSlice({
  name: 'currentUnit',
  initialState: null,
  reducers: {
    setUnit: (_, action) => action.payload,
  },
})

export const { setUnit } = manageCurrentUnit.actions
