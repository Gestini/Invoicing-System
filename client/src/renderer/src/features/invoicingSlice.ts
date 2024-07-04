import { products } from '@renderer/pages/InvoicingTable/ViewProducts/data'
import { totalApply } from '@renderer/pages/InvoicingTable/ViewProducts/data'
import { createSlice } from '@reduxjs/toolkit'

export const manageInvoicingSlice = createSlice({
  name: 'invoicing',
  initialState: {
    data: <any[]>products,
    total: 0.0,
    totalApply,
  },
  reducers: {
    addProduct: (state, action) => {
      state.data.push(action.payload)
    },
    setTotal: (state, _) => {
      let total = 0.0
      let applyAmount = 0.0

      const apply = state.totalApply.filter((item) => item.apply)

      for (let i = 0; i < apply.length; i++) {
        applyAmount += apply[i].value || 0.0
      }

      for (let i = 0; i < state.data.length; i++) {
        total += state.data[i].price * state.data[i].quantity
      }

      state.total = total - applyAmount
    },
    editTotal: (state, action) => {
      const { name, value } = action.payload

      const index = state.totalApply.findIndex((item) => item.name == name)
      if (index == -1) return

      state.totalApply[index].value = value
    },
    handleTotal: (state, action) => {
      const name = action.payload

      const index = state.totalApply.findIndex((item) => item.name == name)
      if (index == -1) return

      state.totalApply[index].apply = !state.totalApply[index].apply
    },
    deleteProduct: (state, action) => {
      const { id } = action.payload
      const itemIndex = state.data.findIndex((item) => item.id == id)

      if (itemIndex !== -1) state.data.splice(itemIndex, 1)
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

export const { deleteProduct, addProduct, editAmount, setTotal, editTotal, handleTotal } =
  manageInvoicingSlice.actions
