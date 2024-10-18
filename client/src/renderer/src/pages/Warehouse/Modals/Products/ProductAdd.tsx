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
import { reqCreateProduct, reqGetSupplier } from '@renderer/api/requests'

export const AddProductModal = () => {
  const dispatch = useDispatch()
  const unit = useSelector((state: RootState) => state.currentUnit)
  const [suppliers, setSuppliers] = React.useState([])
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

      console.log(info)
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
                <Select
                  label='Categoria'
                  labelPlacement='outside'
                  placeholder='Selecciona una categoria'
                  variant='bordered'
                  name='category'
                  onChange={handleChange}
                  size='sm'
                  className='text-c-title'
                >
                  <SelectItem key={'electricidad'}>Proveedor</SelectItem>
                  <SelectItem key={'materiales'}>materiales</SelectItem>
                </Select>
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
                  label='Codigo'
                  size='sm'
                  name='codigo1'
                  labelPlacement='outside'
                  placeholder='Codigo #1'
                  variant='bordered'
                  onChange={handleChange}
                ></Input>
                <Input
                  label='Codigo'
                  size='sm'
                  name='codigo2'
                  labelPlacement='outside'
                  placeholder='Codigo #2'
                  variant='bordered'
                  onChange={handleChange}
                ></Input>
                <Input
                  label='Codigo de barras'
                  size='sm'
                  name='barcode'
                  labelPlacement='outside'
                  placeholder='Codigo de barras'
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
              <div className='rowmodaladdproduct  flex items-start justify-start gap-3'>
                <Input
                  type='number'
                  label='Precio de compra'
                  labelPlacement='outside'
                  placeholder='0.00'
                  variant='bordered'
                  size='sm'
                  name='purchasePrice'
                  onChange={handleChange}
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>$</span>
                    </div>
                  }
                />
                <Input
                  type='number'
                  label='Precio de costo'
                  labelPlacement='outside'
                  placeholder='0.00'
                  variant='bordered'
                  size='sm'
                  name='costPrice'
                  onChange={handleChange}
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>$</span>
                    </div>
                  }
                />

                <Select
                  label='Calculo de precio'
                  placeholder='Select an animal'
                  labelPlacement='outside'
                  variant='bordered'
                  name='priceCalculation'
                  onChange={handleChange}
                  defaultSelectedKeys={['cero']}
                  size='sm'
                  className='text-c-title'
                >
                  <SelectItem value={'cero'} key={'cero'}>
                    cero
                  </SelectItem>
                  <SelectItem value={'uno'} key={'uno'}>
                    uno
                  </SelectItem>
                </Select>
              </div>
              <div className='rowmodaladdproduct flex items-start justify-start gap-3'>
                <Select
                  label='Politica de precio'
                  labelPlacement='outside'
                  placeholder='Selecciona una politica'
                  variant='bordered'
                  name='pricePolicy'
                  onChange={handleChange}
                  defaultSelectedKeys={['politictone']}
                  size='sm'
                  className='text-c-title  '
                >
                  <SelectItem value={'politicone'} key={'politictone'}>
                    one
                  </SelectItem>
                  <SelectItem value={'politictwo'} key={'politictwo'}>
                    two
                  </SelectItem>
                </Select>
              </div>
              <div className='rowmodaladdproduct  flex items-start justify-start gap-3'>
                <Input
                  type='number'
                  label='Neto 1'
                  isDisabled
                  labelPlacement='outside'
                  placeholder='0.00'
                  variant='bordered'
                  name='net1'
                  onChange={handleChange}
                  size='sm'
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>$</span>
                    </div>
                  }
                />
                <Input
                  type='number'
                  label='Neto 2'
                  labelPlacement='outside'
                  isDisabled
                  placeholder='0.00'
                  variant='bordered'
                  name='net2'
                  onChange={handleChange}
                  size='sm'
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>$</span>
                    </div>
                  }
                />
                <Input
                  type='number'
                  label='Neto 3'
                  labelPlacement='outside'
                  placeholder='0.00'
                  isDisabled
                  variant='bordered'
                  name='net3'
                  onChange={handleChange}
                  size='sm'
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>$</span>
                    </div>
                  }
                />
                <Input
                  type='number'
                  labelPlacement='outside'
                  label='Neto 4'
                  placeholder='0.00'
                  isDisabled
                  variant='bordered'
                  name='net4'
                  onChange={handleChange}
                  size='sm'
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>$</span>
                    </div>
                  }
                />
              </div>
              <div className='rowmodalpricesproduct  flex items-start justify-start gap-3'>
                <Select
                  label='Tipo IVA'
                  labelPlacement='outside'
                  placeholder='Selecciona un tipo'
                  variant='bordered'
                  name='taxType'
                  defaultSelectedKeys={['IVA21%']}
                  onChange={handleChange}
                  size='sm'
                  className='text-c-title'
                >
                  <SelectItem key={'IVA21%'}>IVA 21%</SelectItem>
                  <SelectItem key={'IVA24%'}>IVA 24%</SelectItem>
                </Select>
                <Input
                  type='number'
                  label='Precio Financiado'
                  labelPlacement='outside'
                  placeholder='0.00'
                  variant='bordered'
                  name='financedPrice'
                  onChange={handleChange}
                  size='sm'
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>$</span>
                    </div>
                  }
                />
                <Input
                  type='number'
                  label='Precio Amigo'
                  labelPlacement='outside'
                  placeholder='0.00'
                  variant='bordered'
                  name='friendPrice'
                  onChange={handleChange}
                  size='sm'
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>$</span>
                    </div>
                  }
                />
                <Input
                  type='number'
                  label='Precio tarjeta'
                  labelPlacement='outside'
                  placeholder='0.00'
                  name='cardPrice'
                  onChange={handleChange}
                  variant='bordered'
                  size='sm'
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>$</span>
                    </div>
                  }
                />
              </div>
              <Checkbox
                defaultSelected
                name='envasedproduct'
                color='primary'
                classNames={{
                  wrapper: 'after:bg-[var(--c-primary-variant-1)]',
                }}
                onChange={handleChange}
              >
                Producto envasado
              </Checkbox>
              <Input
                type='number'
                label='Cantidad x paquete'
                labelPlacement='outside'
                placeholder='0.00'
                name='quantityPerPackage'
                onChange={handleChange}
                variant='bordered'
                isDisabled
                size='sm'
                endContent={
                  <div className='pointer-events-none flex items-center'>
                    <span className='text-default-400 text-small'>$</span>
                  </div>
                }
              />
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
