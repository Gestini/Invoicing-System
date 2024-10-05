import { Input } from '@nextui-org/react'
import { ActionDropdown } from '../Dropdown'
import { ShortCellValue } from './ShortCellValue'
import { Chip, ChipProps } from '@nextui-org/react'

interface RenderCellInterface {
  item: any
  columnKey: any
  inputCell: boolean
  handleDeleteItem: any
  handleSetCurrentIdEdit: any
}

export const RenderCell = ({
  item,
  columnKey,
  inputCell,
  handleDeleteItem,
  handleSetCurrentIdEdit,
}: RenderCellInterface) => {
  const statusColorMap: Record<string, ChipProps['color']> = {
    ACTIVE: 'success',
    INACTIVE: 'danger',
    PENDING: 'warning',
  }

  const cellValue = item[columnKey]

  if (inputCell) return <Input type='email' size='sm' defaultValue={item[columnKey]} />

  switch (columnKey) {
    case 'category':
      return (
        <span className='bg-c-primary-variant-3 text-c-primary px-2 py-[2px] rounded-md text-[12px]'>
          {item[columnKey]}
        </span>
      )
    case 'name':
      return <ShortCellValue cellValue={cellValue} maxLength={20} />
    case 'status':
      return (
        <Chip className='capitalize' color={statusColorMap[item.status]} size='sm' variant='flat'>
          {cellValue}
        </Chip>
      )
    case 'actions':
      return (
        <div className='relative flex justify-end items-center gap-2'>
          <ActionDropdown
            editAction={() => handleSetCurrentIdEdit(item.id)}
            deleteAction={() => handleDeleteItem(item.id)}
          />
        </div>
      )
    default:
      return <ShortCellValue cellValue={cellValue} maxLength={20} />
  }
}
