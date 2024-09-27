import { useDisclosure } from '@nextui-org/react';
import { LocalFile, Node } from '@renderer/types/File';
import { useEffect, useState } from 'react'

const FileManager = () => {
    const [currentFolder, setCurrentFolder] = useState<Node | null>(null);
    const [folderHistory, setFolderHistory] = useState<Node[]>([]);
    const [nodes, setNodes] = useState<Node[]>([]);
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

    useEffect(() => {
        // Aquí puedes hacer algo cuando los nodos cambian
        console.log("Nodos actualizados:", nodes);
        // Por ejemplo, podrías realizar una llamada a una API o actualizar la UI de alguna manera
    }, [nodes]);

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
        setNodes(prevNodes => {
            if (currentFolder) {
                return updateNodeById(prevNodes, currentFolder.id, newNode);
            } else {
                return [...prevNodes, newNode];
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
    
        setNodes(prevNodes => {
            if (currentFolder) {
                return updateNodeById(prevNodes, currentFolder.id, newNode);
            } else {
                return [...prevNodes, newNode];
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
        nodes,
        setNodes,
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