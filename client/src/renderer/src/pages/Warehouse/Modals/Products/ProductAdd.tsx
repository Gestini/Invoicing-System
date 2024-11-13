import React from 'react'
import {
  Modal,
  Input,
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
import { addItem } from '@renderer/features/tableSlice'
import { PlusIcon } from '@renderer/components/Icons/PlusIcon'
import { RootState } from '@renderer/store'
import { handleValidation } from './utils'
import { useDispatch, useSelector } from 'react-redux'
import {
  reqCreateProduct,
  reqSearchSupplierByName,
  reqSearchProductCategoryByName,
} from '@renderer/api/requests'
import { SearchAutocomplete } from '@renderer/components/SearchAutocomplete'

export const AddProductModal = () => {
  const dispatch = useDispatch()
  const [errors, setErrors] = React.useState({ name: '' })
  const warehouse = useSelector((state: RootState) => state.unit.warehouse)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [info, setInfo] = React.useState({})

  React.useEffect(() => {
    setInfo({
      depositId: warehouse.currentWarehouseId,
    })

    setErrors({ name: '' })
  }, [isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    })
    handleValidation(e.target.name, e.target.value)
  }

  const onSubmit = async () => {
    try {
      console.log(info)
      const allValid = Object.keys({ name: '' }).every((name) => {
        const validate = handleValidation(name, info[name])
        setErrors((prev) => ({
          ...prev,
          [name]: validate.isValid ? '' : validate.errorMessage,
        }))
        return validate.isValid
      })

      if (!allValid) return

      const response = await reqCreateProduct(info)
      dispatch(addItem(response.data))
      onClose()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <Button
        onPress={onOpen}
        className='bg-c-filter shadow-sm text-c-text'
        color='secondary'
        startContent={<PlusIcon className='text-c-primary-variant-1' />}
        radius='sm'
      >
        Agregar
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size='5xl'
        scrollBehavior={'inside'}
        backdrop='blur'
        className='bg-c-card'
        placement='center'
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            <h3 className='text-c-title'>Agrega un nuevo producto</h3>
          </ModalHeader>
          <ModalBody>
            <div className='productsmodaladd w-full flex flex-col gap-3  '>
              <div className='justify-start items-start flex gap-3'>
                <Input
                  name='name'
                  label='Nombre'
                  isRequired
                  size='sm'
                  labelPlacement='outside'
                  placeholder='Nombre del producto'
                  variant='bordered'
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                />
                <SearchAutocomplete
                  label='Categoría'
                  itemKey='id'
                  itemLabel='name'
                  setSelectedItem={(item) => {
                    setInfo((prevInfo) => ({
                      ...prevInfo,
                      categoryId: item?.id,
                    }))
                  }}
                  searchFunction={(searchValue: string) =>
                    reqSearchProductCategoryByName(searchValue).then((res) => res.data)
                  }
                />
                <Input
                  name='quantity'
                  type='number'
                  label='Cantidad'
                  size='sm'
                  labelPlacement='outside'
                  placeholder='Cantidad de productos'
                  variant='bordered'
                  onChange={handleChange}
                />
              </div>
              <div className='flex gap-3'>
                <Input
                  label='Code'
                  size='sm'
                  name='barcode'
                  labelPlacement='outside'
                  placeholder='Codigo #1'
                  variant='bordered'
                  onChange={handleChange}
                />
                <Input
                  label='Precio'
                  size='sm'
                  name='price'
                  labelPlacement='outside'
                  placeholder='Precio'
                  variant='bordered'
                  onChange={handleChange}
                />
              </div>
              <div className='select flex items-start justify-start gap-3'>
                <SearchAutocomplete
                  label='Proveedor'
                  itemKey='id'
                  itemLabel='name'
                  setSelectedItem={(item) => {
                    setInfo((prevInfo) => ({
                      ...prevInfo,
                      supplierId: item?.id,
                    }))
                  }}
                  searchFunction={(searchValue: string) =>
                    reqSearchSupplierByName(searchValue).then((res) => res.data)
                  }
                />
                <Select
                  label='Estado'
                  labelPlacement='outside'
                  placeholder='Disponibilidad'
                  variant='bordered'
                  name='status'
                  onChange={handleChange}
                  size='sm'
                  className='text-c-title'
                >
                  <SelectItem value='AVAILABLE' key='AVAILABLE'>
                    Disponible
                  </SelectItem>
                  <SelectItem value='NOTAVAILABLE' key='NOTAVAILABLE'>
                    No disponible
                  </SelectItem>
                </Select>
              </div>
              <Textarea
                name='description'
                label='Description'
                variant='bordered'
                onChange={handleChange}
                labelPlacement='outside'
                placeholder='Ingresa la descripción'
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' variant='light' radius='sm' onPress={onClose}>
              Cerrar
            </Button>
            <Button color='primary' onPress={onSubmit} radius='sm' className='bg-c-primary'>
              Agregar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
