import { Tooltip } from '@nextui-org/react'

interface ShortCellValueProps {
  cellValue: string
  maxLength: number
}

export const ShortCellValue = ({ cellValue, maxLength = 20 }: ShortCellValueProps) => {
  if (!cellValue) return ''

  if (cellValue.length > maxLength) {
    return (
      <Tooltip className='default-text-color' content={cellValue}>
        {cellValue.slice(0, maxLength) + '...'}
      </Tooltip>
    )
  }

  return cellValue
}
