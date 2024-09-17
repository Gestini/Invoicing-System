import React from 'react'
import toast from 'react-hot-toast'
import { uploadImage } from '@renderer/utils/DigitalOcean/uploadImage'
import { editCurrentUnit } from '@renderer/features/currentUnitSlice'
import { reqUpdateUnitById } from '@renderer/api/requests'
import { Button, Input, Switch } from '@nextui-org/react'
import { useDispatch, useSelector } from 'react-redux'

const Index = () => {
  const unit = useSelector((state: any) => state.currentUnit)
  const [file, setFile] = React.useState<File | null>(null)
  const [loading, setLoading] = React.useState(false)
  const dispatch = useDispatch()

  const [data, setData] = React.useState({
    name: unit?.name,
    link: unit?.link,
    image: unit?.image,
    ecommerce: unit?.ecommerce,
    description: unit?.description,
  })

  React.useEffect(() => {
    setData({
      name: unit?.name,
      link: unit?.link,
      image: unit?.image,
      ecommerce: unit?.ecommerce,
      description: unit?.description,
    })
  }, [unit])

  const handleEcommerceChange = async () => {
    const newEcommerceValue = !data.ecommerce

    dispatch(
      editCurrentUnit({
        data: {
          ecommerce: newEcommerceValue,
        },
      }),
    )

    await reqUpdateUnitById(unit?.id, {
      ecommerce: newEcommerceValue,
    })
  }

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setData({ ...data, [field]: e.target.value })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    setFile(file)

    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setData((prev) => ({ ...prev, image: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      let imageUrl = data.image

      if (file) {
        imageUrl = await uploadImage(file)
      }

      await reqUpdateUnitById(unit?.id, {
        name: data.name,
        link: data.link,
        image: imageUrl,
        ecommerce: data.ecommerce,
        description: data.description,
      })

      dispatch(editCurrentUnit({ data }))

      toast.success('Guardado correctamente')
    } catch (error) {
      toast.error('Error al guardar los cambios')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='relative w-[100px] h-[100px] cursor-pointer rounded-md overflow-hidden'>
        {data.image ? (
          <>
            <input
              type='file'
              id='fileInput'
              className='hidden'
              accept='image/*'
              onChange={handleFileChange}
            />
            <label htmlFor='fileInput' className='block w-full h-full'>
              <img
                id='previewImage'
                src={data.image}
                alt='Preview Image'
                className='w-full h-full object-contain rounded-lg'
              />
              <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-lg font-semibold opacity-0 hover:opacity-100 transition-opacity rounded-lg'>
                Editar
              </div>
            </label>
          </>
        ) : (
          <>
            <input
              type='file'
              id='fileInput'
              className='hidden'
              accept='image/*'
              onChange={handleFileChange}
            />
            <label
              htmlFor='fileInput'
              className='block w-full h-full bg-c-card overflow-hidden rounded-md'
            >
              <div
                id='previewImage'
                className='w-full h-full object-contain rounded-lg overflow-hidden flex justify-center items-center uppercase text-[40px] font-semibold text-c-title'
              >
                {data.name.slice(0, 2)}
              </div>
              <div className='absolute  inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-lg font-semibold opacity-0 hover:opacity-100 transition-opacity rounded-lg'>
                Editar
              </div>
            </label>
          </>
        )}
      </div>
      <div className='flex flex-col gap-1'>
        <span className='text-c-title'>Habilitar tienda en línea</span>
        <Switch
          isSelected={data.ecommerce}
          onChange={handleEcommerceChange}
          aria-label='Automatic updates'
        />
      </div>
      <div className='flex flex-col gap-1'>
        <span className='text-c-title'>Nombre de unidad</span>
        <Input
          type='text'
          variant='underlined'
          placeholder='Nombre de la unidad'
          labelPlacement='outside'
          value={data.name}
          onChange={handleInputChange('name')}
        />
      </div>
      <div className='flex flex-col gap-1'>
        <span className='text-c-title'>Descripción</span>
        <Input
          type='text'
          variant='underlined'
          placeholder='Descripción de la unidad'
          labelPlacement='outside'
          value={data.description}
          onChange={handleInputChange('description')}
        />
      </div>
      <div>
        <span className='text-c-title'>Mi dominio</span>
        <div className='rounded-sm border-none outline-none'>
          <Input
            type='url'
            variant='underlined'
            placeholder='tuempresa.com'
            labelPlacement='outside'
            value={data.link}
            onChange={handleInputChange('link')}
            startContent={
              <div className='pointer-events-none flex items-center'>
                <span className='text-default-400 text-small'>http://gestini.</span>
              </div>
            }
            endContent={
              <div className='pointer-events-none flex items-center'>
                <span className='text-default-400 text-small'>.com</span>
              </div>
            }
          />
        </div>
      </div>
      <Button color='primary' className='w-[100px] mt-2' onClick={handleSave} isLoading={loading}>
        {loading ? 'Guardando...' : 'Guardar'}
      </Button>
    </div>
  )
}

export default Index
