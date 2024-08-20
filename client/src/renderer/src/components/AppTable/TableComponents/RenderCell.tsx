import { ActionDropdown } from '../Dropdown'
import { ShortCellValue } from './ShortCellValue'
import { Chip, ChipProps } from '@nextui-org/react'

export const RenderCell = (
  user: any,
  columnKey: any,
  handleDeleteItem: any,
  handleSetCurrentIdEdit: any,
) => {
  const statusColorMap: Record<string, ChipProps['color']> = {
    ACTIVE: 'success',
    INACTIVE: 'danger',
    PENDING: 'warning',
  }

  const cellValue = user[columnKey]

  switch (columnKey) {
    case 'name':
      return <ShortCellValue cellValue={cellValue} maxLength={20} />
    case 'status':
      return (
        <Chip className='capitalize' color={statusColorMap[user.status]} size='sm' variant='flat'>
          {cellValue}
        </Chip>
      )
    case 'actions':
      return (
        <div className='relative flex justify-end items-center gap-2'>
          <ActionDropdown
            editAction={() => handleSetCurrentIdEdit(user.id)}
            deleteAction={() => handleDeleteItem(user.id)}
          />
        </div>
      )
    default:
      return <ShortCellValue cellValue={cellValue} maxLength={20} />
  }
}
