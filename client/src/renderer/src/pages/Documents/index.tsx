import { useDisclosure } from '@nextui-org/react';
import { reqCreateFile, reqGetFileByPath, reqGetFiles } from '@renderer/api/requests';
import { setCurrentPath, setData } from '@renderer/features/DocumentsSlice';
import { RootState } from '@renderer/store';
import { LocalFile, Node } from "@renderer/types/File";
import { useEffect, useState } from 'react';
import { MdViewList, MdViewModule } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import DocumentsGrid from './DocumentsGrid';
import DocumentsTable from './DocumentsTable';

const DocumentManager = () => {
    const { data, currentPath } = useSelector((state: RootState) => state.documents);
    const currentCompany = useSelector((state: RootState) => state.currentCompany);
    const currentUnit = useSelector((state: RootState) => state.currentUnit);
    const dispatch = useDispatch();
    const [currentFolder, setCurrentFolder] = useState<Node | null>(null);
    const [viewType, setViewType] = useState<'grid' | 'table'>('table');
    const { onOpen, onClose } = useDisclosure();
    const [fileDetails, setFileDetails] = useState<LocalFile>({
        name: '',
        path: '',
        type: '',
        file: null,
        folder: false
    });

    useEffect(() => {
        const loadFiles = async () => {
            try {
                const response = await reqGetFileByPath('/root');
                dispatch(setData(response.data));
                const res = await reqGetFiles();
                console.log(res);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };
        loadFiles();
    }, []);



    const addFolder = async () => {
        const folderName = prompt("Ingrese el nombre de la carpeta:");
        if (!folderName) return alert("Nombre de carpeta no puede estar vacío.");

        try {
            const newFolder = {
                name: folderName,
                path: `/root/${folderName}`,
                folder: true,
                businessUnit: {
                    id: currentUnit.id
                },
                company: {
                    id: currentCompany.id
                }
            };

            await reqCreateFile(newFolder)
            dispatch(setData([...data, newFolder]));

            // Limpiar estado
            onClose();
            setFileDetails({ name: '', path: '', type: '', file: null, folder: false });
        }
        catch (error) {
            console.error('Error en la creación de la unidad:', error)
        }
    };

    const handleOpen = (node: Node) => {
        if (node.folder) {
            dispatch(setCurrentPath([...currentPath, node.name]));
        } else {
            console.log('Abriendo el archivo:', node);
        }
    };

    const handleDelete = (nodeId: number) => {
        const updatedData = data.filter(node => node.id !== nodeId);
        dispatch(setData(updatedData));
    };

    const filteredData = currentFolder
        ? data.filter(node => node.path.startsWith(currentFolder.path))
        : data;

    const handleChangePath = (folder: string) => {
        const newPathIndex = currentPath.indexOf(folder);
        const newPath = folder === 'General' ? ['General'] : currentPath.slice(0, newPathIndex + 1);
        dispatch(setCurrentPath(newPath));
    };

    return (
        <>
            <div>
                <div className="mb-4 text-c-primary rounded-md">
                    <div className="flex items-center mb-4">
                        <span className="cursor-pointer hover:underline" onClick={() => handleChangePath('General')}>
                            General
                        </span>
                        {currentPath.length > 1 && currentPath.slice(1).map((folder, index) => (
                            <div key={index} className="flex items-center">
                                <span className="cursor-pointer hover:underline" onClick={() => handleChangePath(folder)}>
                                    {folder}
                                </span>
                                {index < currentPath.length - 2 && <span className="mx-2">{'>'}</span>}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                    <div className="flex">
                        <button onClick={addFolder} className="mr-2 p-3 flex items-center justify-center bg-c-filter text-white rounded-xl h-[40px] hover:bg-c-primary-variant-2 duration-200 transition-all">
                            Crear Carpeta
                        </button>
                        <button onClick={onOpen} className="mr-2 p-3 flex items-center justify-center bg-c-filter text-white rounded-xl h-[40px] hover:bg-c-primary-variant-2 duration-200 transition-all">
                            Subir Archivo
                        </button>
                    </div>

                    <div className="flex">
                        <button onClick={() => setViewType(viewType === 'grid' ? 'table' : 'grid')} className="rounded-xl text-c-primary">
                            {viewType === 'grid' ? <MdViewList className="flex items-center justify-center h-[32px] w-[32px]" /> : <MdViewModule className="flex items-center justify-center h-[32px] w-[32px]" />}
                        </button>
                    </div>
                </div>

                <div>
                    {viewType === 'grid'
                        ? <DocumentsGrid />
                        : <DocumentsTable />}
                </div>
            </div>
        </>
    );
};

export default DocumentManager;
