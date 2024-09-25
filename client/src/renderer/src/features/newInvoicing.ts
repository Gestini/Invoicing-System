import { totalApply } from '@renderer/pages/InvoicingTable/ViewProducts/data'
import { createSlice } from '@reduxjs/toolkit'
import { ProductModel } from '@renderer/interfaces/product'

interface TotalApplyItem {
  label: string
  name: string
  value: number
  apply: boolean
  format: string
}

export interface Tab {
  id: string
  total: number
  title: string
  formData: Record<string, any>
  products: ProductModel[]
  totalApply: TotalApplyItem[]
}

export interface NewInvoicingState {
  tabs: Tab[]
  currentTabId: string
}

const initialState = {
  tabs: [
    {
      id: '1',
      total: 0.0,
      title: 'Pestaña #1',
      formData: {},
      products: [],
      totalApply: totalApply as TotalApplyItem[],
    },
    {
      id: '2',
      total: 0.0,
      title: 'Pestaña #2',
      formData: {},
      products: [],
      totalApply: totalApply as TotalApplyItem[],
    },
    {
      id: '3',
      total: 0.0,
      title: 'Pestaña #3',
      formData: {},
      products: [],
      totalApply: totalApply as TotalApplyItem[],
    },
  ],
  currentTabId: '1',
}

export const newInvoicing = createSlice({
  name: 'newInvoicing',
  initialState: initialState as NewInvoicingState,
  reducers: {
    setInvoiceData: (state, action) => {
      return { ...state, ...action.payload }
    },
    clearInvoiceData: () => initialState,
    addTab: (state) => {
      const obj: Tab = {
        id: new Date().getTime().toString(),
        total: 0.0,
        title: `Pestaña #${state.tabs.length + 1}`,
        formData: {},
        products: [],
        totalApply: totalApply as TotalApplyItem[],
      }
      state.tabs.push(obj)
      state.currentTabId = obj.id
    },
    closeTab: (state, action) => {
      const id = action.payload

      const index = state.tabs.findIndex((item) => item.id === id)
      if (index === -1 || state.tabs.length === 1) return

      if (state.currentTabId !== id && index === state.tabs.length - 1) {
        state.currentTabId = state.currentTabId
      } else if (id === state.tabs[state.tabs.length - 1].id) {
        state.currentTabId = state.tabs[state.tabs.length - 2].id
      } else if (id !== state.tabs[state.tabs.length - 1].id && id !== state.currentTabId) {
        state.currentTabId = state.currentTabId
      } else {
        state.currentTabId = state.tabs[state.tabs.length - 1].id
      }

      state.tabs.splice(index, 1)
    },
    setCurrentTabId: (state, action) => {
      state.currentTabId = action.payload
    },
    setTotal: (state) => {
      const tabIndex = state.tabs.findIndex((item) => item.id === state.currentTabId)
      if (tabIndex === -1) return

      const tab = state.tabs[tabIndex]
      let subtotal = tab.products.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0,
      )
      let applyAmount = 0.0

      tab.totalApply.forEach((item) => {
        if (item.apply) {
          if (item.format === 'percentage') {
            applyAmount += (subtotal * item.value) / 100
          } else {
            applyAmount += item.value
          }
        }
      })

      tab.total = subtotal - applyAmount
    },
    editTotal: (state, action) => {
      const { name, value } = action.payload

      const tabIndex = state.tabs.findIndex((item) => item.id === state.currentTabId)
      if (tabIndex === -1) return

      const index = state.tabs[tabIndex].totalApply.findIndex((item) => item.name === name)
      if (index === -1) return

      state.tabs[tabIndex].totalApply[index].value = value
    },
    handleTotal: (state, action) => {
      const name = action.payload

      const tabIndex = state.tabs.findIndex((item) => item.id === state.currentTabId)
      if (tabIndex === -1) return

      const index = state.tabs[tabIndex].totalApply.findIndex((item) => item.name === name)
      if (index === -1) return

      state.tabs[tabIndex].totalApply[index].apply = !state.tabs[tabIndex].totalApply[index].apply
    },
    addProduct: (state, action) => {
      const { product } = action.payload

      const tabIndex = state.tabs.findIndex((item) => item.id === state.currentTabId)
      if (tabIndex === -1) return

      state.tabs[tabIndex].products.push({ ...product, quantity: 1, price: product.cardPrice })
    },
    deleteProduct: (state, action) => {
      const { id } = action.payload

      const tabIndex = state.tabs.findIndex((item) => item.id === state.currentTabId)
      if (tabIndex === -1) return

      const productIndex = state.tabs[tabIndex].products.findIndex((item) => item.id === id)
      if (productIndex === -1) return

      state.tabs[tabIndex].products.splice(productIndex, 1)
    },
    editAmount: (state, action) => {
      const { id, handleType } = action.payload

      const tabIndex = state.tabs.findIndex((item) => item.id === state.currentTabId)
      if (tabIndex === -1) return

      const productIndex = state.tabs[tabIndex].products.findIndex((item) => item.id === id)
      if (productIndex === -1) return

      if (handleType === 'sum') {
        state.tabs[tabIndex].products[productIndex].quantity += 1
      } else {
        if (state.tabs[tabIndex].products[productIndex].quantity === 0) return
        state.tabs[tabIndex].products[productIndex].quantity -= 1
      }
    },
    setFormData: (state, action) => {
      const { name, value } = action.payload

      const tabIndex = state.tabs.findIndex((item) => item.id === state.currentTabId)
      if (tabIndex === -1) return

      if (name == 'client')
        value.trim() !== ''
          ? (state.tabs[tabIndex].title = value)
          : (state.tabs[tabIndex].title = 'Pestaña')

      state.tabs[tabIndex].formData = {
        ...state.tabs[tabIndex].formData,
        [name]: value,
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
  setFormData,
  deleteProduct,
  setInvoiceData,
  setCurrentTabId,
  clearInvoiceData,
} = newInvoicing.actions

export default newInvoicing.reducer
