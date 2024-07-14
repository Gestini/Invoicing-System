import React from 'react'
import {
    Input,
    Modal,
    Button,
    Textarea,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalContent,
    useDisclosure,
} from '@nextui-org/react'
import { PlusIcon } from '@renderer/components/Icons'

const CreateWarehouse = () => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
    return (
        <>
            <Button
                onPress={onOpen}
                className='bg-c-primary'
                color='secondary'
                size='sm'
                endContent={<PlusIcon />}
            >
                Crear Deposito
            </Button>

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <div className='p-10'>
                            <h4 className='text-c-primary font-semibold text-2xl mb-3'>Crear deposito</h4>
                            <div className='w-[300px]'>
                                <Input type="email" variant="bordered" label='Nombre' />
                                <Button color="primary" className='mt-2  bg-c-primary' >
                                    Crear
                                </Button>
                            </div>
                        </div>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateWarehouse