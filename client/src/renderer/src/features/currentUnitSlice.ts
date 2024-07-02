import { createSlice } from '@reduxjs/toolkit'

export const manageCurrentUnit = createSlice({
    name: 'currentUnit',
    initialState: {
    },

    reducers: {
        setUnit: (state, action) => {
            state = action.payload
        },
    },
})

export const { setUnit } = manageCurrentUnit.actions
