import React from 'react'
import {
  Input,
  Modal,
  Button,
  Select,
  Textarea,
  ModalBody,
  SelectItem,
  ModalFooter,
  ModalHeader,
  ModalContent,
} from '@nextui-org/react'
import { RootState } from '@renderer/store'
import { useParams } from 'react-router-dom'
import { reqEditSupplier } from '@renderer/api/requests'
import { useModal, modalTypes } from '@renderer/utils/useModal'
import { useDispatch, useSelector } from 'react-redux'
import { editItem, setCurrentItemId } from '@renderer/features/tableSlice'

export const EditSupplierModal = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const table = useSelector((state: RootState) => state.unit.table)
  const currentItemEdit = table.data.find((item) => item.id == table.currentItemIdEdit)

  const [isOpen, toggleModal] = useModal(modalTypes.editSupplierModal)

  const [data, setData] = React.useState({
    businessUnit: {
      id: params.unitId,
    },
  })

  const [errors, setErrors] = React.useState({
    name: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let name = e.target.name
    let value = e.target.value
    let intValues = ['age']

    setData({
      ...data,
      [name]: intValues.includes(name) ? parseInt(value) : value,
    })

    handleValidation(e.target.name, e.target.value)
  }

  const handleValidation = (name, value) => {
    let newErrors = { ...errors }

    switch (name) {
      case 'name':
        if (!validateName(value)) {
          newErrors.name = 'Por favor, ingresa un nombre válido.'
        } else {
          newErrors.name = ''
        }
        break
      default:
        break
    }

    setErrors(newErrors)
  }

  const validateName = (name) => {
    if (!name.trim()) {
      return false // Nombre está vacío
    }
    return true // Nombre no está vacío
  }

  const handleResetCurrentIdEdit = () => dispatch(setCurrentItemId(-1))

  const onSubmit = async () => {
    reqEditSupplier(currentItemEdit.id, data)
    dispatch(editItem({ data, id: currentItemEdit.id }))

    handleResetCurrentIdEdit()
    setData({
      businessUnit: {
        id: params.unitId,
      },
    })
    toggleModal()
  }

  return (
    <div className='flex flex-col gap-2'>
      <Modal
        isOpen={isOpen}
        onClose={handleResetCurrentIdEdit}
        backdrop='blur'
        onOpenChange={toggleModal}
        scrollBehavior={'inside'}
        size='5xl'
        placement='center'
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            <h3 className='default-text-color'>Editar proveedor</h3>
          </ModalHeader>
          <ModalBody>
            <div className='productsmodaladd w-full flex flex-col gap-3  '>
              <div className='rowmodaladdproduct justify-start items-start flex gap-3'>
                <Input
                  name='name'
                  label='Nombre'
                  isRequired
                  size='sm'
                  labelPlacement='outside'
                  placeholder='Nombre del proveedor'
                  variant='bordered'
                  defaultValue={currentItemEdit ? currentItemEdit.name : ''}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <Select
                  label='Tipo de proveedor'
                  labelPlacement='outside'
                  placeholder='Selecciona un tipo'
                  variant='bordered'
                  name='supplierType'
                  onChange={handleChange}
                  size='sm'
                  defaultSelectedKeys={[
                    currentItemEdit ? String(currentItemEdit.supplierType) : '',
                  ]}
                  className='text-c-title'
                >
                  <SelectItem key={'productos'}>Productos</SelectItem>
                  <SelectItem key={'servicios'}>servicios</SelectItem>
                </Select>
                <Select
                  label='Condicion de venta'
                  labelPlacement='outside'
                  placeholder='Selecciona una condicion'
                  variant='bordered'
                  name='saleCondition'
                  onChange={handleChange}
                  size='sm'
                  className='text-c-title'
                  defaultSelectedKeys={[
                    currentItemEdit ? String(currentItemEdit.saleCondition) : '',
                  ]}
                >
                  <SelectItem key={'contado'}>contado</SelectItem>
                  <SelectItem key={'financiado'}>financiado</SelectItem>
                </Select>
              </div>
              <div className='rowmodaladdproduct justify-start items-start flex gap-3'>
                <Textarea
                  label='Description'
                  variant='bordered'
                  name='description'
                  onChange={handleChange}
                  labelPlacement='outside'
                  defaultValue={currentItemEdit ? currentItemEdit.description : ''}
                  placeholder='Enter your description'
                />
              </div>
              <div className='rowmodaladdproduct justify-start items-start flex gap-3'>
                <Input
                  label='Numero de celular'
                  size='sm'
                  name='phone'
                  labelPlacement='outside'
                  placeholder='Numero del proveedor'
                  variant='bordered'
                  defaultValue={currentItemEdit ? currentItemEdit.phone : ''}
                  onChange={handleChange}
                />
                <Input
                  label='Email'
                  size='sm'
                  name='email'
                  labelPlacement='outside'
                  placeholder='Email del proveedor'
                  defaultValue={currentItemEdit ? currentItemEdit.email : ''}
                  variant='bordered'
                  onChange={handleChange}
                />
                <Input
                  label='Website'
                  size='sm'
                  name='website'
                  labelPlacement='outside'
                  placeholder='www.url.com'
                  defaultValue={currentItemEdit ? currentItemEdit.website : ''}
                  variant='bordered'
                  onChange={handleChange}
                />
              </div>
              <div className='rowmodaladdproduct select flex items-start justify-start gap-3'>
                <Input
                  label='DNI/CUIL'
                  size='sm'
                  name='dni'
                  defaultValue={currentItemEdit ? currentItemEdit.dni : ''}
                  labelPlacement='outside'
                  placeholder='Ingresa el dni'
                  variant='bordered'
                  onChange={handleChange}
                />
                <Input
                  label='Direccion del proveedor'
                  size='sm'
                  name='address'
                  labelPlacement='outside'
                  defaultValue={currentItemEdit ? currentItemEdit.address : ''}
                  placeholder='Ingresa la direccion'
                  variant='bordered'
                  onChange={handleChange}
                />
              </div>
              <div className='rowmodaladdproduct select flex items-start justify-start gap-3'></div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color='danger'
              variant='light'
              onPress={() => {
                handleResetCurrentIdEdit()
                toggleModal()
              }}
            >
              Cerrar
            </Button>
            <Button color='primary' className='bg-c-primary' onPress={() => onSubmit()} radius='sm'>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
