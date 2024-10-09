import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  DropdownSection,
} from '@nextui-org/react'
import { PlusIcon } from '@renderer/components/Icons/PlusIcon'
import { modalTypes, useModal } from '@renderer/utils/useModal'
import { FaFolder, FaFile, FaFolderPlus } from 'react-icons/fa'

export const AddNewFileDropdown = () => {
  const iconClasses = 'text-xl text-sm text-default-500 pointer-events-none flex-shrink-0'
  const [_, toggleCreateFileModal] = useModal(modalTypes.createDocumentModal)

  return (
    <Dropdown className='text-c-title bg-c-card'>
      <DropdownTrigger>
        <Button
          className='bg-c-filter shadow-sm text-c-text'
          color='secondary'
          startContent={<PlusIcon className='text-c-primary-variant-1' />}
          radius='sm'
        >
          Nuevo y cargar
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant='faded' aria-label='Dropdown menu with icons'>
        <DropdownItem
          showDivider
          key='foler'
          className='default-text-color'
          onPress={toggleCreateFileModal}
          startContent={<FaFolder className={iconClasses + ' text-yellow-500'} />}
        >
          Carpeta
        </DropdownItem>
        <DropdownSection>
          <DropdownItem
            key='files'
            className='default-text-color'
            startContent={<FaFile className={iconClasses} />}
          >
            Carga de archivos
          </DropdownItem>
          <DropdownItem
            key='folders'
            className='default-text-color'
            startContent={<FaFolderPlus className={iconClasses} />}
          >
            Carga de carpetas
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}
