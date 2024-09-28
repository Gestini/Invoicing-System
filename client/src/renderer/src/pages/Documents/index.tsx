import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem, useDisclosure } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { FaTrash } from "react-icons/fa";
import { MdArrowBackIos, MdFolder, MdInsertDriveFile, MdOpenInNew, MdUpload, MdViewList, MdViewModule } from 'react-icons/md';
import { SlOptions, SlOptionsVertical } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import { Node } from "@renderer/types/File"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@renderer/store';
import { setData } from '@renderer/features/DocumentsSlice'

interface LocalFile {
    name: string;
    file: null | string;
    url: string;
    type: string | null;
}

const DocumentManager = () => {
    const data = useSelector((state: RootState) => state.documents.data)
    const dispatch = useDispatch()
    const [currentFolder, setCurrentFolder] = useState<Node | null>(null);
    const [folderHistory, setFolderHistory] = useState<Node[]>([]);
    const [currentPath, setCurrentPath] = useState<string[]>(["General"]);
    const [viewType, setViewType] = useState<'grid' | 'table'>('grid');
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [formType, setFormType] = useState<string | null>(null);
    const filetype = ['xlsx', 'pdf', 'docx', 'img']
    const [cloudFile, setCloudFile] = useState({
        name: '',
        url: '',
        type: '',
    });
    const [localFile, setLocalFile] = useState<LocalFile>({
        name: '',
        url: '',
        type: '',
        file: null,
    });

    const updateNodeById = (data: Node[], parentId: number, newNode: Node): Node[] => {
        return data.map(node => {
            if (node.id === parentId) {
                return { ...node, children: [...(node.children || []), newNode] };
            }
            if (node.children) {
                return { ...node, children: updateNodeById(node.children, parentId, newNode) };
            }
            return node;
        });
    };

    const addFile = () => {
        if (!cloudFile.name || !cloudFile.url || !cloudFile.type) {
            return alert("Faltan detalles del archivo");
        }
        const newNode: Node = {
            id: Date.now(),
            name: cloudFile.name,
            type: cloudFile.type,
            url: cloudFile.url,
        };
        if (currentFolder) {
            const updateddata = updateNodeById(data, currentFolder.id, newNode);
            dispatch(setData(updateddata))
        } else {
            dispatch(setData([...data, newNode]))
        }

        // Limpiar estado
        onClose()
        setCloudFile({ name: '', url: '', type: '' });
    };

    const addLocalFile = () => {
        if (!localFile.name || !localFile.url || !localFile.type) {
            return alert('Faltan detalles del archivo local');
        }

        const newNode: Node = {
            id: Date.now(),
            name: localFile.name,
            file: localFile.file,
            type: localFile.type,
            url: localFile.url,
        };

        if (currentFolder) {
            const updateddata = updateNodeById(data, currentFolder.id, newNode);
            dispatch(setData(updateddata));
        } else {
            dispatch(setData([...data, newNode]));
        }

        // Limpiar estado
        onClose();
        setLocalFile({ name: '', url: '', type: '', file: '' });
    };

    const handleLocalFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const fileExtension = file.name.split('.').pop(); // Obtener la extensión del archivo

            setLocalFile((prevLocalFile) => ({
                ...prevLocalFile,
                file: file.name,
                url: URL.createObjectURL(file),
                type: fileExtension || '',
            }));
        }
    };


    const addFolder = () => {
        const newFolderName = prompt("Ingrese el nombre de la nueva carpeta:");
        if (!newFolderName) return;

        const newNode: Node = {
            id: Date.now(),
            name: newFolderName,
            children: [],
            type: 'folder'
        };

        if (currentFolder) {
            const updateddata = updateNodeById(data, currentFolder.id, newNode);
            dispatch(setData(updateddata))
        } else {
            dispatch(setData([...data, newNode]))
        }
    };

    const deleteFile = (id) => {
        const newData = data.filter((ele) => ele.id !== id)
        dispatch(setData(newData))
    }

    const enterFolder = (node: Node) => {
        setFolderHistory([...folderHistory, currentFolder!]);
        setCurrentFolder(node);
        setCurrentPath([...currentPath, node.name]);
    };

    useEffect(() => {
        if (currentFolder) {
            const findFolderById = (data: Node[], id: number): Node | null => {
                for (let node of data) {
                    if (node.id === id) return node;
                    if (node.children) {
                        const found = findFolderById(node.children, id);
                        if (found) return found;
                    }
                }
                return null;
            };

            const updatedFolder = findFolderById(data, currentFolder.id);
            if (updatedFolder) {
                setCurrentFolder(updatedFolder);
            }
        }
    }, [data, currentFolder]);



    const renderGrid = (folder: Node) => (
        <div className="grid grid-cols-4 gap-4">
            {folder.children?.length === 0 ? (
                <div className="col-span-4 text-c-title">Carpeta vacía.</div>
            ) : (
                folder.children?.map((child) => (
                    <div key={child.id} className="p-4 rounded-xl bg-c-card cursor-pointer">
                        {child.children ? (
                            <div className='relative' onClick={() => enterFolder(child)}>
                                <MdFolder className="text-yellow-500 text-4xl" />
                                <div className="text-c-title">{child.name}</div>
                                <button onClick={() => deleteFile(child.id)} className='text-red-500 absolute top-1 right-1'><FaTrash /></button>
                            </div>
                        ) : (
                            <div className='relative' >
                                <MdInsertDriveFile className="text-blue-500 text-4xl" />
                                <div className="text-c-title">{child.name}</div>
                                <button onClick={() => deleteFile(child.id)} className='text-red-500 absolute top-1 right-1'><FaTrash /></button>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );

    const renderTable = (folder: Node) => (
        <table className="min-w-full rounded-md overflow-hidden">
            <thead>
                <tr>
                    <th className="p-2 text-c-title font-semibold text-left">Nombre</th>
                    <th className="p-2 text-c-title font-semibold text-left">Tipo</th>
                    <th className="p-2 text-c-title font-semibold text-left">Accion</th>
                </tr>
            </thead>
            <tbody>
                {folder.children?.length === 0 ? (
                    <tr>
                        <td colSpan={2} className="p-2 text-c-title">Carpeta vacía</td>
                    </tr>
                ) : (
                    folder.children?.map((child) => (
                        <tr key={child.id} className="hover:bg-gray-800 transition-colors duration-200">
                            <td className="p-2 flex items-center">
                                {child.children ? (
                                    <div className="flex items-center cursor-pointer" onClick={() => enterFolder(child)}>
                                        <MdFolder className="text-yellow-500 text-xl mr-2" />
                                        {child.name}
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        {(() => {
                                            const colors = {
                                                'xlsx': 'text-green-500',
                                                'pdf': 'text-red-500',
                                                'docx': 'text-blue-500',
                                                'png': 'text-cyan-500',
                                                'jpg': 'text-cyan-500',
                                                'jpeg': 'text-cyan-500',
                                            };

                                            const iconColor = colors[child.type || ''] || 'text-gray-500'; // Color por defecto si el tipo no es válido
                                            return (
                                                <>
                                                    <MdInsertDriveFile className={`${iconColor} text-xl mr-2`} />
                                                    {child.name}
                                                </>
                                            );
                                        })()}
                                    </div>
                                )}
                            </td>
                            <td className="p-2 text-c-title">{child.children ? 'Carpeta' : 'Documento'}</td>
                            <td className="p-2 text-c-title">
                                <Dropdown placement='bottom-start' className='bg-c-card text-c-title'>
                                    <DropdownTrigger>
                                        <div>
                                            <SlOptionsVertical className='text-c-title w-4 h-4 cursor-pointer' />
                                        </div>
                                    </DropdownTrigger>
                                    <DropdownMenu aria-label='Static Actions' className='text-c-title bg-c-bg-color'>
                                        <DropdownItem key='Open' >
                                            Abrir
                                        </DropdownItem>
                                        <DropdownItem key='Edit'>
                                            Editar
                                        </DropdownItem>

                                        <DropdownItem
                                            key='delete'
                                            className='text-danger'
                                            showDivider={false}
                                            color='danger'
                                        >
                                            Eliminar
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );

    const handleBack = (index: number) => {
        const newHistory = [...currentPath].slice(0, index + 1);
        setCurrentPath(newHistory);

        if (index === 0) {
            setCurrentFolder(null);
        } else {
            const folderToEnter = newHistory[index];
            const foundNode = data.find(node => node.name === folderToEnter);
            if (foundNode) {
                setCurrentFolder(foundNode);
            }
        }
    };


    return (
        <div>
            <div className="mb-4 text-c-primary rounded-md">
                <div className="flex items-center">
                    {currentPath.map((folder, index) => (
                        <div key={index} className="flex items-center">
                            <span className="cursor-pointer hover:underline" onClick={() => handleBack(index)}>
                                {folder}
                            </span>
                            {index < currentPath.length - 1 && <span className="mx-2">{'>'}</span>}
                        </div>
                    ))}
                </div>
            </div>

            {/* Botones de opciones */}
            <div className="flex justify-between items-center mb-4">
                <div className='flex '>
                    <button onClick={addFolder} className="mr-2 p-3 flex items-center justify-center bg-c-filter text-white rounded-xl h-[40px] hover:bg-c-primary-variant-2 duration-200 transition-all">
                        Crear Carpeta
                    </button>
                    <button onClick={onOpen} className="mr-2 p-3 flex items-center justify-center bg-c-filter text-white rounded-xl h-[40px] hover:bg-c-primary-variant-2 duration-200 transition-all">
                        Subir Archivo
                    </button>

                </div>

                <div className="flex">
                    {viewType === 'grid' ? (
                        <button onClick={() => setViewType('table')} className="rounded-xl text-c-primary">
                            <MdViewList className="flex items-center justify-center h-[32px] w-[32px]" />
                        </button>
                    ) : (
                        <button onClick={() => setViewType('grid')} className="rounded-xl text-c-primary">
                            <MdViewModule className="flex items-center justify-center h-[32px] w-[32px]" />
                        </button>
                    )}
                </div>
            </div>

            {currentFolder ? (
                viewType === 'grid' ? renderGrid(currentFolder) : renderTable(currentFolder) // Mostrar la carpeta actual en vista de cuadrícula o tabla
            ) : (
                <div>
                    {viewType === 'grid' ? (
                        <div className="grid grid-cols-4 gap-4">
                            {data.length === 0 ? (
                                <div className="col-span-4 text-c-title">No hay documentos.</div>
                            ) : (
                                data.map((node) => (
                                    <div key={node.id} className="p-4 rounded-xl bg-c-card cursor-pointer">
                                        {node.children ? (
                                            <div className='flex justify-between h-20' >
                                                <div>
                                                    <MdFolder className="text-yellow-500 text-4xl" />
                                                    <div className="text-c-title">{node.name}</div>
                                                    <a className='text-gray-500 flex items-center gap-1' href={node.url}>
                                                        <MdOpenInNew />
                                                        <span className='underline' onClick={() => enterFolder(node)}>Abrir</span>
                                                    </a>
                                                </div>
                                                <Dropdown placement='right-start' className='bg-c-card text-c-title'>
                                                    <DropdownTrigger>
                                                        <div>
                                                            <SlOptions className='text-c-title w-4 h-4 cursor-pointer' />
                                                        </div>
                                                    </DropdownTrigger>
                                                    <DropdownMenu aria-label='Static Actions' className='text-c-title bg-c-bg-color'>
                                                        <DropdownItem key='Open' >
                                                            Abrir
                                                        </DropdownItem>
                                                        <DropdownItem key='Edit'>
                                                            Editar
                                                        </DropdownItem>

                                                        <DropdownItem
                                                            key='delete'
                                                            className='text-danger'
                                                            showDivider={false}
                                                            color='danger'
                                                        >
                                                            Eliminar
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </Dropdown>
                                            </div>
                                        ) : (
                                            <div className='flex  justify-between h-full' >
                                                <div>
                                                    {/* Determinar el color del icono según el tipo de nodo */}
                                                    {(() => {
                                                        const colors = {
                                                            'xlsx': 'text-green-500',
                                                            'pdf': 'text-red-500',
                                                            'docx': 'text-blue-500',
                                                            'png': 'text-cyan-500',
                                                            'jpg': 'text-cyan-500',
                                                            'jpeg': 'text-cyan-500',
                                                        };

                                                        const iconColor = colors[`${node.type}`] || 'text-gray-500'; // Color por defecto si el tipo no es válido

                                                        return (
                                                            <div className='flex flex-col w-full'>
                                                                <MdInsertDriveFile className={`${iconColor} text-4xl`} />
                                                                <div className="text-c-title">{node.name}</div>
                                                                <a className='text-gray-500 flex items-center gap-1' href={node.url}>
                                                                    <MdOpenInNew />
                                                                    <span className='underline'>Abrir</span>
                                                                </a>
                                                            </div>
                                                        );
                                                    })()}
                                                </div>
                                                <div className='flex flex-col items-end justify-between h-full'>
                                                    <Dropdown placement='right-start' className='bg-c-card text-c-title'>
                                                        <DropdownTrigger>
                                                            <div>
                                                                <SlOptions className='text-c-title w-4 h-4 cursor-pointer' />
                                                            </div>
                                                        </DropdownTrigger>
                                                        <DropdownMenu aria-label='Static Actions' className='text-c-title bg-c-bg-color'>
                                                            <DropdownItem key='Open' >
                                                                Abrir
                                                            </DropdownItem>
                                                            <DropdownItem key='Edit'>
                                                                <Link to={'/'} >Configurar</Link>
                                                            </DropdownItem>

                                                            <DropdownItem
                                                                key='delete'
                                                                className='text-danger'
                                                                showDivider={false}
                                                                color='danger'
                                                            >
                                                                Eliminar unidad
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown>
                                                    <span className='text-[12px] text-gray-600 font-bold'>
                                                        {node.type}
                                                    </span>
                                                </div>

                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    ) : (
                        renderTable({ id: 0, name: 'Raíz', type: 'carpeta', children: data })
                    )}
                </div>
            )}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="p-5 pb-10 text-c-light rounded-3xl ">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex justify-between items-center">
                                {formType ? (
                                    <button
                                        className="absolute text-gray-50 left-14 top-11"
                                        onClick={() => setFormType(null)}
                                    >
                                        <MdArrowBackIos className="h-4 w-4 mr-2" />
                                    </button>
                                ) : null}
                                <h2 className="text-2xl font-bold text-c-title flex-1 text-center">
                                    {formType ? 'Complete los detalles' : 'Subir archivo'}
                                </h2>
                            </ModalHeader>
                            <ModalBody className="flex flex-col gap-8 mt-4">
                                {!formType && (
                                    <div className="text-center">
                                        <label className="block mb-4 text-lg font-medium text-c-title">
                                            ¿Dónde se encuentra su archivo?
                                        </label>
                                        <div className="flex justify-center gap-5">
                                            <button
                                                className="p-4 bg-c-filter text-c-title rounded-xl brightness-125 transition-transform duration-200 ease-in-out transform hover:scale-105 shadow-lg"
                                                onClick={() => setFormType('cloud')}
                                            >
                                                Archivo en la nube
                                            </button>
                                            <button
                                                className="p-4 bg-c-filter text-c-title rounded-xl brightness-125  transition-transform duration-200 ease-in-out transform hover:scale-105 shadow-lg"
                                                onClick={() => setFormType('local')}
                                            >
                                                Archivo local
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {formType === 'cloud' && (
                                    <div id="cloudForm" className="animate-fadeIn">
                                        <Input type="text" value={cloudFile.name} onChange={(e) => setCloudFile({ ...cloudFile, name: e.target.value })} placeholder="Nombre" className="mb-4" />
                                        <Input type="text" placeholder="URL" value={cloudFile.url} onChange={(e) => setCloudFile({ ...cloudFile, url: e.target.value })} required className="mb-4" />
                                        <Select label="Tipo de archivo" value={cloudFile.type} onChange={(e) => setCloudFile({ ...cloudFile, type: e.target.value })}>
                                            {filetype.map((ele) => (
                                                <SelectItem key={ele} value={ele}>{ele}</SelectItem>
                                            ))}
                                        </Select>
                                        <button
                                            className="mt-4 p-3 w-full bg-c-primary text-white rounded-xl hover:brightness-110 transition-all duration-200 ease-in-out"
                                            onClick={addFile}
                                        >
                                            Subir Archivo
                                        </button>
                                    </div>
                                )}

                                {formType === 'local' && (
                                    <div id="localForm" className="animate-fadeIn">
                                        <Input
                                            type="text"
                                            placeholder="Nombre"
                                            value={localFile.name}
                                            onChange={(e) => setLocalFile({ ...localFile, name: e.target.value })}
                                            required
                                            className="mb-4"
                                        />
                                        <label className="cursor-pointer bg-c-filter p-4 flex items-center justify-center text-c-title rounded-xl h-[40px] brightness-125 transition-transform duration-200 ease-in-out transform shadow-lg">
                                            <MdUpload className="inline mr-2" /> Subir Documento
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={handleLocalFileChange}
                                            />
                                        </label>
                                        {localFile.file ? ( // Mostrar el nombre del archivo si existe
                                            <p className="mt-2 text-gray-500">{localFile.file}</p>
                                        ) :
                                            <p className="mt-2 text-gray-500">Seleccione un archivo</p>
                                        }
                                        <button
                                            className="mt-4 p-3 w-full bg-c-primary text-white rounded-xl hover:brightness-110 transition-all duration-200 ease-in-out"
                                            onClick={addLocalFile}
                                        >
                                            Subir Archivo
                                        </button>
                                    </div>
                                )}
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default DocumentManager;