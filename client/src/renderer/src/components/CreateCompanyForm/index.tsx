import React from 'react'
import Logo from '../../assets/electron.svg'
import {
  Input,
  Modal,
  Button,
  Tooltip,
  Textarea,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure,
} from '@nextui-org/react'
import { addUnit } from '@renderer/features/unitsSlice'
import { PlusIcon } from '@renderer/components/Icons'
import { GoUpload } from 'react-icons/go'
import { useDispatch } from 'react-redux'
import { fieldConfig } from './data'
import { reqCreateUnit } from '@renderer/api/requests'
import './createCompany.scss'

export const CreateUnitModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const dispatch = useDispatch()
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState({
    name: '',
    link: '',
    description: '',
  })
  const [errors, setErrors] = React.useState({})

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const validateInputs = () => {
    const newErrors = {}
    let isValid = true

    fieldConfig.forEach((field) => {
      if (data[field.name].trim() === '') {
        newErrors[field.name] = `El campo ${field.label} es requerido`
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async () => {
    if (!validateInputs()) return
    setLoading(true)
    try {
      const res = await reqCreateUnit(data)
      dispatch(addUnit(res.data))
      setLoading(false)
      onClose()
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <Tooltip
        placement='right'
        content={'Añadir unidad'}
        color='secondary'
        classNames={{
          content: 'bg-c-sidebar-bg-2',
        }}
      >
        <div
          onClick={onOpen}
          className={`bg-c-sidebar-bg text-c-primary-variant-1 rounded-[100%] flex items-center content-center transition-all duration-600 p-1 cursor-pointer`}
        >
          <PlusIcon />
        </div>
      </Tooltip>
      <Modal
        size='2xl'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={'inside'}
        backdrop='blur'
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            <h3 className='default-text-color'>Crear unidad</h3>
          </ModalHeader>
          <ModalBody>
            <div className='text-center mb-6'>
              <div className='flex justify-center items-center'>
                <img className='w-8 h-8 mb-4' src={Logo} alt='logo' />
              </div>
              <h1 className='font-bold mb-2 text-gray-500 text-2xl'>
                Completa los datos de tu empresa para empezar a administrar tu unidad de negocio
              </h1>
            </div>
            <div>
              <div className='flex items-center justify-center w-full h-14 mb-4'>
                <label className='flex flex-col p-2 items-center bg-c-primary rounded-lg tracking-wide border border-blue cursor-pointer hover:bg-c-primary-hover transition-all duration-300'>
                  <GoUpload />
                  <span className='text-c-title text-[12px]'>Selecciona una foto</span>
                  <input type='file' className='hidden' accept='image/*' />
                </label>
              </div>
              {fieldConfig.map((field, index) => {
                const commonProps = {
                  name: field.name,
                  value: data[field.name],
                  onChange: handleInputChange,
                  isInvalid: !!errors[field.name],
                  errorMessage: errors[field.name],
                  placeholder: field.placeholder,
                  maxLength: field.maxLength,
                  className: 'mb-4',
                }

                return field.type === 'textarea' ? (
                  <Textarea
                    key={index}
                    {...commonProps}
                    variant='bordered'
                    label={field.label}
                    radius='sm'
                  />
                ) : (
                  <Input
                    key={index}
                    {...commonProps}
                    type={field.type}
                    variant='bordered'
                    label={field.label}
                    radius='sm'
                  />
                )
              })}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' variant='light' onPress={onClose} radius='sm'>
              Cerrar
            </Button>
            <Button
              color='secondary'
              radius='sm'
              className='bg-c-primary'
              isLoading={loading}
              onClick={handleSubmit}
            >
              {loading ? 'Cargando...' : 'Crear'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
