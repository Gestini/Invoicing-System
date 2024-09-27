import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, useDisclosure } from '@nextui-org/react';
import { Node } from "@renderer/types/File";
import { useEffect, useState } from 'react';
import { FaTrash } from "react-icons/fa";
import { MdFolder, MdInsertDriveFile, MdOpenInNew, MdViewList, MdViewModule } from 'react-icons/md';
import { SlOptions, SlOptionsVertical } from 'react-icons/sl';
import { Link } from 'react-router-dom';
import FileComponent from './localFile';
import FileManager from './FileManager'

const DocumentManager: React.FC = () => {
    const [currentPath, setCurrentPath] = useState<string[]>(["General"]);
    const [viewType, setViewType] = useState<'grid' | 'table'>('grid');

    const { currentFolder, setCurrentFolder, folderHistory, setFolderHistory, updateNodeById, nodes, setNodes, onOpen } = FileManager()

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
            const updatedNodes = updateNodeById(nodes, currentFolder.id, newNode);
            setNodes(updatedNodes);
        }
    };

    const deleteFile = (id) => {
        const newData = nodes.filter((ele) => ele.id !== id)
        setNodes(newData)
    }

    const enterFolder = (node: Node) => {
        setFolderHistory([...folderHistory, currentFolder!]);
        setCurrentFolder(node);
        setCurrentPath([...currentPath, node.name]);
    };

    useEffect(() => {
        // Aquí puedes hacer algo cuando los nodos cambian
        console.log("Nodos actualizados:", nodes);
        // Por ejemplo, podrías realizar una llamada a una API o actualizar la UI de alguna manera
    }, [nodes]);

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
            const foundNode = nodes.find(node => node.name === folderToEnter);
            if (foundNode) {
                setCurrentFolder(foundNode);
            }
        }
    };

    useEffect(() => {
        // Aquí puedes hacer algo cuando los nodos cambian
        console.log("Nodos actualizados:", nodes);
        // Por ejemplo, podrías realizar una llamada a una API o actualizar la UI de alguna manera
    }, [nodes]);

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
                    <FileComponent />
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
                            {nodes.length === 0 ? (
                                <div className="col-span-4 text-c-title">No hay documentos.</div>
                            ) : (
                                nodes.map((node) => (
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
                        renderTable({ id: 0, name: 'Raíz', type: 'carpeta', children: nodes })
                    )}
                </div>
            )}
        </div>
    );
};

export default DocumentManager;