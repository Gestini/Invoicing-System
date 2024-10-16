import React from 'react'
import {
  Modal,
  Input,
  Button,
  Select,
  Checkbox,
  Textarea,
  ModalBody,
  SelectItem,
  ModalFooter,
  ModalHeader,
  ModalContent,
} from '@nextui-org/react'
import { RootState } from '@renderer/store'
import { modalTypes, useModal } from '@renderer/utils/useModal'
import { useDispatch, useSelector } from 'react-redux'
import { editItem, setCurrentItemId } from '@renderer/features/tableSlice'
import { reqEditProduct, reqGetSupplier } from '@renderer/api/requests'
import { handleValidation, initialErrors } from './utils'

export const EditProductModal = () => {
  const dispatch = useDispatch()
  const [data, setData] = React.useState({})
  const [originalData, setOriginalData] = React.useState({})
  const [errors, setErrors] = React.useState(initialErrors)
  const [isOpen, toggleModal] = useModal(modalTypes.editProductModal)
  const [suppliers, setSuppliers] = React.useState([])
  const table = useSelector((state: RootState) => state.unit.table)
  const unit = useSelector((state: RootState) => state.currentUnit)
  const currentItemIdEdit = useSelector((state: RootState) => state.unit.table.currentItemIdEdit)
  const currentProductEdit = table.data.find((item) => item.id == currentItemIdEdit)

  React.useEffect(() => {
    if (currentProductEdit) {
      setData(currentProductEdit)
      setOriginalData(currentProductEdit)
    }

    reqGetSupplier(unit.id)
      .then((res) => setSuppliers(res.data))
      .catch(console.log)
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
            <h3 className='default-text-color'>Editar producto</h3>
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
                  defaultValue={currentProductEdit?.name}
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
                  defaultSelectedKeys={[currentProductEdit?.category]}
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
                  isInvalid={!!errors.quantity}
                  variant='bordered'
                  onChange={handleChange}
                  defaultValue={currentProductEdit?.quantity}
                ></Input>
              </div>
              <div className='rowmodaladdproduct flex gap-3'>
                <Input
                  label='Codigo'
                  size='sm'
                  name='codigo1'
                  labelPlacement='outside'
                  placeholder='Codigo #1'
                  defaultValue={currentProductEdit?.codigo1}
                  variant='bordered'
                  onChange={handleChange}
                ></Input>
                <Input
                  label='Codigo'
                  size='sm'
                  name='codigo2'
                  defaultValue={currentProductEdit?.codigo2}
                  labelPlacement='outside'
                  placeholder='Codigo #2'
                  variant='bordered'
                  onChange={handleChange}
                ></Input>
                <Input
                  label='Codigo de barras'
                  size='sm'
                  name='barcode'
                  defaultValue={currentProductEdit?.barcode}
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
                    setData((prev) => ({
                      ...prev,
                      supplierUnit: {
                        id: e.target.value,
                      },
                    }))
                  }
                  size='sm'
                  className='text-c-title'
                  defaultSelectedKeys={[String(currentProductEdit?.supplierUnit?.id)]}
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
                  name='status'
                  onChange={handleChange}
                  size='sm'
                  className='text-c-title'
                  defaultSelectedKeys={[
                    currentProductEdit ? String(currentProductEdit.status) : '',
                  ]}
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
                  isInvalid={!!errors.purchasePrice}
                  defaultValue={currentProductEdit ? currentProductEdit.purchasePrice : ''}
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
                  defaultValue={currentProductEdit?.costPrice}
                  size='sm'
                  name='costPrice'
                  isInvalid={!!errors.costPrice}
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
                  defaultSelectedKeys={[currentProductEdit?.priceCalculation]}
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
                  placeholder='Select an animal'
                  variant='bordered'
                  name='pricePolicy'
                  onChange={handleChange}
                  defaultSelectedKeys={[currentProductEdit?.pricePolicy]}
                  size='sm'
                  className='text-c-title'
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
                  defaultValue={currentProductEdit?.net1}
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
                  defaultValue={currentProductEdit?.net2}
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
                  defaultValue={currentProductEdit?.net3}
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
                  defaultValue={currentProductEdit?.net4}
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
                  defaultSelectedKeys={[currentProductEdit?.taxType]}
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
                  defaultValue={currentProductEdit?.financedPrice}
                  isInvalid={!!errors.financedPrice}
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
                  defaultValue={currentProductEdit?.friendPrice}
                  onChange={handleChange}
                  isInvalid={!!errors.friendPrice}
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
                  isInvalid={!!errors.cardPrice}
                  variant='bordered'
                  defaultValue={currentProductEdit?.cardPrice}
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
                defaultValue={currentProductEdit?.quantityPerPackage}
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
                defaultValue={currentProductEdit?.description}
                labelPlacement='outside'
                placeholder='Enter your description'
              ></Textarea>
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
            <Button color='primary' onPress={() => onSubmit()} radius='sm' className='bg-c-primary'>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
