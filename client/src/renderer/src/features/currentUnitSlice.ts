import { createSlice } from '@reduxjs/toolkit'
import { BusinessUnitModel } from '@renderer/interfaces/businessUnit'

export const manageCurrentUnit = createSlice({
  name: 'currentUnit',
  initialState: {} as BusinessUnitModel,
  reducers: {
    setUnit: (_, action) => action.payload,
    editCurrentUnit: (state, action) => {
      const { data } = action.payload
      Object.keys(data).forEach((key) => {
        state[key] = data[key]
      })
    },
  },
})

export const { setUnit, editCurrentUnit } = manageCurrentUnit.actions
