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
} from '@nextui-org/react'
import { RootState } from '@renderer/store'
import { reqEditProduct } from '@renderer/api/requests'
import { SearchAutocomplete } from '@renderer/components/SearchAutocomplete'
import { modalTypes, useModal } from '@renderer/utils/useModal'
import { useDispatch, useSelector } from 'react-redux'
import { editItem, setCurrentItemId } from '@renderer/features/tableSlice'
import { handleValidation, initialErrors } from './utils'
import { reqSearchProductCategoryByName, reqSearchSupplierByName } from '@renderer/api/requests'

export const EditProductModal = () => {
  const dispatch = useDispatch()
  const [data, setData] = React.useState({})
  const [originalData, setOriginalData] = React.useState({})
  const [errors, setErrors] = React.useState(initialErrors)
  const [isOpen, toggleModal] = useModal(modalTypes.editProductModal)

  const table = useSelector((state: RootState) => state.unit.table)
  const unit = useSelector((state: RootState) => state.currentUnit)
  const currentItemIdEdit = useSelector((state: RootState) => state.unit.table.currentItemIdEdit)
  const currentProductEdit = table.data.find((item) => item.id == currentItemIdEdit)

  React.useEffect(() => {
    if (currentProductEdit) {
      setData(currentProductEdit)
      setOriginalData(currentProductEdit)
    }
  }, [currentProductEdit, unit.id])

  const handleResetCurrentIdEdit = () => dispatch(setCurrentItemId(-1))

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    setData((prev) => ({
      ...prev,
      [name]: value,
    }))

    const validate = handleValidation(name, value)
    setErrors((prev) => ({
      ...prev,
      [validate.name]: validate.isValid ? '' : validate.errorMessage,
    }))
  }

  const onSubmit = async () => {
    try {
      const isValid = Object.values(errors).every((error) => error === '')
      if (!isValid) return

      const changes = Object.keys(data).reduce((acc, key) => {
        if (data[key] !== originalData[key]) {
          acc[key] = data[key]
        }
        return acc
      }, {})

      await reqEditProduct(currentProductEdit.id, changes)

      dispatch(editItem({ data, id: currentItemIdEdit }))

      handleResetCurrentIdEdit()
      toggleModal()
    } catch (error) {
      console.log(error)
    }
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
                  defaultValue={currentProductEdit?.name}
                />
                <SearchAutocomplete
                  label='Categoría'
                  itemKey='id'
                  itemLabel='name'
                  defaultItem={currentProductEdit?.category}
                  setSelectedItem={(item) => {
                    setData((prevInfo) => ({
                      ...prevInfo,
                      category: {
                        id: item?.id || null,
                        name: item?.name || null,
                      },
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
                  defaultValue={currentProductEdit?.quantity}
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
                  defaultValue={currentProductEdit?.barcode}
                  onChange={handleChange}
                />
                <Input
                  label='Precio'
                  size='sm'
                  name='price'
                  labelPlacement='outside'
                  placeholder='Precio'
                  variant='bordered'
                  defaultValue={currentProductEdit?.price}
                  onChange={handleChange}
                />
              </div>
              <div className='select flex items-start justify-start gap-3'>
                <SearchAutocomplete
                  label='Proveedor'
                  itemKey='id'
                  itemLabel='name'
                  defaultItem={currentProductEdit?.supplierUnit}
                  setSelectedItem={(item) => {
                    setData((prevInfo) => ({
                      ...prevInfo,
                      supplierUnit: {
                        id: item?.id || null,
                        name: item?.name || null,
                      },
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
                  defaultSelectedKeys={[currentProductEdit?.status]}
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
                defaultValue={currentProductEdit?.description}
                placeholder='Ingresa la descripción'
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color='danger'
              variant='light'
              radius='sm'
              onPress={() => {
                handleResetCurrentIdEdit()
                toggleModal()
              }}
            >
              Cerrar
            </Button>
            <Button color='primary' onPress={onSubmit} radius='sm' className='bg-c-primary'>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
