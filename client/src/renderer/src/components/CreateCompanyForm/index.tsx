import React from 'react'
import Logo from '../../assets/electron.svg'
import { addUnit } from '@renderer/features/unitsSlice'
import { GoUpload } from 'react-icons/go'
import { useDispatch } from 'react-redux'
import { reqCreateUnit } from '@renderer/api/requests'
import { Button, Input, Modal, ModalContent, Textarea } from '@nextui-org/react'
import './createCompany.scss'

interface MultiStepFormProps {
  isOpen: boolean
  onClose: () => void
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = React.useState(false)
  const [data, setData] = React.useState<any>({
    name: '',
    link: '',
    description: '',
  })

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await reqCreateUnit(data)
      dispatch(addUnit(res.data))
      setLoading(false)
      onClose()
    } catch (error) {
      return
    }
  }

  return (
    <Modal size='2xl' isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <form
          onSubmit={handleSubmit}
          className='animate-zoom-in-out w-full max-w-3xl py-5 px-10 bg-c-card rounded shadow-lg relative overflow-hidden'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='text-center mb-6'>
            <div className='flex justify-center items-center'>
              <img className='w-8 h-8 mb-4' src={Logo} alt='logo' />
            </div>
            <h1 className='font-bold mb-2 text-gray-300 text-2xl'>
              Llena los detalles de tu empresa para empezar a administrar ventas, inventario,
              facturación y mas.
            </h1>
          </div>
          <div>
            <div className='flex items-center justify-center w-full h-14 mb-4'>
              <label className='flex flex-col p-2 items-center bg-c-primary rounded-lg  tracking-wide border border-blue cursor-pointer hover:bg-c-primary-hover transition-all duration-300'>
                <GoUpload />
                <span className='text-c-title text-[12px]'>Selecciona una foto</span>
                <input type='file' className='hidden ' accept='image/*' />
              </label>
            </div>
            <Input
              type='text'
              variant='bordered'
              label='Nombre'
              name='name'
              value={data.name}
              radius='sm'
              onChange={handleInputChange}
              placeholder='Nombre de la empresa'
              className='mb-4'
              maxLength={30}
            />
            <Textarea
              type='text'
              variant='bordered'
              label='Descripcion'
              name='description'
              value={data.description}
              radius='sm'
              onChange={handleInputChange}
              placeholder='Descripcion de la empresa'
              className='mb-4'
              maxLength={200}
            />
            <Input
              type='text'
              variant='bordered'
              label='Link'
              name='link'
              value={data.link}
              radius='sm'
              onChange={handleInputChange}
              placeholder='Url de la empresa'
              className='mb-4'
              maxLength={50}
            />
            <Button color='secondary' className='bg-c-primary' isLoading={loading} type='submit'>
              {loading ? 'Cargando...' : 'Crear'}
            </Button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default MultiStepForm
