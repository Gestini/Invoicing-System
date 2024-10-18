import React from 'react'
import {
  Input,
  Modal,
  Select,
  Button,
  Textarea,
  ModalBody,
  SelectItem,
  ModalFooter,
  ModalHeader,
  ModalContent,
} from '@nextui-org/react'
import { addItem } from '@renderer/features/tableSlice'
import { PlusIcon } from '@renderer/components/Icons/PlusIcon'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { reqCreateSupplier } from '@renderer/api/requests'
import { modalTypes, useModal } from '@renderer/utils/useModal'
import './ProductAdd.scss'

export const AddSupplierModal = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const [isOpen, toggleModal] = useModal(modalTypes.createSupplierModal)

  const initialData = {
    dni: null,
    name: '',
    phone: null,
    email: null,
    address: null,
    website: null,
    description: null,
    supplierType: null,
    reasonSocial: null,
    saleCondition: null,
  }

  const [data, setData] = React.useState(initialData)

  const [errors, setErrors] = React.useState({
    name: '',
  })

  React.useEffect(() => {
    setData(initialData)
    setErrors({
      name: '',
    })
  }, [isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })

    handleValidation(e.target.name, e.target.value)
  }

  const handleValidation = (name: string, value: string) => {
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

  const handleSubmit = async () => {
    let valid = true
    const newErrors = {
      name: '',
    }

    if (!validateName(data.name)) {
      newErrors.name = 'Por favor, ingresa un nombre válido.'
      valid = false
    }

    setErrors(newErrors)
    if (!valid) {
      return
    }

    // Filtrar los datos para enviar solo los que no son nulos o vacíos
    const filteredData = Object.keys(data)
      .filter((key) => data[key] !== null && data[key] !== '')
      .reduce((obj, key) => {
        obj[key] = data[key]
        return obj
      }, {})

    const response = await reqCreateSupplier(params.unitId, filteredData)
    dispatch(addItem(response.data))
    toggleModal()
  }

  const validateName = (name) => {
    if (!name.trim()) {
      return false // Nombre está vacío
    }
    return true // Nombre no está vacío
  }

  return (
    <div className='flex flex-col gap-2'>
      <Button
        onPress={toggleModal}
        className='bg-c-primary'
        color='secondary'
        endContent={<PlusIcon />}
        radius='sm'
      >
        Agregar
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={toggleModal}
        size='5xl'
        scrollBehavior={'inside'}
        backdrop='blur'
        className='bg-c-card'
        placement='center'
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            <h3 className='text-c-title'>Agrega un nuevo proveedor</h3>
          </ModalHeader>
          <ModalBody>
            <div className='productsmodaladd w-full flex flex-col gap-3'>
              <div className='rowmodaladdproduct justify-start items-start flex gap-3'>
                <Input
                  name='name'
                  label='Nombre'
                  isRequired
                  size='sm'
                  labelPlacement='outside'
                  placeholder='Nombre del proveedor'
                  variant='bordered'
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
                  className='text-c-title'
                >
                  <SelectItem key={'productos'}>Productos</SelectItem>
                  <SelectItem key={'servicios'}>Servicios</SelectItem>
                </Select>
                <Select
                  label='Condicion de venta'
                  labelPlacement='outside'
                  placeholder='Selecciona una condición'
                  variant='bordered'
                  name='saleCondition'
                  onChange={handleChange}
                  size='sm'
                  className='text-c-title'
                >
                  <SelectItem key={'contado'}>Contado</SelectItem>
                  <SelectItem key={'financiado'}>Financiado</SelectItem>
                </Select>
              </div>
              <div className='rowmodaladdproduct justify-start items-start flex gap-3'>
                <Textarea
                  label='Descripción'
                  variant='bordered'
                  name='description'
                  onChange={handleChange}
                  labelPlacement='outside'
                  placeholder='Ingresa la descripción'
                />
              </div>
              <div className='rowmodaladdproduct justify-start items-start flex gap-3'>
                <Input
                  label='Número de celular'
                  size='sm'
                  name='phone'
                  labelPlacement='outside'
                  placeholder='Número del proveedor'
                  variant='bordered'
                  onChange={handleChange}
                />
                <Input
                  label='Email'
                  size='sm'
                  name='email'
                  labelPlacement='outside'
                  placeholder='Email del proveedor'
                  variant='bordered'
                  onChange={handleChange}
                />
                <Input
                  label='Website'
                  size='sm'
                  name='website'
                  labelPlacement='outside'
                  placeholder='www.url.com'
                  variant='bordered'
                  onChange={handleChange}
                />
              </div>
              <div className='rowmodaladdproduct select flex items-start justify-start gap-3'>
                <Input
                  label='DNI/CUIL'
                  size='sm'
                  name='dni'
                  labelPlacement='outside'
                  placeholder='Ingresa el dni'
                  variant='bordered'
                  onChange={handleChange}
                />
                <Input
                  label='Dirección del proveedor'
                  size='sm'
                  name='address'
                  labelPlacement='outside'
                  placeholder='Ingresa la dirección'
                  variant='bordered'
                  onChange={handleChange}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' variant='light' onPress={toggleModal} radius='sm'>
              Cerrar
            </Button>
            <Button color='primary' className='bg-c-primary' onPress={handleSubmit} radius='sm'>
              Agregar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
