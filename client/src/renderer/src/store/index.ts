import { manageUnits } from '@renderer/features/unitsSlice'
import { manageRoles } from '@renderer/features/roleSlice'
import { newInvoicing } from '@renderer/features/newInvoicing'
import { configureStore } from '@reduxjs/toolkit'
import { manageWarehouse } from '@renderer/features/warehouseSlice'
import { manageUserSlice } from '@renderer/features/userSlice'
import { manageTableSlice } from '@renderer/features/tableSlice'
import { manageCurrentUnit } from '@renderer/features/currentUnitSlice'
import { manageModalsSlice } from '@renderer/features/currentModal'
import { manageCurrentTheme } from '@renderer/features/currentTheme'
import { manageUserSessionsSlice } from '@renderer/features/userSessions'

const store: any = configureStore({
  reducer: {
    user: manageUserSlice.reducer,
    table: manageTableSlice.reducer,
    units: manageUnits.reducer,
    roles: manageRoles.reducer,
    modals: manageModalsSlice.reducer,
    warehouse: manageWarehouse.reducer,
    currentUnit: manageCurrentUnit.reducer,
    userSession: manageUserSessionsSlice.reducer,
    newInvoicing: newInvoicing.reducer,
    currentTheme: manageCurrentTheme.reducer,
  },
})

export default store
