import { createSlice } from '@reduxjs/toolkit'

export const tabSlice = createSlice({
  name: 'tab',
  initialState: {
    data: <any[]>[
      {
        title: 'Pestaña #1',
        id: '1',
      },
      {
        title: 'Pestaña #2',
        id: '2',
      },
      {
        title: 'Pestaña #3',
        id: '3',
      },
    ],
    currentTabId: '',
  },
  reducers: {
    addTab: (state, _) => {
      const obj = {
        title: 'Pestaña #' + (state.data.length + 1),
        id: new Date().getTime().toString(),
      }
      state.data.push(obj)
      state.currentTabId = obj.id
    },
    closeTab: (state, action) => {
      const id = action.payload

      const index = state.data.findIndex((item) => item.id == id)
      if (index == -1) return
      if (state.data.length == 1) return

      state.data.splice(index, 1)
    },
    setCurrentTabId: (state, action) => {
      state.currentTabId = action.payload
    },
  },
})

export const { addTab, closeTab, setCurrentTabId } = tabSlice.actions
