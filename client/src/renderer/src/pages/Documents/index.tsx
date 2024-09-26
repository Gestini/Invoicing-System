import { useState, useEffect } from 'react';
import { MdUpload, MdViewList, MdViewModule, MdFolder, MdInsertDriveFile } from 'react-icons/md';
import { FaTrash } from "react-icons/fa";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, useDisclosure } from '@nextui-org/react';
import { SlOptions, SlOptionsVertical } from 'react-icons/sl';
import { Link } from 'react-router-dom';

interface Node {
    id: number;
    name: string;
    children?: Node[];
}

const DocumentManager = () => {
    const [nodes, setNodes] = useState<Node[]>([]); // Estructura raíz
    const [currentFolder, setCurrentFolder] = useState<Node | null>(null); // Carpeta actual
    const [folderHistory, setFolderHistory] = useState<Node[]>([]); // Historial de carpetas
    const [currentPath, setCurrentPath] = useState<string[]>(["General"]);
    const [viewType, setViewType] = useState<'grid' | 'table'>('grid'); // Para controlar el tipo de vista
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    // Función para encontrar y actualizar un nodo (carpeta) en el árbol
    const updateNodeById = (nodes: Node[], parentId: number, newNode: Node): Node[] => {
        return nodes.map(node => {
            if (node.id === parentId) {
                return { ...node, children: [...(node.children || []), newNode] };
            }
            if (node.children) {
                return { ...node, children: updateNodeById(node.children, parentId, newNode) };
            }
            return node;
        });
    };

    const addFolder = () => {
        const newFolderName = prompt("Ingrese el nombre de la nueva carpeta:");
        if (!newFolderName) return;

        const newNode: Node = {
            id: Date.now(),
            name: newFolderName,
            children: [],
        };

        if (currentFolder) {
            const updatedNodes = updateNodeById(nodes, currentFolder.id, newNode);
            setNodes(updatedNodes);
        } else {
            setNodes([...nodes, newNode]);
        }
    };

    const deleteFile = (id) => {
        const newData = nodes.filter((ele) => ele.id !== id)
        setNodes(newData)
    }

    const addFile = () => {

        // const newFileName = prompt("Ingrese el nombre del nuevo archivo:");
        // if (!newFileName) return;

        const newFile: Node = {
            id: Date.now(),
            name: newFileName,
        };

        if (currentFolder) {
            const updatedNodes = updateNodeById(nodes, currentFolder.id, newFile);
            setNodes(updatedNodes);
        } else {
            setNodes([...nodes, newFile]);
        }
    };

    const enterFolder = (node: Node) => {
        setFolderHistory([...folderHistory, currentFolder!]);
        setCurrentFolder(node);
        setCurrentPath([...currentPath, node.name]);
    };

    useEffect(() => {
        if (currentFolder) {
            const findFolderById = (nodes: Node[], id: number): Node | null => {
                for (let node of nodes) {
                    if (node.id === id) return node;
                    if (node.children) {
                        const found = findFolderById(node.children, id);
                        if (found) return found;
                    }
                }
                return null;
            };

            const updatedFolder = findFolderById(nodes, currentFolder.id);
            if (updatedFolder) {
                setCurrentFolder(updatedFolder);
            }
        }
    }, [nodes, currentFolder]);

    const [formType, setFormType] = useState(null);

    const renderGrid = (folder: Node) => (
        <div className="grid grid-cols-4 gap-4">
            {folder.children?.length === 0 ? (
                <div className="col-span-4 text-c-title">Carpeta vacía.</div>
            ) : (
                folder.children.map((child) => (
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
                    folder.children.map((child) => (
                        <tr key={child.id} className="hover:bg-gray-800 transition-colors duration-200">
                            <td className="p-2 flex items-center">
                                {child.children ? (
                                    <div className="flex items-center cursor-pointer" onClick={() => enterFolder(child)}>
                                        <MdFolder className="text-yellow-500 text-xl mr-2" />
                                        {child.name}
                                    </div>
                                ) : (
                                    <div className="flex items-center">
                                        <MdInsertDriveFile className="text-blue-500 text-xl mr-2" />
                                        {child.name}
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

    const filetype = ['Excel', 'Pdf', 'Word', 'Imagen']

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
                            {nodes.length === 0 ? (
                                <div className="col-span-4 text-c-title">No hay documentos.</div>
                            ) : (
                                nodes.map((node) => (
                                    <div key={node.id} className="p-4 rounded-xl bg-c-card cursor-pointer">
                                        {node.children ? (
                                            <div className='flex items-start justify-between' onClick={() => enterFolder(node)}>
                                                <div>
                                                    <MdFolder className="text-yellow-500 text-4xl" />
                                                    <div className="text-c-title">{node.name}</div>
                                                </div>
                                                <Dropdown placement='bottom-start' className='bg-c-card text-c-title'>
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
                                            <div className='flex items-start justify-between'>
                                                <div>
                                                    <MdInsertDriveFile className="text-blue-500 text-4xl" />
                                                    <div className="text-c-title">{node.name}</div>
                                                </div>
                                                <Dropdown placement='bottom-start' className='bg-c-card text-c-title'>
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
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    ) : (
                        renderTable({ id: 0, name: 'Raíz', children: nodes })
                    )}
                </div>
            )}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody className="flex flex-col gap-4">
                                {/* Paso 1: Selección del tipo de archivo */}
                                <div className="text-center">
                                    <label className="block mb-2 text-c-title">¿Es un archivo en la nube o un archivo local?</label>
                                    <div className="flex justify-center gap-4">
                                        <button
                                            className="p-3 bg-c-filter text-c-title rounded-xl hover:bg-c-primary-variant-2 duration-200 transition-all"
                                            onClick={() => setFormType('cloud')} // Establecer el tipo de formulario
                                        >
                                            Archivo en la nube
                                        </button>
                                        <button
                                            className="p-3 bg-c-filter text-c-title rounded-xl hover:bg-c-primary-variant-2 duration-200 transition-all"
                                            onClick={() => setFormType('local')} // Establecer el tipo de formulario
                                        >
                                            Archivo local
                                        </button>
                                    </div>
                                </div>

                                {/* Paso 2: Formulario dinámico */}
                                {formType === 'cloud' && (
                                    <div id="cloudForm">
                                        <Input type="text" placeholder='Nombre' required />
                                        <Input type="text" placeholder='URL' required />
                                        <Select label="Tipo de archivo">
                                            {filetype.map((ele, ind) => (
                                                <SelectItem key={ind}>
                                                    {ele}
                                                </SelectItem>
                                            ))}
                                        </Select>
                                    </div>
                                )}

                                {formType === 'local' && (
                                    <div id="localForm">
                                        <Input type="text" placeholder='Nombre' required />
                                        <label className="cursor-pointer p-3 flex items-center justify-center bg-c-filter text-c-title rounded-xl h-[40px] hover:bg-c-primary-variant-2 duration-200 transition-all">
                                            <MdUpload className="inline mr-2" /> Subir Documento
                                            <input type="file" className="hidden" />
                                        </label>
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

