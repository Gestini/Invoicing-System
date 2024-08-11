import { useSelector } from 'react-redux'
import { ChevronDownIcon } from '@renderer/components/Icons'
import { ExportTableToExcel } from './Excel'
import { PdfIcon, DocIcon, ExcelIcon } from '@renderer/components/Icons/ExportTableIcons'
import { Button, Dropdown, DropdownMenu, DropdownItem, DropdownTrigger } from '@nextui-org/react'

export const ExportTableDropdown = () => {
  const data = useSelector((state: any) => state.table.data)

  return (
    <Dropdown className='bg-c-card text-c-title'>
      <DropdownTrigger>
        <Button endContent={<ChevronDownIcon className='text-small' />} variant='flat' radius='sm'>
          Exportar
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant='faded' aria-label='Dropdown menu with icons'>
        <DropdownItem
          key='edit'
          className='default-text-color'
          endContent={<ExcelIcon />}
          onClick={() => ExportTableToExcel(data)}
        >
          Documento Excel
        </DropdownItem>
        <DropdownItem key='edit2' className='default-text-color' endContent={<DocIcon />}>
          Documento Word
        </DropdownItem>
        <DropdownItem key='edit1' className='default-text-color' endContent={<PdfIcon />}>
          Documento PDF
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
