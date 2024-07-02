import { configureStore } from '@reduxjs/toolkit'
import { manageUserSlice } from '@renderer/features/userSlice'
import { manageTableSlice } from '@renderer/features/tableSlice'
import { manageInvoicingSlice } from '@renderer/features/invoicingSlice'

const store = configureStore({
  reducer: {
    user: manageUserSlice.reducer,
    table: manageTableSlice.reducer,
    invoicing: manageInvoicingSlice.reducer,
  },
})

export default store
