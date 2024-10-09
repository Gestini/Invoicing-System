import { createSlice } from '@reduxjs/toolkit'
import { permissions } from '@renderer/pages/Roles/Permissions'

export const manageSidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    views: {},
    isActive: null,
    showAllViews: false,
  },
  reducers: {
    setSidebarState: (state, action) => {
      state.isActive = action.payload
    },
    setViews: (state, action) => {
      state.views = action.payload
      state.showAllViews = action.payload[permissions.admin.permission]
    },
    handleShowAllViews: (state, _) => {
      state.showAllViews = !state.showAllViews
    },
    changePermissionView: (state, action) => {
      const { permission } = action.payload

      if (!(permission in state.views)) return
      state.views[permission] = !state.views[permission]

      if (permission === permissions.admin.permission) {
        state.showAllViews = !state.showAllViews
      }
    }
  },
})

export const { setSidebarState, setViews, changePermissionView, handleShowAllViews } = manageSidebarSlice.actions
