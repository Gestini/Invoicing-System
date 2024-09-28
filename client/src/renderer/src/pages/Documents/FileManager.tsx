import { useDisclosure } from '@nextui-org/react';
import { RootState } from '@renderer/store';
import { LocalFile, Node } from '@renderer/types/File';
import { useEffect, useState } from 'react'
import { UseDispatch, useSelector } from 'react-redux';
import { setData } from '@renderer/features/DocumentsSlice'

const FileManager = () => {
    const data = useSelector((state: RootState) => state.documents)
    const [currentFolder, setCurrentFolder] = useState<Node | null>(null);
    const [folderHistory, setFolderHistory] = useState<Node[]>([]);
    const { isOpen, onOpenChange, onClose, onOpen } = useDisclosure();
    const [localFile, setLocalFile] = useState<LocalFile>({
        name: '',
        url: '',
        type: '',
        file: null,
    });

    const [cloudFile, setCloudFile] = useState({
        name: '',
        url: '',
        type: '',
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
        setData(prevdata => {
            if (currentFolder) {
                return updateNodeById(prevdata, currentFolder.id, newNode);
            } else {
                return [...prevdata, newNode];
            }
        });

        onClose();
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

        setData(prevdata => {
            if (currentFolder) {
                return updateNodeById(prevdata, currentFolder.id, newNode);
            } else {
                return [...prevdata, newNode];
            }
        });

        // Limpiar estado
        onClose();
        setLocalFile({ name: '', url: '', type: '', file: null });
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

    return {
        currentFolder,
        setCurrentFolder,
        folderHistory,
        setFolderHistory,
        data,
        setData,
        localFile,
        setLocalFile,
        cloudFile,
        setCloudFile,
        addFile,
        updateNodeById,
        isOpen,
        onOpenChange,
        onClose,
        onOpen,
        handleLocalFileChange,
        addLocalFile
    };
}

export default FileManager