import PDFICON from '../../assets/Icons/pdf.png'
import EXCELICON from '../../assets/Icons/xlsx.svg'
import WORDICON from '../../assets/Icons/docx.svg'

export const PdfIcon = () => {
  return <img src={PDFICON} alt='' className='h-4 w-4' />
}

export const ExcelIcon = () => {
  return <img src={EXCELICON} alt='' className='h-4 w-4' />
}

export const DocIcon = () => {
  return <img src={WORDICON} alt='' className='h-4 w-4' />
}
