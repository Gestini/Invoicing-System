import { createSlice } from '@reduxjs/toolkit'
import { RoleModel } from '@renderer/interfaces/role'

export const manageRoles = createSlice({
  name: 'roles',
  initialState: {
    data: <RoleModel[]>[],
    currentRoleIdEdit: -1,
  },
  reducers: {
    setRoles: (state, action) => {
      state.data = action.payload
    },
    addRole: (state, action) => {
      state.data.push(action.payload)
    },
    editRole: (state, action) => {
      const { data, id } = action.payload
      const itemIndex = state.data.findIndex((item) => item.id == id)

      if (itemIndex !== -1) {
        Object.keys(data).forEach((key) => {
          state.data[itemIndex][key] = data[key]
        })
      }
    },
    deleteRole: (state, action) => {
      const id = action.payload
      const itemIndex = state.data.findIndex((item) => item.id == id)

      if (itemIndex !== -1) {
        state.data.splice(itemIndex, 1)
      }
    },
    setCurrentRoleId: (state, action) => {
      state.currentRoleIdEdit = action.payload
    },
    addPermissions: (state, action) => {
      const data = action.payload
      const itemIndex = state.data.findIndex((item) => item.id == state.currentRoleIdEdit)
      if (itemIndex == -1) return

      if (itemIndex !== -1) {
        state.data[itemIndex].permissions.push(data)
      }
    },
    removePermission: (state, action) => {
      const permissionId = action.payload
      const itemIndex = state.data.findIndex((item) => item.id == state.currentRoleIdEdit)
      if (itemIndex == -1) return

      const permissionIndex = state.data[itemIndex].permissions.findIndex(
        (permission) => permission.id == permissionId,
      )
      if (permissionIndex == -1) return

      state.data[itemIndex].permissions.splice(permissionIndex, 1)
    },
    setInitialUsersRole: (state, action) => {
      const { users } = action.payload
      const itemIndex = state.data.findIndex((item) => item.id == state.currentRoleIdEdit)

      if (itemIndex !== -1) {
        state.data[itemIndex].users = users
      }
    },
    addRoleUser: (state, action) => {
      const data = action.payload
      const itemIndex = state.data.findIndex((item) => item.id == state.currentRoleIdEdit)
      if (itemIndex == -1) return

      if (itemIndex !== -1) {
        state.data[itemIndex].users.push(data)
      }
    },
    removeRoleUser: (state, action) => {
      const userId = action.payload
      const itemIndex = state.data.findIndex((item) => item.id == state.currentRoleIdEdit)
      if (itemIndex == -1) return

      const userIndex = state.data[itemIndex].users.findIndex((user) => user.id == userId)
      if (userIndex == -1) return

      state.data[itemIndex].users.splice(userIndex, 1)
    },
  },
})

export const {
  addRole,
  setRoles,
  editRole,
  deleteRole,
  addRoleUser,
  removeRoleUser,
  addPermissions,
  removePermission,
  setCurrentRoleId,
  setInitialUsersRole,
} = manageRoles.actions
