import { createSlice } from '@reduxjs/toolkit'

export const manageCompanies = createSlice({
  name: 'companies',
  initialState: {
    data: <any[]>[],
    currentUnitIdEdit: -1,
  },
  reducers: {
    setCompanies: (state, action) => {
      state.data = action.payload
    },
    addCompany: (state, action) => {
      state.data.push(action.payload)
    },
    editCompany: (state, action) => {
      const { data, id } = action.payload
      const itemIndex = state.data.findIndex((item) => item.id == id)

      if (itemIndex !== -1) {
        Object.keys(data).forEach((key) => {
          state.data[itemIndex][key] = data[key]
        })
      }
    },
    deleteCompany: (state, action) => {
      const id = action.payload
      const itemIndex = state.data.findIndex((item) => item.id == id)

      if (itemIndex !== -1) {
        state.data.splice(itemIndex, 1)
      }
    },
    setCurrentCompanyId: (state, action) => {
      state.currentUnitIdEdit = action.payload
    },
  },
})

export const { setCompanies, addCompany, deleteCompany, editCompany, setCurrentCompanyId } = manageCompanies.actions
