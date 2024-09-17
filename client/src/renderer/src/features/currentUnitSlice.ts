import { createSlice } from '@reduxjs/toolkit'

interface unitInterface {
  id: number
  name: string
  description: string
  ecommerce: boolean
  link: string
  image: string
  plan: any
  owner: any
  company: any
}

export const manageCurrentUnit = createSlice({
  name: 'currentUnit',
  initialState: {} as unitInterface,
  reducers: {
    setUnit: (_, action) => action.payload,
    editCurrentUnit: (state, action) => {
      const { data } = action.payload
      Object.keys(data).forEach((key) => {
        state[key] = data[key]
      })
    },
  },
})

export const { setUnit, editCurrentUnit } = manageCurrentUnit.actions
