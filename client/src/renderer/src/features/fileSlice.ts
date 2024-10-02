import { createSlice } from '@reduxjs/toolkit'
import { Node } from '@renderer/types/File'

export const viewTypes = Object.freeze({
  table: 'DOCUMENTS_TABLE_MODE',
  squere: 'DOCUMENTS_SQUARE_MODE',
} as const)

interface initialStateInterface {
  data: Node[]
  viewType: ViewType
  currentPath: Node | null
  currentEdit: Node | null
}

export type ViewType = (typeof viewTypes)[keyof typeof viewTypes]

export const manageDocuments = createSlice({
  name: 'file',
  initialState: {
    data: [],
    viewType: viewTypes.table,
    currentPath: null,
    currentEdit: null,
  } as initialStateInterface,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    addFile: (state, action) => {
      state.data.push(action.payload);
    },
    setCurrentEdit: (state, action) => {
      state.currentEdit = action.payload
    },
    deleteFile: (state, action) => {
      const fileId = action.payload
      const itemIndex = state.data.findIndex((item) => item.id == fileId)

      if (itemIndex !== -1) {
        state.data.splice(itemIndex, 1)
      }
    },
    editFile: (state, action) => {
      const { data, fileId } = action.payload
      const itemIndex = state.data.findIndex((item) => item.id == fileId)

      if (itemIndex !== -1) {
        Object.keys(data).forEach((key) => {
          state.data[itemIndex][key] = data[key]
        })
      }
    },
    changeView: (state, action) => {
      state.viewType = action.payload
    },
    setCurrentPath: (state, action) => {
      state.currentPath = action.payload;
    },
  },
});

export const { setData, addFile, setCurrentPath, setCurrentEdit, editFile, deleteFile, changeView } = manageDocuments.actions;

export default manageDocuments.reducer;
