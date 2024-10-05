import { RootState } from '@renderer/store'
import { viewTypes } from '@renderer/features/fileSlice'
import { ChangeView } from './Components/ChangeView'
import { useSelector } from 'react-redux'
import { DocumentsGrid } from './Components/DocumentsGrid'
import { PathDirection } from './Components/PathDirection'
import { DocumentsTable } from './Components/DocumentsTable'
import { EditDocumentModal } from './Modals/EditDocumentModal'
import { AddNewFileDropdown } from './Dropdown/AddNewFileDropdown'
import { CreateDocumentModal } from './Modals/CreateDocumentModal'

export const DocumentManager = () => {
  const { viewType } = useSelector((state: RootState) => state.documents)

  return (
    <div className='flex flex-col gap-4'>
      <div className='text-c-primary rounded-md'>{<PathDirection />}</div>
      <div className='flex justify-between items-center'>
        <AddNewFileDropdown />
        <CreateDocumentModal />
        <ChangeView />
      </div>
      <div>{viewType === viewTypes.squere ? <DocumentsGrid /> : <DocumentsTable />}</div>
      <EditDocumentModal />
    </div>
  )
}
