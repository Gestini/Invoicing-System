import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { RootState } from '@renderer/store';
import { MdFolder, MdInsertDriveFile, MdOpenInNew } from 'react-icons/md';
import { SlOptions } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DocumentsGrid = () => {
    const { data, currentPath } = useSelector((state: RootState) => state.documents);
    const dispatch = useDispatch();

    const filteredData = data.filter((file: any) => {
        const currentFolderPath = currentPath[currentPath.length - 1];
        return (
            file.path === currentFolderPath ||
            (currentPath.length === 1 && file.path.startsWith('/'))
        );
    });


    return (
        <div className="grid grid-cols-4 gap-4">
            {filteredData.length === 0 ? (
                <div className="col-span-4 text-c-title">No hay documentos.</div>
            ) : (
                data.map((node, ind) => (
                    <div
                        key={ind}
                        className="p-4 rounded-xl bg-c-card cursor-pointer"
                    >
                        {node.folder ? (
                            <div className="flex justify-between h-20" key={node.id}>
                                <div>
                                    <MdFolder className="text-yellow-500 text-4xl" />
                                    <div className="text-c-title">{node.name}</div>
                                    <a
                                        className="text-gray-500 flex items-center gap-1"
                                        href={node.path}
                                    >
                                        <MdOpenInNew />
                                        <span className="underline">Abrir</span>
                                    </a>
                                </div>
                                <Dropdown
                                    placement="right-start"
                                    className="bg-c-card text-c-title"
                                >
                                    <DropdownTrigger>
                                        <div>
                                            <SlOptions className="text-c-title w-4 h-4 cursor-pointer" />
                                        </div>
                                    </DropdownTrigger>
                                    <DropdownMenu
                                        aria-label="Static Actions"
                                        className="text-c-title bg-c-bg-color"
                                    >
                                        <DropdownItem key="Open">Abrir</DropdownItem>
                                        <DropdownItem key="Edit">Editar</DropdownItem>
                                        <DropdownItem
                                            key="delete"
                                            className="text-danger"
                                            showDivider={false}
                                            color="danger"
                                        >
                                            Eliminar
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        ) : (
                            <div className="flex justify-between h-full">
                                <div>
                                    {/* Determinar el color del icono según el tipo de nodo */}
                                    {(() => {
                                        const colors = {
                                            xlsx: 'text-green-500',
                                            pdf: 'text-red-500',
                                            docx: 'text-blue-500',
                                            png: 'text-cyan-500',
                                            jpg: 'text-cyan-500',
                                            jpeg: 'text-cyan-500',
                                        };

                                        const iconColor =
                                            colors[`${node.type}`] || 'text-gray-500'; // Color por defecto si el tipo no es válido

                                        return (
                                            <div className="flex flex-col w-full">
                                                <MdInsertDriveFile
                                                    className={`${iconColor} text-4xl`}
                                                />
                                                <div className="text-c-title">{node.name}</div>
                                                <a
                                                    className="text-gray-500 flex items-center gap-1"
                                                    href={node.path}
                                                >
                                                    <MdOpenInNew />
                                                    <span className="underline">Abrir</span>
                                                </a>
                                            </div>
                                        );
                                    })()}
                                </div>
                                <div className="flex flex-col items-end justify-between h-full">
                                    <Dropdown
                                        placement="right-start"
                                        className="bg-c-card text-c-title"
                                    >
                                        <DropdownTrigger>
                                            <div>
                                                <SlOptions className="text-c-title w-4 h-4 cursor-pointer" />
                                            </div>
                                        </DropdownTrigger>
                                        <DropdownMenu
                                            aria-label="Static Actions"
                                            className="text-c-title bg-c-bg-color"
                                        >
                                            <DropdownItem key="Open">Abrir</DropdownItem>
                                            <DropdownItem key="Edit">
                                                <Link to={'/'}>Configurar</Link>
                                            </DropdownItem>
                                            <DropdownItem
                                                key="delete"
                                                className="text-danger"
                                                showDivider={false}
                                                color="danger"
                                            >
                                                Eliminar unidad
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                    <span className="text-[12px] text-gray-600 font-bold">
                                        {node.type}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    )
}

export default DocumentsGrid