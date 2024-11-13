import { Input } from '@nextui-org/react'
import { Chip, Snippet } from '@nextui-org/react'
import { ActionDropdown } from '../Dropdown'
import { ShortCellValue } from './ShortCellValue'
import { DropdownAction } from '../Dropdown/DropdownAction'

interface RenderCellInterface {
  item: any
  columnKey: any
  inputCell: boolean | undefined
  dropdownAction: any
  handleDeleteItem: any
  handleSetCurrentIdEdit: any
}

export const RenderCell = ({
  item,
  columnKey,
  inputCell,
  dropdownAction,
  handleDeleteItem,
  handleSetCurrentIdEdit,
}: RenderCellInterface) => {
  const statusColorMap = {
    ACTIVE: {
      text: 'Activo',
      color: 'success',
    },
    INACTIVE: {
      text: 'Inactivo',
      color: 'danger',
    },
    PENDING: {
      text: 'Pendiente',
      color: 'warning',
    },
    AVAILABLE: {
      text: 'Disponible',
      color: 'success',
    },
    NOTAVAILABLE: {
      text: 'No disponible',
      color: 'danger',
    },
    FIXED: {
      text: 'Fijo',
    },
    PERCENTAGE: {
      text: 'Porcentaje',
    },
  }

  const cellValue = item[columnKey]

  if (inputCell) return <Input type='email' size='sm' defaultValue={item[columnKey]} />

  if (columnKey === 'actions' && dropdownAction)
    return <DropdownAction dropdownItems={dropdownAction} tableItemId={item.id} />

  if (cellValue == null && columnKey !== 'actions') return

  switch (columnKey) {
    case 'supplierUnit':
    case 'category':
      return (
        <Chip size='sm' variant='flat' className='rounded-md'>
          <ShortCellValue cellValue={item[columnKey]?.name} maxLength={20} />
        </Chip>
      )
    case 'name':
      return <ShortCellValue cellValue={cellValue} maxLength={20} />

    case 'status':
      return (
        <Chip
          color={statusColorMap[item.status].color}
          size='sm'
          variant='flat'
          className='rounded-md'
        >
          {statusColorMap[item.status].text}
        </Chip>
      )

    case 'type':
      return (
        <Chip size='sm' variant='flat' className='rounded-md'>
          {statusColorMap[item.type].text}
        </Chip>
      )

    case 'actions':
      return (
        <ActionDropdown
          editAction={() => handleSetCurrentIdEdit(item.id)}
          deleteAction={() => handleDeleteItem(item.id)}
        />
      )

    case 'code':
      return (
        <Snippet size='sm' color='default' codeString={cellValue} symbol=''>
          <ShortCellValue cellValue={cellValue} maxLength={20} />
        </Snippet>
      )

    default:
      return <ShortCellValue cellValue={cellValue} maxLength={20} />
  }
}
