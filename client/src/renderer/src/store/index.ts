import { tabSlice } from '@renderer/features/tabSlice'
import { manageUnits } from '@renderer/features/unitsSlice'
import { configureStore } from '@reduxjs/toolkit'
import { manageUserSlice } from '@renderer/features/userSlice'
import { manageTableSlice } from '@renderer/features/tableSlice'
import { manageCurrentUnit } from '@renderer/features/currentUnitSlice'
import { manageInvoicingSlice } from '@renderer/features/invoicingSlice'

const store = configureStore({
  reducer: {
    tabs: tabSlice.reducer,
    user: manageUserSlice.reducer,
    table: manageTableSlice.reducer,
    units: manageUnits.reducer,
    invoicing: manageInvoicingSlice.reducer,
    currentUnit: manageCurrentUnit.reducer,
  },
})

export default store
