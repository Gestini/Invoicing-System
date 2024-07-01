import React from 'react'
import { PlusIcon } from '@renderer/components/Icons/PlusIcon'
import {
  Modal,
  Input,
  Button,
  Select,
  ModalBody,
  SelectItem,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure,
  Textarea,
} from '@nextui-org/react'
import { BiDollar } from 'react-icons/bi'
import { Checkbox } from '@nextui-org/react'
import './ProductAdd.scss'

export const AddProductModal = ({ modal }) => {
  const [data, setData] = React.useState<any>({})
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddNewUser = () => {
    modal.action(data)
    onClose()
  }

  return (
    <div className='flex flex-col gap-2'>
      <Button onPress={onOpen} className='bg-c-primary' color='secondary' endContent={<PlusIcon />}>
        {modal?.buttonTitle}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size='5xl'
        scrollBehavior={'inside'}
        backdrop='blur'
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            <h3 className='default-text-color'>{modal?.title}</h3>
          </ModalHeader>
          <ModalBody>
            <div className='productsmodaladd w-full flex flex-col gap-4 '>
              <Input
                label='Nombre'
                size='sm'
                labelPlacement='outside'
                placeholder='Nombre del producto'
                variant='bordered'
              ></Input>
              <div className='rowmodaladdproduct flex gap-3'>
                <Input
                  label='Codigo'
                  size='sm'
                  labelPlacement='outside'
                  placeholder='Codigo #1'
                  variant='bordered'
                ></Input>
                <Input
                  label='Codigo'
                  size='sm'
                  labelPlacement='outside'
                  placeholder='Codigo #2'
                  variant='bordered'
                ></Input>
                <Input
                  label='Codigo de barras'
                  size='sm'
                  labelPlacement='outside'
                  placeholder='Codigo de barras'
                  variant='bordered'
                ></Input>
              </div>
              <div className='rowmodaladdproduct flex gap-3'>
                {' '}
                <Select
                  label='Proveedores'
                  labelPlacement='outside'
                  placeholder='Selecciona un proveedor'
                  variant='bordered'
                  size='sm'
                >
                  <SelectItem key={2}>Proveedor</SelectItem>
                </Select>
                <Select
                  label='Estado'
                  labelPlacement='outside'
                  placeholder='Disponibilidad'
                  variant='bordered'
                  defaultSelectedKeys={['disponible']}
                  size='sm'
                >
                  <SelectItem value={'disponible'} key={'disponible'}>
                    Disponible
                  </SelectItem>
                  <SelectItem value={'nodisponible'} key={'nodisponible'}>
                    No disponible
                  </SelectItem>
                </Select>
              </div>

              <div className='rowmodaladdproduct flex gap-3'>
                <Input
                  type='number'
                  label='Precio de compra'
                  labelPlacement='outside'
                  placeholder='0.00'
                  variant='bordered'
                  size='sm'
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>$</span>
                    </div>
                  }
                />
                <Input
                  type='number'
                  label='Precio de costo'
                  labelPlacement='outside'
                  placeholder='0.00'
                  variant='bordered'
                  size='sm'
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>$</span>
                    </div>
                  }
                />

                <Select
                  label='Calculo de precio'
                  placeholder='Select an animal'
                  labelPlacement='outside'
                  variant='bordered'
                  defaultSelectedKeys={['cero']}
                  size='sm'
                >
                  <SelectItem value={'cero'} key={'cero'}>
                    cero
                  </SelectItem>
                  <SelectItem key={2}>cero</SelectItem>
                </Select>
              </div>
              <Select
                label='Politica de precio'
                labelPlacement='outside'
                placeholder='Select an animal'
                variant='bordered'
                defaultSelectedKeys={['cero']}
                size='sm'
              >
                <SelectItem value={'cero'} key={'cero'}>
                  cero
                </SelectItem>
              </Select>
              <div className='rowmodaladdproduct flex gap-3'>
                <Input
                  type='number'
                  label='Neto 1'
                  isDisabled
                  labelPlacement='outside'
                  placeholder='0.00'
                  variant='bordered'
                  size='sm'
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>$</span>
                    </div>
                  }
                />
                <Input
                  type='number'
                  label='Neto 2'
                  labelPlacement='outside'
                  isDisabled
                  placeholder='0.00'
                  variant='bordered'
                  size='sm'
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>$</span>
                    </div>
                  }
                />
                <Input
                  type='number'
                  label='Neto 3'
                  labelPlacement='outside'
                  placeholder='0.00'
                  isDisabled
                  variant='bordered'
                  size='sm'
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>$</span>
                    </div>
                  }
                />
                <Input
                  type='number'
                  labelPlacement='outside'
                  label='Neto 4'
                  placeholder='0.00'
                  isDisabled
                  variant='bordered'
                  size='sm'
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>$</span>
                    </div>
                  }
                />
              </div>
              <div className='rowmodalpricesproduct flex gap-3'>
                <Select
                  label='Proveedores'
                  labelPlacement='outside'
                  placeholder='Selecciona un proveedor'
                  variant='bordered'
                  size='sm'
                >
                  <SelectItem key={2}>Proveedor</SelectItem>
                </Select>
                <Input
                  type='number'
                  label='Precio Financiado'
                  labelPlacement='outside'
                  placeholder='0.00'
                  variant='bordered'
                  size='sm'
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>$</span>
                    </div>
                  }
                />
                <Input
                  type='number'
                  label='Precio Amigo'
                  labelPlacement='outside'
                  placeholder='0.00'
                  variant='bordered'
                  size='sm'
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>$</span>
                    </div>
                  }
                />
                <Input
                  type='number'
                  label='Precio tarjeta'
                  labelPlacement='outside'
                  placeholder='0.00'
                  variant='bordered'
                  size='sm'
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>$</span>
                    </div>
                  }
                />
              </div>

              <Checkbox defaultSelected>Producto envasado</Checkbox>
              <Input
                type='number'
                label='Cantidad x paquete'
                labelPlacement='outside'
                placeholder='0.00'
                variant='bordered'
                isDisabled
                size='sm'
                endContent={
                  <div className='pointer-events-none flex items-center'>
                    <span className='text-default-400 text-small'>$</span>
                  </div>
                }
              />
              <Textarea
                label='Description'
                variant='bordered'
                labelPlacement='outside'
                placeholder='Enter your description'
              ></Textarea>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' variant='light' onPress={onClose}>
              Cerrar
            </Button>
            <Button color='primary' onPress={() => handleAddNewUser()}>
              Agregar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
