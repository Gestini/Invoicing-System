import { Node } from '@renderer/types/File'
import { RootState } from '@renderer/store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FileOptionsDropdown } from '../Dropdown/FileOptionsDropdown'
import { MdFolder, MdInsertDriveFile } from 'react-icons/md'

export const DocumentsTable = () => {
  const { data } = useSelector((state: RootState) => state.documents)
  const navigate = useNavigate()
  const unit = useSelector((state: RootState) => state.currentUnit)
  const fileNavigate = (file: Node) =>
    navigate(`/documents/${unit.company.id}/${unit.id}/${file.id}`)

  return (
    <div>
      <table className='min-w-full rounded-md overflow-hidden'>
        <thead>
          <tr>
            <th className='p-2 text-c-title font-semibold text-left'>Nombre</th>
            <th className='p-2 text-c-title font-semibold text-left'>Tipo</th>
            <th className='p-2 text-c-title font-semibold text-left'>Acción</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={3} className='p-2 text-c-title'>
                No hay documentos en esta carpeta.
              </td>
            </tr>
          )}
          {data.map((file: Node) => (
            <tr
              key={file.id}
              className='hover:bg-c-sidebar-bg transition-colors duration-200 cursor-pointer'
              onClick={() => fileNavigate(file)}
            >
              <td className='p-2 flex items-center'>
                {file.folder ? (
                  <div className='flex items-center cursor-pointer'>
                    <MdFolder className='text-yellow-500 text-xl mr-2' />
                    {file.name}
                  </div>
                ) : (
                  <div className='flex items-center'>
                    <MdInsertDriveFile className='text-gray-500 text-xl mr-2' />
                    {file.name}
                  </div>
                )}
              </td>
              <td className='p-2 text-c-title'>{file.folder ? 'Carpeta' : 'Documento'}</td>
              <td className='p-2 text-c-title'>
                <FileOptionsDropdown file={file} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
