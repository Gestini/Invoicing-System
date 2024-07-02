import { createSlice } from '@reduxjs/toolkit'
import { products } from '@renderer/pages/InvoicingTable/ViewProducts/data'

export const manageInvoicingSlice = createSlice({
  name: 'invoicing',
  initialState: {
    data: <any[]>products,
    total: 0.0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.data.push(action.payload)
    },
    setTotal: (state, _) => {
      let total = 0.0
      for (let i = 0; i < state.data.length; i++) {
        total += state.data[i].price * state.data[i].quantity
      }
      state.total = total
    },
    deleteProduct: (state, action) => {
      const { id } = action.payload
      const itemIndex = state.data.findIndex((item) => item.id == id)

      if (itemIndex !== -1) {
        state.data.splice(itemIndex, 1)
      }
    },
    editAmount: (state, action) => {
      const { id, handleType } = action.payload

      const productIndex = state.data.findIndex((item) => item.id == id)
      if (productIndex == -1) return

      if (handleType == 'sum') {
        state.data[productIndex].quantity += 1
      } else {
        if (state.data[productIndex].quantity == 0) return
        state.data[productIndex].quantity -= 1
      }
    },
  },
})

export const { deleteProduct, addProduct, editAmount, setTotal } = manageInvoicingSlice.actions
