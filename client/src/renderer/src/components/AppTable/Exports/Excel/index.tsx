import * as XLSX from 'xlsx'

export const ExportTableToExcel = (data) => {
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Table')
  XLSX.writeFile(workbook, 'table.xlsx')
}
