import { createSlice } from '@reduxjs/toolkit'
import { WarehouseModel } from '@renderer/interfaces/warehouse'

export const manageWarehouse = createSlice({
  name: 'wareHouse',
  initialState: {
    data: <WarehouseModel[]>[],
    currentWarehouseId: '',
  },
  reducers: {
    setWarehouses: (state, action) => {
      state.data = action.payload
    },
    addWarehouse: (state, action) => {
      state.data.push(action.payload)
    },
    editWarehouse: (state, action) => {
      const { data, id } = action.payload
      const itemIndex = state.data.findIndex((item) => item.id == id)

      if (itemIndex !== -1) {
        Object.keys(data).forEach((key) => {
          state.data[itemIndex][key] = data[key]
        })
      }
    },
    deleteWarehouse: (state, action) => {
      const id = action.payload
      const itemIndex = state.data.findIndex((item) => item.id == id)

      if (itemIndex !== -1) {
        state.data.splice(itemIndex, 1)
      }
    },
    setCurrentWarehouseId: (state, action) => {
      state.currentWarehouseId = String(action.payload)
    },
  },
})

export const {
  addWarehouse,
  setWarehouses,
  editWarehouse,
  deleteWarehouse,
  setCurrentWarehouseId,
} = manageWarehouse.actions
