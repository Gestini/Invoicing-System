import React, { useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';
import { reqCreateClient, reqGetClientByUnit, reqEditClient, reqDeleteClient } from '@renderer/api/requests';
import { useParams } from 'react-router-dom';

const Index = () => {
    const params = useParams();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [data, setData] = React.useState({});
    const [results, setResults] = React.useState([]);
    const [isEdit, setIsEdit] = React.useState(false);
    const [editId, setEditId] = React.useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await reqGetClientByUnit(params.unitId);
                setResults(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        loadData();
    }, [params.unitId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCreateOrEditClient = async (e) => {
        e.preventDefault();
        try {
            if (isEdit) {
                const response = await reqEditClient(editId, {
                    ...data,
                    businessUnit: { id: params.unitId },
                });
                setResults((prevResults) =>
                    prevResults.map((client) => (client.id === editId ? response.data : client))
                );
            } else {
                const response = await reqCreateClient({
                    ...data,
                    businessUnit: { id: params.unitId },
                });
                setResults((prevResults) => [...prevResults, response.data]);
            }
            onOpenChange(false);
            setIsEdit(false);
            setEditId(null);
            setData({});
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (client) => {
        setData(client);
        setEditId(client.id);
        setIsEdit(true);
        onOpenChange(true);
    };

    const handleDelete = async (id) => {
        try {
            await reqDeleteClient(id);
            setResults((prevResults) => prevResults.filter((client) => client.id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="p-4">
            <Button onPress={onOpen} color="primary">
                Create Client
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {isEdit ? 'Edit Client' : 'Create New Client'}
                            </ModalHeader>
                            <ModalBody>
                                <form onSubmit={handleCreateOrEditClient} className="flex flex-col gap-4">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        onChange={handleChange}
                                        value={data.name || ''}
                                        className="p-2 border rounded"
                                        required
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        onChange={handleChange}
                                        value={data.email || ''}
                                        className="p-2 border rounded"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="Phone"
                                        onChange={handleChange}
                                        value={data.phone || ''}
                                        className="p-2 border rounded"
                                    />
                                    <Button type="submit" color="primary">
                                        {isEdit ? 'Update Client' : 'Create Client'}
                                    </Button>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <div className="mt-8">
                {results.map((client) => (
                    <div key={client.id} className="p-4 border-b flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{client.name}</p>
                            <p>{client.email}</p>
                            <p>{client.phone}</p>
                        </div>
                        <div className="flex gap-2">
                            <Button size="sm" onPress={() => handleEdit(client)}>Edit</Button>
                            <Button size="sm" color="danger" onPress={() => handleDelete(client.id)}>Delete</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Index;
