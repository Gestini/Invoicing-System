import { createSlice } from '@reduxjs/toolkit'
import { CompanyModel } from '@renderer/interfaces/company'

export const manageCurrentCompany = createSlice({
  name: 'currentCompany',
  initialState: {} as CompanyModel,
  reducers: {
    setCompany: (_, action) => action.payload,
  },
})

export const { setCompany } = manageCurrentCompany.actions
