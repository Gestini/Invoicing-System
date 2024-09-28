import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Node } from '@renderer/types/File'

interface DocumentState {
  data: Node[];
  currentFolder: Node | null;
  folderHistory: Node[];
}

const initialState: DocumentState = {
  data: [],
  currentFolder: null,
  folderHistory: [],
};

export const manageDocuments = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<Node[]>) => {
      state.data = action.payload;
    },
    setCurrentFolder: (state, action: PayloadAction<Node | null>) => {
      state.currentFolder = action.payload;
    },
    addDocument: (state, action: PayloadAction<Node>) => {
      if (state.currentFolder) {
        state.data = updateNodeById(state.data, state.currentFolder.id, action.payload);
      } else {
        state.data.push(action.payload);
      }
    },
    setFolderHistory: (state, action: PayloadAction<Node[]>) => {
      state.folderHistory = action.payload;
    },
    updateNodeById: (state, action: PayloadAction<{ parentId: number; newNode: Node }>) => {
      state.data = updateNodeById(state.data, action.payload.parentId, action.payload.newNode);
    }
  },
});

export const { setData, setCurrentFolder, addDocument, setFolderHistory } = manageDocuments.actions;

export default manageDocuments.reducer;

// Helper function to update a node
function updateNodeById(data: Node[], parentId: number, newNode: Node): Node[] {
  return data.map(node => {
    if (node.id === parentId) {
      return { ...node, children: [...(node.children || []), newNode] };
    }
    if (node.children) {
      return { ...node, children: updateNodeById(node.children, parentId, newNode) };
    }
    return node;
  });
}
