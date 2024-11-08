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
import { Checkbox } from '@nextui-org/react'
import { RootState } from '@renderer/store'
import { handleValidation } from './utils'
import { useDispatch, useSelector } from 'react-redux'
import { reqCreateProduct, reqGetCategoriesByName, reqGetSupplier } from '@renderer/api/requests'
import AutocompleteInput from '@renderer/components/molecules/AutocompleteInput'

export const AddProductModal = () => {
  const dispatch = useDispatch()
  const unit = useSelector((state: RootState) => state.currentUnit)
  const [suppliers, setSuppliers] = React.useState([])
  const [products, setProducts] = React.useState<any[]>([])
  const [categories, setCategories] = React.useState<any[]>([])

  const [errors, setErrors] = React.useState({ name: '' })
  const warehouse = useSelector((state: RootState) => state.unit.warehouse)
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [info, setInfo] = React.useState({})

  React.useEffect(() => {
    setInfo({
      deposit: {
        id: warehouse.currentWarehouseId,
      },
    })

    setErrors({ name: '' })

    reqGetSupplier(unit.id)
      .then((res) => setSuppliers(res.data))
      .catch(console.log)
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

  const fetchItems = async (type: 'supplier' | 'product' | 'category', name: string) => {
    const trimmedName = name.trim()

    if (!trimmedName) {
      if (type === 'supplier') setSuppliers([])
      else if (type === 'product') setProducts([])
      else setCategories([])
      return
    }

    try {
      const response =
        type === 'supplier'
          ? await reqGetCategoriesByName(trimmedName)
          : type === 'product'
            ? await reqGetCategoriesByName(trimmedName)
            : await reqGetCategoriesByName(trimmedName)

      // Accede a la propiedad "data" de la respuesta
      const data = response.data

      if (type === 'supplier') setSuppliers(data)
      else if (type === 'product') setProducts(data)
      else setCategories(data)
    } catch (error) {
      console.error(`Error fetching ${type}s:`, error)
    }
  }

  const handleSelectItem = (type: 'supplier' | 'product' | 'category', key: any) => {
    const itemKey = Number(key)
    const selectedItem =
      type === 'supplier'
        ? suppliers.find((item: any) => item.supplierId === itemKey)
        : type === 'product'
          ? products.find((item: any) => item.productId === itemKey)
          : categories.find((item: any) => item.categoryId === itemKey)

    setInfo((prevInfo) => ({
      ...prevInfo,
      [`${type}Id`]: selectedItem ? selectedItem[`${type}Id`] : null,
    }))
  }

  return (
    <div className='flex flex-col gap-2'>
      <Button
        onPress={onOpen}
        className='bg-c-filter shadow-sm text-c-text'
        color='secondary'
        startContent={<PlusIcon className='text-c-primary-variant-1 w-[15px] h-[15px]' />}
        radius='sm'
      >
        Crear orden
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
              <div className='rowmodaladdproduct justify-start items-start flex gap-3'>
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
                ></Input>
                <AutocompleteInput
                  label='Categoría'
                  placeholder='Buscar categoría'
                  type='category'
                  onSelect={(selectedId) =>
                    setInfo((prevInfo) => ({ ...prevInfo, categoryId: selectedId }))
                  }
                />
                <Input
                  name='quantity'
                  type='number'
                  label='cantidad'
                  size='sm'
                  labelPlacement='outside'
                  placeholder='Cantidad de productos'
                  variant='bordered'
                  onChange={handleChange}
                ></Input>
              </div>
              <div className='rowmodaladdproduct flex gap-3'>
                <Input
                  label='Code'
                  size='sm'
                  name='barcode'
                  labelPlacement='outside'
                  placeholder='Codigo #1'
                  variant='bordered'
                  onChange={handleChange}
                ></Input>
                <Input
                  label='Precio'
                  size='sm'
                  name='price'
                  labelPlacement='outside'
                  placeholder='Precio'
                  variant='bordered'
                  onChange={handleChange}
                ></Input>
              </div>
              <div className='rowmodaladdproduct select flex items-start justify-start gap-3'>
                <Select
                  label='Proveedores'
                  labelPlacement='outside'
                  placeholder='Selecciona un proveedor'
                  variant='bordered'
                  name='supplierUnit'
                  onChange={(e) =>
                    setInfo((prev) => ({
                      ...prev,
                      supplierUnit: {
                        id: e.target.value,
                      },
                    }))
                  }
                  size='sm'
                  className='text-c-title'
                >
                  {suppliers.map((item: any) => (
                    <SelectItem key={item.id}>{item.name}</SelectItem>
                  ))}
                </Select>
                <Select
                  label='Estado'
                  labelPlacement='outside'
                  placeholder='Disponibilidad'
                  variant='bordered'
                  defaultSelectedKeys={['true']}
                  name='status'
                  onChange={handleChange}
                  size='sm'
                  className='text-c-title'
                >
                  <SelectItem value={'true'} key={'true'}>
                    Disponible
                  </SelectItem>
                  <SelectItem value={'false'} key={'false'}>
                    No disponible
                  </SelectItem>
                </Select>
              </div>

              <Textarea
                label='Description'
                variant='bordered'
                name='description'
                onChange={handleChange}
                labelPlacement='outside'
                placeholder='Enter your description'
              ></Textarea>
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
