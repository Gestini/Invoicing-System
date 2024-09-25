import { createSlice } from '@reduxjs/toolkit'

export const manageModalsSlice = createSlice({
  name: 'currentModal',
  initialState: {
    modals: {
      LogInAsModal: false,
      SettingsModal: false,
      AddNewAccountModal: false,
    },
  },
  reducers: {
    toggleModal: (state, action) => {
      const modalName = action.payload
      state.modals[modalName] = !state.modals[modalName]
    },
  },
})

export const { toggleModal } = manageModalsSlice.actions
