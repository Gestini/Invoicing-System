import { configureStore } from '@reduxjs/toolkit'
import { manageUserSlice } from '@renderer/features/userSlice'
import { manageTableSlice } from '@renderer/features/tableSlice'
import { manageUnits } from '@renderer/features/unitsSlice'

const store = configureStore({
  reducer: {
    user: manageUserSlice.reducer,
    table: manageTableSlice.reducer,
    units: manageUnits.reducer,
  },
})

export default store
