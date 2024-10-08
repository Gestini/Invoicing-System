import React from 'react'
import { DropdownItemInteface } from './ActionDropdown'

interface statusOptions {
  uid: string
  name: string
}

interface Column {
  uid: string
  name: string
  sortable?: boolean
}

interface ColmnsData {
  columns: Column[]
  statusOptions: statusOptions[]
  InitialVisibleColumns: string[]
}

interface TableActions {
  edit?: (id: any, data: any) => Promise<void>
  create?: (data: any) => Promise<void>
  delete: (id: number | string) => Promise<void>
}

export interface AppTableInterface {
  inputCell?: boolean | undefined
  columnsData: ColmnsData
  tableActions?: TableActions | undefined
  addItemModal?: React.ReactNode | undefined
  editItemModal?: React.ReactNode | undefined
  dropdownAction?: DropdownItemInteface[] | undefined
}
