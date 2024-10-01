import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { reqGetFilesByParentId } from '@renderer/api/requests';
import { setCurrentPath, setData } from '@renderer/features/DocumentsSlice';
import { RootState } from '@renderer/store';
import { File } from '@renderer/types/File';
import { useEffect } from 'react';
import { MdFolder, MdInsertDriveFile } from 'react-icons/md';
import { SlOptionsVertical } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const DocumentsTable = () => {
    const { data, currentPath } = useSelector((state: RootState) => state.documents);
    const params = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await reqGetFilesByParentId(params.fileId)
                dispatch(setData(response.data))
            }
            catch (error) {
                console.log(error)
            }
        }
        loadData()
    }, [params.fileId])

    const handleChangePath = (folder: any) => {
        console.log(folder)
        navigate(`/document/file/${folder.id}`)
    };

    const filteredData = data.filter((file: any) => {
        const currentFolderPath = currentPath[currentPath.length - 1]; // Obtiene la carpeta actual
        return (
            file.path === currentFolderPath ||
            (currentPath.length === 1 && file.path.startsWith('/')) // Cambiar aquí para verificar si estamos en "General"
        );
    });

    return (
        <div>
            <table className="min-w-full rounded-md overflow-hidden">
                <thead>
                    <tr>
                        <th className="p-2 text-c-title font-semibold text-left">Nombre</th>
                        <th className="p-2 text-c-title font-semibold text-left">Tipo</th>
                        <th className="p-2 text-c-title font-semibold text-left">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="p-2 text-c-title">No hay documentos en esta carpeta</td>
                        </tr>
                    ) : (
                        filteredData.map((file) => (
                            <tr key={file.id} className="hover:bg-gray-800 transition-colors duration-200">
                                <td className="p-2 flex items-center" onClick={() => handleChangePath(file)}>
                                    {file.folder ? (
                                        <div className="flex items-center cursor-pointer">
                                            <MdFolder className="text-yellow-500 text-xl mr-2" />
                                            {file.name}
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <MdInsertDriveFile className="text-gray-500 text-xl mr-2" />
                                            {file.name}
                                        </div>
                                    )}
                                </td>
                                <td className="p-2 text-c-title">{file.folder ? 'Carpeta' : 'Documento'}</td>
                                {/* <td className="p-2 text-c-title">
                                    <Dropdown placement='bottom-start' className='bg-c-card text-c-title'>
                                        <DropdownTrigger>
                                            <div>
                                                <SlOptionsVertical className='text-c-title w-4 h-4 cursor-pointer' />
                                            </div>
                                        </DropdownTrigger>
                                        <DropdownMenu aria-label="Acciones">
                                            <DropdownItem key="edit" className='bg-c-primary text-white'>Editar</DropdownItem>
                                            <DropdownItem key="delete" className='bg-c-danger text-white'>Eliminar</DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </td> */}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DocumentsTable;
