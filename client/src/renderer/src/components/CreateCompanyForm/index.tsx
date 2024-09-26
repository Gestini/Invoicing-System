import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  Tooltip,
  useDisclosure,
} from '@nextui-org/react'
import { reqCreateUnit } from '@renderer/api/requests'
import { PlusIcon } from '@renderer/components/Icons'
import { addUnit } from '@renderer/features/unitsSlice'
import { uploadImage } from '@renderer/utils/DigitalOcean/uploadImage'
import React from 'react'
import { useDispatch } from 'react-redux'
import './createCompany.scss'
import { fieldConfig } from './data'
import { GoUpload } from 'react-icons/go'

export const CreateUnitModal = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const dispatch = useDispatch()
  const [loading, setLoading] = React.useState(false)
  const [file, setFile] = React.useState<File | null>(null)
  const [data, setData] = React.useState<{
    name: string
    description: string
    image: string | undefined // Allow image to be string or undefined
  }>({
    name: '',
    description: '',
    image: undefined, // Initialize as undefined
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
    const newErrors: { [key: string]: string } = {}
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async () => {
    if (!validateInputs()) return
    setLoading(true)

    try {
      let imageUrl: string | undefined = undefined

      // Check if file is not null before uploading
      if (file) {
        imageUrl = (await uploadImage(file)) || undefined // Handle potential null response
      }

      // Update the state `data` with the URL of the image
      setData((prev) => ({ ...prev, image: imageUrl }))

      // Wait for `data` state to be updated with the image
      const updatedData = { ...data, image: imageUrl }

      // Send the data to the backend
      const res = await reqCreateUnit(updatedData)
      dispatch(addUnit(res.data))
      setLoading(false)
      onClose()
    } catch (error) {
      console.error('Error en la creación de la unidad:', error)
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
          content: 'bg-c-sidebar-bg-2 text-c-title',
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
        size='xl'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior={'inside'}
        backdrop='blur'
        placement='center'
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            <h3 className='default-text-color'>Crear empresa</h3>
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <div className='text-center mb-4'>
                <div>
                  <div className='flex flex-col items-center justify-center w-full'>
                    <span className='text-gray-500 mb-2 font-bold text-sm text-center'>Logo</span>
                    <label className='relative flex flex-col items-center justify-center w-24 h-24 bg-transparent border border-c-border rounded-lg cursor-pointer transition duration-300 overflow-hidden'>
                      {file ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt='Logo Empresa'
                          className='w-full h-full object-cover'
                        />
                      ) : (
                        <>
                          <GoUpload className='text-gray-500 text-2xl mb-2' />
                          <span className='text-gray-500 text-sm'>Seleccionar</span>
                        </>
                      )}
                      <input
                        type='file'
                        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                        className='hidden'
                        accept='image/*'
                      />
                    </label>
                    {file && (
                      <button
                        onClick={() => setFile(null)}
                        className='mt-2 text-red-500 text-sm underline hover:text-red-700 text-left'
                      >
                        Eliminar imagen
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div>
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
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' variant='light' onPress={onClose} radius='sm'>
              Cerrar
            </Button>
            <Button
              onClick={handleSubmit}
              color='secondary'
              radius='sm'
              className='bg-c-primary'
              isLoading={loading}
              type='submit'
            >
              {loading ? 'Cargando...' : 'Crear'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
