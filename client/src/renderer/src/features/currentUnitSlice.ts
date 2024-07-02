import { createSlice } from '@reduxjs/toolkit'

export const manageCurrentUnit = createSlice({
  name: 'currentUnit',
  initialState: {},
  reducers: {
    setUnit: (_, action) => action.payload,
  },
})

export const { setUnit } = manageCurrentUnit.actions
