import React from "react";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Button,
    Select,
    SelectItem,
    useDisclosure,
    ModalContent
} from "@nextui-org/react";
import { productStatusOptions } from "./data";
import { PlusIcon } from "@renderer/components/Icons";

const CreateProductModal = ({ onAddProduct,  }) => {
    const [formData, setFormData] = React.useState({
        id: "",
        name: "",
        category: "",
        price: "",
        stock: "",
        supplier: "",
        status: productStatusOptions.length > 0 ? productStatusOptions[0]?.uid : "",
    });

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        // Envía los datos del nuevo producto al componente principal
        onAddProduct(formData);
        // // Cierra el modal después de enviar el formulario
        // onOpenChange(false);
    };

    return (
        <>
            {/* Botón para abrir el modal */}
            <Button color="primary" onPress={onOpen} endContent={<PlusIcon />}>
                Add Product
            </Button>

            {/* Modal */}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="opaque">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Add New Product</ModalHeader>
                            <ModalBody>
                                <Input label="ID" name="id" value={formData.id} onChange={handleInputChange} />
                                <Input label="Name" name="name" value={formData.name} onChange={handleInputChange} />
                                <Input label="Category" name="category" value={formData.category} onChange={handleInputChange} />
                                <Input label="Price" name="price" value={formData.price} onChange={handleInputChange} />
                                <Input label="Stock" name="stock" value={formData.stock} onChange={handleInputChange} />
                                <Input label="Supplier" name="supplier" value={formData.supplier} onChange={handleInputChange} />
                                <Select label="Status" name="status" value={formData.status} onChange={handleInputChange}>
                                    {productStatusOptions.map((status) => (
                                        <SelectItem key={status.uid} value={status.uid}>
                                            {status.name}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </ModalBody>
                            <ModalFooter>
                                {/* Botón dentro del modal para enviar el formulario */}
                                <Button color="primary" onPress={onClose} onClick={handleSubmit}>
                                    Add Product
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreateProductModal;
