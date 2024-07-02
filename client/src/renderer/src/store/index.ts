import { manageUnits } from '@renderer/features/unitsSlice'
import { configureStore } from '@reduxjs/toolkit'
import { manageUserSlice } from '@renderer/features/userSlice'
import { manageTableSlice } from '@renderer/features/tableSlice'
import { manageInvoicingSlice } from '@renderer/features/invoicingSlice'
import { manageCurrentUnit } from '@renderer/features/currentUnitSlice'

const store = configureStore({
  reducer: {
    user: manageUserSlice.reducer,
    table: manageTableSlice.reducer,
    units: manageUnits.reducer,
    currentUnit: manageCurrentUnit.reducer,
    invoicing: manageInvoicingSlice.reducer,
  },
})

export default store
