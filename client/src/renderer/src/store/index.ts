import { manageUnits } from '@renderer/features/unitsSlice'
import { manageRoles } from '@renderer/features/roleSlice'
import { newInvoicing } from '@renderer/features/newInvoicing'
import { manageWarehouse } from '@renderer/features/warehouseSlice'
import { manageUserSlice } from '@renderer/features/userSlice'
import { manageTableSlice } from '@renderer/features/tableSlice'
import { manageCurrentUnit } from '@renderer/features/currentUnitSlice'
import { manageModalsSlice } from '@renderer/features/currentModal'
import { manageCurrentTheme } from '@renderer/features/currentTheme'
import { manageUserSessionsSlice } from '@renderer/features/userSessions'
import { configureStore, combineReducers } from '@reduxjs/toolkit'

// Reducers de usuario
const userReducers = combineReducers({
  user: manageUserSlice.reducer,
  userSession: manageUserSessionsSlice.reducer,
  currentTheme: manageCurrentTheme.reducer,
})

// Reducers de unidad
const unitReducers = combineReducers({
  table: manageTableSlice.reducer,
  roles: manageRoles.reducer,
  modals: manageModalsSlice.reducer,
  warehouse: manageWarehouse.reducer,
  newInvoicing: newInvoicing.reducer,
})

const appReducer = combineReducers({
  user: userReducers,
  unit: unitReducers,
  units: manageUnits.reducer,
  currentUnit: manageCurrentUnit.reducer,
})

const rootReducer = (state, action) => {
  switch (action.type) {
    case 'RESET_STATE':
      return appReducer(undefined, action)

    case 'RESET_USER_STATE':
      return appReducer({ ...state, user: undefined }, action)

    case 'RESET_UNIT_STATE':
      return appReducer({ ...state, unit: undefined }, action)

    default:
      return appReducer(state, action)
  }
}

const store: any = configureStore({
  reducer: rootReducer,
})

export default store
