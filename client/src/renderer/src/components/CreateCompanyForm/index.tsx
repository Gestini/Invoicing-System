import React from 'react'
import {
  Button,
  Input,
  Modal,
  Textarea,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
} from '@nextui-org/react'
import { GoUpload } from 'react-icons/go'
import { RootState } from '@renderer/store'
import { useSelector } from 'react-redux'
import { uploadImage } from '@renderer/utils/DigitalOcean/uploadImage'
import { fieldConfig } from './data'
import { reqCreateUnit } from '@renderer/api/requests'
import './createCompany.scss'

export const CreateUnitModal = ({ isOpen, closeModal }) => {
  const unit = useSelector((state: RootState) => state.currentUnit)
  const [loading, setLoading] = React.useState(false)
  const [file, setFile] = React.useState<File | null>(null)
  const [data, setData] = React.useState<{
    name: string
    description: string
    company: any
    image: string | undefined // Allow image to be string or undefined
  }>({
    name: '',
    description: '',
    company: {
      id: unit.company.id,
    },
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
      await reqCreateUnit(updatedData)
      setLoading(false)
      closeModal()
    } catch (error) {
      console.error('Error en la creación de la unidad:', error)
      setLoading(false)
    }
  }

  return (
    <Modal
      size='xl'
      isOpen={isOpen}
      onOpenChange={closeModal}
      scrollBehavior={'inside'}
      backdrop='blur'
      placement='center'
    >
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>
          <h3 className='default-text-color'>Crear sucursal</h3>
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
                        alt='Logo sucursal'
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
          <Button color='danger' variant='light' onPress={closeModal} radius='sm'>
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
  )
}
