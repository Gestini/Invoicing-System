import { createSlice } from '@reduxjs/toolkit'

export const manageTableSlice = createSlice({
  name: 'table',
  initialState: {
    data: <any[]>[],
    currentItemIdEdit: -1,
  },
  reducers: {
    setData: (state, action) => {
      state.data = action.payload
    },
    addItem: (state, action) => {
      state.data.push(action.payload)
    },
    editItem: (state, action) => {
      const { data, id } = action.payload
      const itemIndex = state.data.findIndex((item) => item.id == id)

      if (itemIndex !== -1) {
        Object.keys(data).forEach((key) => {
          state.data[itemIndex][key] = data[key]
        })
      }
    },
    deleteItem: (state, action) => {
      const id = action.payload
      const itemIndex = state.data.findIndex((item) => item.id == id)

      if (itemIndex !== -1) {
        state.data.splice(itemIndex, 1)
      }
    },
    setCurrentItemId: (state, action) => {
      state.currentItemIdEdit = action.payload
    },
  },
})

export const { setData, addItem, editItem, deleteItem, setCurrentItemId } = manageTableSlice.actions
