import {
  cn,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from '@nextui-org/react'
import { FaPen } from 'react-icons/fa'
import { FaShapes } from 'react-icons/fa6'
import { MdAttachMoney } from 'react-icons/md'
import { VerticalDotsIcon } from '../../Icons/VerticalDotsIcon'
import { DeleteDocumentIcon } from '../../Icons/DeleteDocumentIcon'

export const ActionDropdown = ({ deleteAction, editAction }) => {
  const iconClasses = 'text-sm text-default-500 pointer-events-none flex-shrink-0'

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
          onPress={editAction}
          startContent={<FaPen className={iconClasses} />}
        >
          Actualizar
        </DropdownItem>
        <DropdownItem
          key='edit'
          className='default-text-color'
          onPress={editAction}
          startContent={<FaShapes className={iconClasses} />}
        >
          Variante
        </DropdownItem>
        <DropdownItem
          key='edit'
          className='default-text-color'
          onPress={editAction}
          startContent={<MdAttachMoney className={iconClasses} />}
        >
          Precios
        </DropdownItem>
        <DropdownItem
          key='delete'
          className='text-danger'
          color='danger'
          onPress={deleteAction}
          startContent={<DeleteDocumentIcon className={cn(iconClasses, 'text-danger')} />}
        >
          Borrar
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
