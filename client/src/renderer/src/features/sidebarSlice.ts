import { createSlice } from '@reduxjs/toolkit'

export interface sidebarStateType {
  isActive: boolean
}

export const manageSidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    isActive: false
  } as sidebarStateType,
  reducers: {
    setSidebarState: (state, action) => {
      state.isActive = action.payload
    }
  },
})

export const { setSidebarState } = manageSidebarSlice.actions
