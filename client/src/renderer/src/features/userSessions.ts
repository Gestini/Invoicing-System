import { createSlice } from '@reduxjs/toolkit'

interface sesionList {
  token: string
  userId: number
}

export const manageUserSessionsSlice = createSlice({
  name: 'userSessions',
  initialState: {
    selectedUserToChange: {
      user: {
        username: '',
      },
    },
    list: <sesionList[]>[]
  },
  reducers: {
    setSelectedUserToChange: (state, action) => {
      state.selectedUserToChange = action.payload
    },
    addSession: (state, action) => {
      const { userId } = action.payload

      const userSession = state.list.find((session) => session.userId == userId)
      if (userSession) return

      state.list.push(action.payload)
    },
  },
})

export const { setSelectedUserToChange, addSession } = manageUserSessionsSlice.actions
