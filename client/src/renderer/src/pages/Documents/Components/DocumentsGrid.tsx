import { RootState } from '@renderer/store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ShortCellValue } from '@renderer/components/AppTable/TableComponents/ShortCellValue'
import { FileOptionsDropdown } from '../Dropdown/FileOptionsDropdown'
import { MdFolder, MdInsertDriveFile, MdOpenInNew } from 'react-icons/md'

export const DocumentsGrid = () => {
  const { data } = useSelector((state: RootState) => state.documents)
  const navigate = useNavigate()
  const company = useSelector((state: RootState) => state.currentCompany)
  const unit = useSelector((state: RootState) => state.currentUnit)
  const fileNavigate = (file: any) => navigate(`/documents/${company.id}/${unit.id}/${file.id}`)

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {data.length === 0 && (
        <div className='col-span-full text-c-title'>No hay documentos en esta carpeta.</div>
      )}
      {data.map((node, ind) => (
        <div
          key={ind}
          className='p-4 rounded-xl bg-c-card cursor-pointer'
          onClick={() => fileNavigate(node)}
        >
          {node.folder ? (
            <div className='flex justify-between h-20' key={node.id}>
              <div className='flex flex-col justify-between'>
                <MdFolder className='text-yellow-500 text-4xl' />
                <div className='text-c-title'>
                  <ShortCellValue cellValue={node.name} maxLength={25} />
                </div>
              </div>
              <FileOptionsDropdown file={node} />
            </div>
          ) : (
            <div className='flex justify-between h-full'>
              <div>
                {(() => {
                  const colors = {
                    xlsx: 'text-green-500',
                    pdf: 'text-red-500',
                    docx: 'text-blue-500',
                    png: 'text-cyan-500',
                    jpg: 'text-cyan-500',
                    jpeg: 'text-cyan-500',
                  }

                  const iconColor = colors[`${node.type}`] || 'text-gray-500'

                  return (
                    <div className='flex flex-col w-full'>
                      <MdInsertDriveFile className={`${iconColor} text-4xl`} />
                      <div className='text-c-title'>
                        <ShortCellValue cellValue={node.name} maxLength={25} />
                      </div>
                      <a className='text-gray-500 flex items-center gap-1' href={node.path}>
                        <MdOpenInNew />
                        <span className='underline'>Abrir</span>
                      </a>
                    </div>
                  )
                })()}
              </div>
              <div className='flex flex-col items-end justify-between h-full'>
                <FileOptionsDropdown file={node} />
                <span className='text-[12px] text-gray-600 font-bold'>{node.type}</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
