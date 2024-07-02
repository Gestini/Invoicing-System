import { ActionDropdown } from '../Dropdown'
import { ShortCellValue } from './ShortCellValue'
import { Chip, ChipProps, User } from '@nextui-org/react'

export const RenderCell = (
  user: any,
  columnKey: any,
  handleDeleteItem: any,
  handleSetCurrentIdEdit: any,
) => {
  const statusColorMap: Record<string, ChipProps['color']> = {
    ALIVE: 'success',
    DEAD: 'danger',
  }

  const cellValue = user[columnKey]

  switch (columnKey) {
    case 'name':
      return (
        <User
          avatarProps={{ src: user.avatar }}
          description={<ShortCellValue cellValue={user.email} />}
          name={<ShortCellValue cellValue={cellValue} />}
        />
      )
    case 'status':
      return (
        <Chip className='capitalize' color={statusColorMap[user.status]} size='sm' variant='flat'>
          {cellValue}
        </Chip>
      )
    case 'actions':
      return (
        <div className='bg-c-card relative flex justify-end items-center gap-2'>
          <ActionDropdown
            editAction={() => handleSetCurrentIdEdit(user.id)}
            deleteAction={() => handleDeleteItem(user.id)}
          />
        </div>
      )
    default:
      return <ShortCellValue cellValue={cellValue} />
  }
}
