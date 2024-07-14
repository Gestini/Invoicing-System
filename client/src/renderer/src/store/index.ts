import { manageUnits } from '@renderer/features/unitsSlice'
import { newInvoicing } from '@renderer/features/newInvoicing'
import { configureStore } from '@reduxjs/toolkit'
import { manageUserSlice } from '@renderer/features/userSlice'
import { manageTableSlice } from '@renderer/features/tableSlice'
import { manageCurrentUnit } from '@renderer/features/currentUnitSlice'
import { manageCurrentTheme } from '@renderer/features/currentTheme'
import { manageStock } from '@renderer/features/currentStockSlice'

const store = configureStore({
  reducer: {
    user: manageUserSlice.reducer,
    table: manageTableSlice.reducer,
    units: manageUnits.reducer,
    currentUnit: manageCurrentUnit.reducer,
    newInvoicing: newInvoicing.reducer,
    currentTheme: manageCurrentTheme.reducer,
    currentStock: manageStock.reducer,
  },
})

export default store
