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
  useDisclosure,
} from '@nextui-org/react'
import { RootState } from '@renderer/store'
import { useParams } from 'react-router-dom'
import { setCurrentItemId } from '@renderer/features/tableSlice'
import { useDispatch, useSelector } from 'react-redux'

export const EditSupplierModal = ({ modal }) => {
  const dispatch = useDispatch()
  const params = useParams()

  const [data, setData] = React.useState({
    businessUnit: {
      id: params.unitId,
    },
  })

  const [errors, setErrors] = React.useState({
    name: '',
  })
  const users = useSelector((state: RootState) => state.unit.table.data)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const currentItemIdEdit = useSelector((state: RootState) => state.unit.table.currentItemIdEdit)
  const currentUserEdit = users.find((item: { id: any }) => item.id == currentItemIdEdit)

  React.useEffect(() => {
    if (currentItemIdEdit !== -1) onOpen()
  }, [currentItemIdEdit])

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

  const handleAddNewUser = async () => {
    modal.action(currentUserEdit.id, data)
    handleResetCurrentIdEdit()
    setData({
      businessUnit: {
        id: params.unitId,
      },
    })
    onClose()
  }

  return (
    <div className='flex flex-col gap-2'>
      <Modal
        isOpen={isOpen}
        onClose={handleResetCurrentIdEdit}
        backdrop='blur'
        onOpenChange={onOpenChange}
        scrollBehavior={'inside'}
        size='5xl'
        placement='center'
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            <h3 className='default-text-color'>{modal?.title}</h3>
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
                  defaultValue={currentUserEdit ? currentUserEdit.name : ''}
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
                    currentUserEdit ? String(currentUserEdit.supplierType) : '',
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
                    currentUserEdit ? String(currentUserEdit.saleCondition) : '',
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
                  defaultValue={currentUserEdit ? currentUserEdit.description : ''}
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
                  defaultValue={currentUserEdit ? currentUserEdit.phone : ''}
                  onChange={handleChange}
                />
                <Input
                  label='Email'
                  size='sm'
                  name='email'
                  labelPlacement='outside'
                  placeholder='Email del proveedor'
                  defaultValue={currentUserEdit ? currentUserEdit.email : ''}
                  variant='bordered'
                  onChange={handleChange}
                />
                <Input
                  label='Website'
                  size='sm'
                  name='website'
                  labelPlacement='outside'
                  placeholder='www.url.com'
                  defaultValue={currentUserEdit ? currentUserEdit.website : ''}
                  variant='bordered'
                  onChange={handleChange}
                />
              </div>
              <div className='rowmodaladdproduct select flex items-start justify-start gap-3'>
                <Input
                  label='DNI/CUIL'
                  size='sm'
                  name='dni'
                  defaultValue={currentUserEdit ? currentUserEdit.dni : ''}
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
                  defaultValue={currentUserEdit ? currentUserEdit.address : ''}
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
                onClose()
              }}
            >
              Cerrar
            </Button>
            <Button
              color='primary'
              className='bg-c-primary'
              onPress={() => handleAddNewUser()}
              radius='sm'
            >
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
