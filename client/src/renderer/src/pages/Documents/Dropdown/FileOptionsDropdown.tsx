import {
  cn,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import { Node } from '@renderer/types/File'
import { deleteFile } from '@renderer/features/fileSlice'
import { useDispatch } from 'react-redux'
import { reqDeleteFile } from '@renderer/api/requests'
import { setCurrentEdit } from '@renderer/features/fileSlice'
import { EditDocumentIcon } from '@renderer/components/Icons/EditDocumentIcon'
import { VerticalDotsIcon } from '@renderer/components/Icons'
import { DeleteDocumentIcon } from '@renderer/components/Icons/DeleteDocumentIcon'
import { modalTypes, useModal } from '@renderer/utils/useModal'

export const FileOptionsDropdown = ({ file }: { file: Node }) => {
  const dispatch = useDispatch()
  const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0'
  const [_, toggleEditDocumentModal] = useModal(modalTypes.editDocumentMoal)

  const handleOpenEditDocumentModal = () => {
    dispatch(setCurrentEdit(file))
    toggleEditDocumentModal()
  }

  const deleteFileAction = () => {
    dispatch(deleteFile(file.id))
    reqDeleteFile(file.id)
  }

  return (
    <Dropdown className='text-c-title bg-c-card'>
      <DropdownTrigger>
        <Button isIconOnly size='sm' variant='light'>
          <VerticalDotsIcon className='text-default-300' />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant='faded' aria-label='Dropdown menu with icons'>
        <DropdownItem
          key='edit'
          className='default-text-color'
          onPress={handleOpenEditDocumentModal}
          startContent={<EditDocumentIcon className={iconClasses} />}
        >
          Editar
        </DropdownItem>
        <DropdownItem
          key='delete'
          className='text-danger'
          color='danger'
          onPress={deleteFileAction}
          startContent={<DeleteDocumentIcon className={cn(iconClasses, 'text-danger')} />}
        >
          Borrar
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
