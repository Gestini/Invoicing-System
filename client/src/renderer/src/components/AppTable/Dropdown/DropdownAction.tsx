import React from 'react'
import { VerticalDotsIcon } from '../../Icons/VerticalDotsIcon'
import { DeleteDocumentIcon } from '@renderer/components/Icons/DeleteDocumentIcon'
import { DropdownActionProps } from '../Interfaces/DropdownActionProps'
import {
  cn,
  Button,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from '@nextui-org/react'
import { EditDocumentIcon } from '@renderer/components/Icons/EditDocumentIcon'

export const DropdownAction = ({ dropdownItems, tableItemId }: DropdownActionProps) => {
  const iconClasses = 'text-xl text-default-500 pointer-events-none flex-shrink-0'

  const dropdonwIcon = (key: string, startContent: React.ReactNode) => {
    switch (key) {
      case 'delete':
        return <DeleteDocumentIcon className={cn(iconClasses, 'text-danger')} />

      case 'edit':
        return <EditDocumentIcon className={iconClasses} />

      default:
        return <span className={iconClasses}>{startContent}</span>
    }
  }

  return (
    <Dropdown className='text-c-title bg-c-card'>
      <DropdownTrigger>
        <Button isIconOnly size='sm' variant='light'>
          <VerticalDotsIcon className='text-default-300' />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant='faded' aria-label='Dropdown menu with icons' items={dropdownItems}>
        {(item) => (
          <DropdownItem
            key={item.key}
            className='default-text-color'
            onPress={() => item.onPress(tableItemId)}
            startContent={dropdonwIcon(item.key, item.startContent)}
          >
            {item.title}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  )
}
