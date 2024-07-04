import { totalApply } from '@renderer/pages/InvoicingTable/ViewProducts/data'
import { createSlice } from '@reduxjs/toolkit'

export const newInvoicing = createSlice({
  name: 'newInvoicing',
  initialState: {
    tabs: <any[]>[
      {
        id: '1',
        total: 0.0,
        title: 'Pestaña #1',
        products: <any[]>[],
        totalApply,
      },
      {
        id: '2',
        total: 0.0,
        title: 'Pestaña #2',
        products: <any[]>[],
        totalApply,
      },
      {
        id: '3',
        total: 0.0,
        title: 'Pestaña #3',
        products: <any[]>[],
        totalApply,
      },
    ],
    currentTabId: '1',
  },
  reducers: {
    addTab: (state, _) => {
      const obj = {
        id: new Date().getTime().toString(),
        total: 0.0,
        title: 'Pestaña #' + (state.tabs.length + 1),
        products: <any[]>[],
        totalApply,
      }
      state.tabs.push(obj)
      state.currentTabId = obj.id
    },
    closeTab: (state, action) => {
      const id = action.payload

      const index = state.tabs.findIndex((item) => item.id == id)
      if (index == -1) return
      if (state.tabs.length == 1) return

      /* La pestaña borrada no es el seleccionado y tampoco el ultimo */
      if (state.currentTabId !== id && index == state.tabs.length - 1) {
        state.currentTabId = state.currentTabId
      } else if (id == state.tabs[state.tabs.length - 1].id) {
        /* La pestaña borrada es la ultima */
        state.currentTabId = state.tabs[state.tabs.length - 2].id
      } else if (id !== state.tabs[state.tabs.length - 1].id && id !== state.currentTabId) {
        /* La pestaba borrada no es la ultima y tampoco la seleccionada */
        state.currentTabId = state.currentTabId
      } else {
        state.currentTabId = state.tabs[state.tabs.length - 1].id
      }

      state.tabs.splice(index, 1)
    },
    setCurrentTabId: (state, action) => {
      state.currentTabId = action.payload
    },
    setTotal: (state, _) => {
      let subtotal = 0.0
      let applyAmount = 0.0

      /* Obtener pestaña actual */
      const tabIndex = state.tabs.findIndex((item) => item.id == state.currentTabId)
      if (tabIndex == -1) return

      /* Filtrar las condiciones establecidas para el total */
      const apply = state.tabs[tabIndex].totalApply.filter((item: any) => item.apply)

      /* Sumatoria de las condiciones */
      for (let i = 0; i < apply.length; i++) {
        applyAmount += apply[i].value || 0.0
      }

      /* Sumatoria del total */
      for (let i = 0; i < state.tabs[tabIndex].products.length; i++) {
        subtotal +=
          state.tabs[tabIndex].products[i].price * state.tabs[tabIndex].products[i].quantity
      }

      state.tabs[tabIndex].total = subtotal - applyAmount
    },
    editTotal: (state, action) => {
      const { name, value } = action.payload

      const tabIndex = state.tabs.findIndex((item) => item.id == state.currentTabId)
      if (tabIndex == -1) return

      const index = state.tabs[tabIndex].totalApply.findIndex((item) => item.name == name)
      if (index == -1) return

      state.tabs[tabIndex].totalApply[index].value = value
    },
    handleTotal: (state, action) => {
      const name = action.payload

      const tabIndex = state.tabs.findIndex((item) => item.id == state.currentTabId)
      if (tabIndex == -1) return

      const index = state.tabs[tabIndex].totalApply.findIndex((item) => item.name == name)
      if (index == -1) return

      state.tabs[tabIndex].totalApply[index].apply = !state.tabs[tabIndex].totalApply[index].apply
    },
    addProduct: (state, action) => {
      const { product } = action.payload

      const tabIndex = state.tabs.findIndex((item) => item.id == state.currentTabId)
      if (tabIndex == -1) return

      state.tabs[tabIndex].products.push(product)
    },
    deleteProduct: (state, action) => {
      const { id } = action.payload

      const tabIndex = state.tabs.findIndex((item) => item.id == state.currentTabId)
      if (tabIndex == -1) return

      const productIndex = state.tabs[tabIndex].products.findIndex((item) => item.id == id)
      if (productIndex == -1) return

      state.tabs[tabIndex].products.splice(productIndex, 1)
    },
    editAmount: (state, action) => {
      const { id, handleType } = action.payload

      const tabIndex = state.tabs.findIndex((item) => item.id == state.currentTabId)
      if (tabIndex == -1) return

      const productIndex = state.tabs[tabIndex].products.findIndex((item) => item.id == id)
      if (productIndex == -1) return

      if (handleType == 'sum') {
        state.tabs[tabIndex].products[productIndex].quantity += 1
      } else {
        if (state.tabs[tabIndex].products[productIndex].quantity == 0) return
        state.tabs[tabIndex].products[productIndex].quantity -= 1
      }
    },
  },
})

export const {
  addTab,
  closeTab,
  setTotal,
  editTotal,
  addProduct,
  editAmount,
  handleTotal,
  deleteProduct,
  setCurrentTabId,
} = newInvoicing.actions
