import { Tooltip } from '@nextui-org/react'

interface ShortCellValueProps {
  cellValue: string
  minLength: number
}

export const ShortCellValue = ({ cellValue, minLength = 20 }: ShortCellValueProps) => {
  if (!cellValue) return ''

  if (cellValue.length > minLength) {
    return (
      <Tooltip className='default-text-color' content={cellValue}>
        <h3>{cellValue.slice(0, minLength) + '...'}</h3>
      </Tooltip>
    )
  }

  return <h3>{cellValue}</h3>
}
