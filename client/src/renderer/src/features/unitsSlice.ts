import { createSlice } from '@reduxjs/toolkit'

export const manageUnits = createSlice({
  name: 'units',
  initialState: {
    data: <any[]>[],
    currentUnitIdEdit: -1,
  },
  reducers: {
    setUnits: (state, action) => {
      state.data = action.payload
    },
    addUnit: (state, action) => {
      state.data.push(action.payload)
    },
    editUnit: (state, action) => {
      const { data, id } = action.payload
      const itemIndex = state.data.findIndex((item) => item.id == id)

      if (itemIndex !== -1) {
        Object.keys(data).forEach((key) => {
          state.data[itemIndex][key] = data[key]
        })
      }
    },
    deleteUnit: (state, action) => {
      const id = action.payload
      const itemIndex = state.data.findIndex((item) => item.id == id)

      if (itemIndex !== -1) {
        state.data.splice(itemIndex, 1)
      }
    },
    setCurrentUnitId: (state, action) => {
      state.currentUnitIdEdit = action.payload
    },
  },
})

export const { setUnits, addUnit, editUnit, deleteUnit, setCurrentUnitId } = manageUnits.actions
