import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Node } from '@renderer/types/File';

interface DocumentState {
  data: Node[];
  currentPath: string[]; // Cambia a un array de strings
}

const initialState: DocumentState = {
  data: [],
  currentPath: ['General'],
};

export const manageDocuments = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Node[]>) => {
      state.data = action.payload;
    },
    addDocument: (state, action: PayloadAction<Node>) => {
      state.data.push(action.payload);
    },
    addFolder: (state, action: PayloadAction<string>) => {
      const newFolder: Node = {
        id: Date.now(),
        name: action.payload,
        path: `${state.currentPath.join('/')}/${action.payload}`, // Cambia para usar join
        folder: true,
      };
      state.data.push(newFolder);
    },
    setCurrentPath: (state, action: PayloadAction<string[]>) => { // Cambia a un array de strings
      state.currentPath = action.payload;
    },
  },
});

export const { setData, addDocument, addFolder, setCurrentPath } = manageDocuments.actions;

export default manageDocuments.reducer;
