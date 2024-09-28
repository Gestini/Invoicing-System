import { Input, Modal, ModalBody, ModalContent, ModalHeader, Select, SelectItem } from '@nextui-org/react';
import { Node } from '@renderer/types/File';
import { useEffect, useState } from 'react';
import { MdArrowBackIos, MdUpload } from 'react-icons/md';
import FileManager from './FileManager'; // Asegúrate de que FileManager está importado correctamente.
import { useDispatch, useSelector } from 'react-redux'; // Importa useDispatch si lo necesitas.
import { setData } from '@renderer/features/DocumentsSlice'; // Importa las acciones de redux correctamente.

const FileComponent: React.FC = () => {
    const fileManager = FileManager(); // Instanciar FileManager como una función normal.
    const {
        addFile,
        cloudFile,
        currentFolder,
        localFile,
        data,
        setCloudFile,
        setLocalFile,
        updateNodeById,
        isOpen,
        onOpenChange,
        onOpen,
        onClose
    } = fileManager; // Extraer los valores retornados por FileManager.
    
    const [formType, setFormType] = useState<string | null>(null);
    const filetype = ['xlsx', 'pdf', 'docx', 'img'];

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
            setData(updateddata);
        } else {
            setData([...data, newNode]);
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

    useEffect(() => {
        // Aquí puedes hacer algo cuando los nodos cambian
        console.log("Nodos actualizados:", data);
        // Por ejemplo, podrías realizar una llamada a una API o actualizar la UI de alguna manera
    }, [data]);

    return (
        <>
            <button onClick={onOpen} className="mr-2 p-3 flex items-center justify-center bg-c-filter text-white rounded-xl h-[40px] hover:bg-c-primary-variant-2 duration-200 transition-all">
                Subir Archivo
            </button>
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
        </>
    );
};

export default FileComponent;
