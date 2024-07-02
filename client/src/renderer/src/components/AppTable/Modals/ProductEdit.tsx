import {
  Input,
  Modal,
  Button,
  Select,
  ModalBody,
  SelectItem,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure,
  Checkbox,
  Textarea,
} from '@nextui-org/react'
import React from 'react'
import { setCurrentItemId } from '@renderer/features/tableSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

export const EditProductModal = ({ modal }) => {
  const unit = useSelector((state: any) => state.currentUnit)
  const params = useParams()

  const dispatch = useDispatch()
  const [data, setData] = React.useState({
    businessUnit: {
      id: params.id,
    },
  })

  const [errors, setErrors] = React.useState({
    name: '',
    purchasePrice: '',
    costPrice: '',
    financedPrice: '',
    friendPrice: '',
    cardPrice: '',
    quantity: '',
  })
  const users = useSelector((state: any) => state.table.data)

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const currentItemIdEdit = useSelector((state: any) => state.table.currentItemIdEdit)
  const currentUserEdit = users.find((item: { id: any }) => item.id == currentItemIdEdit)

  React.useEffect(() => {
    if (currentItemIdEdit !== -1) onOpen()
  }, [currentItemIdEdit])

  const handleChange = (e: any) => {
    let name = e.target.name
    let value = e.target.value
    let intValues = ['age']

    setData({
      ...data,
      [name]: intValues.includes(name) ? parseInt(value) : value,
    })
    console.log(data)
    handleValidation(e.target.name, e.target.value)
  }

  const handleValidation = (name, value) => {
    let newErrors = { ...errors }

    switch (name) {
      case 'name':
        newErrors.name = validateName(value) ? '' : 'Por favor, ingresa un nombre válido.'
        break
      case 'purchasePrice':
      case 'costPrice':
      case 'financedPrice':
      case 'friendPrice':
      case 'cardPrice':
      case 'quantity':
        newErrors[name] = validateNumber(value) ? '' : 'Ingrese un número válido.'
        break
      default:
        break
    }

    setErrors(newErrors)
  }
  const validateName = (name) => {
    return name.trim() !== ''
  }

  const validateNumber = (value) => {
    return !isNaN(value) && parseFloat(value) >= 0 // Validación básica de número positivo
  }

  const handleResetCurrentIdEdit = () => dispatch(setCurrentItemId(-1))

  const handleAddNewUser = async () => {
    // Aquí puedes verificar si no hay errores antes de guardar
    const isValid = Object.values(errors).every((error) => error === '')
    if (isValid) {
      modal.action(currentUserEdit.id, data)
      handleResetCurrentIdEdit()
      setData({
        businessUnit: {
          id: params.id,
        },
      })
      onClose()
    } else {
      console.log('Hay errores de validación en el formulario.')
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <Modal
        isOpen={isOpen}
        onClose={handleResetCurrentIdEdit}
        backdrop='blur'
        onOpenChange={onOpenChange}
        scrollBehavior={'inside'}
        size='5xl'
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            <h3 className='default-text-color'>{modal?.title}</h3>
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
                  defaultValue={currentUserEdit ? currentUserEdit.name : ''}
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
                  defaultSelectedKeys={[currentUserEdit && currentUserEdit.category]}
                >
                  <SelectItem key={'electricidad'}>Proveedor</SelectItem>
                  <SelectItem key={'materiales'}>materiales</SelectItem>
                </Select>
                <Input
                  name='quantity'
                  type='cantidad'
                  label='cantidad'
                  size='sm'
                  labelPlacement='outside'
                  placeholder='Cantidad de productos'
                  isInvalid={!!errors.quantity}
                  variant='bordered'
                  onChange={handleChange}
                  defaultValue={currentUserEdit ? currentUserEdit.quantity : ''}
                ></Input>
              </div>
              <div className='rowmodaladdproduct flex gap-3'>
                <Input
                  label='Codigo'
                  size='sm'
                  name='codigo1'
                  labelPlacement='outside'
                  placeholder='Codigo #1'
                  defaultValue={currentUserEdit ? currentUserEdit.codigo1 : ''}
                  variant='bordered'
                  onChange={handleChange}
                ></Input>
                <Input
                  label='Codigo'
                  size='sm'
                  name='codigo2'
                  defaultValue={currentUserEdit ? currentUserEdit.codigo2 : ''}
                  labelPlacement='outside'
                  placeholder='Codigo #2'
                  variant='bordered'
                  onChange={handleChange}
                ></Input>
                <Input
                  label='Codigo de barras'
                  size='sm'
                  name='barcode'
                  defaultValue={currentUserEdit ? currentUserEdit.barcode : ''}
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
                  name='suppliers'
                  onChange={handleChange}
                  size='sm'
                  className='text-c-title'
                  defaultSelectedKeys={[currentUserEdit ? String(currentUserEdit.suppliers) : '']}
                >
                  <SelectItem key={'enjambreSRL'}>enjambreSRL</SelectItem>
                  <SelectItem key={'PistonesSRL'}>PistonesSRL</SelectItem>
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
                  defaultSelectedKeys={[currentUserEdit ? String(currentUserEdit.status) : '']}
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
                  defaultValue={currentUserEdit ? currentUserEdit.purchasePrice : ''}
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
                  defaultValue={currentUserEdit ? currentUserEdit.costPrice : ''}
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
                  defaultSelectedKeys={[currentUserEdit ? currentUserEdit.priceCalculation : '']}
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
                  defaultSelectedKeys={[currentUserEdit ? currentUserEdit.pricePolicy : '']}
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
                  defaultValue={currentUserEdit ? currentUserEdit.net1 : ''}
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
                  defaultValue={currentUserEdit ? currentUserEdit.net2 : ''}
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
                  defaultValue={currentUserEdit ? currentUserEdit.net3 : ''}
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
                  defaultValue={currentUserEdit ? currentUserEdit.net4 : ''}
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
                  defaultSelectedKeys={[currentUserEdit ? currentUserEdit.taxType : '']}
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
                  defaultValue={currentUserEdit ? currentUserEdit.financedPrice : ''}
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
                  defaultValue={currentUserEdit ? currentUserEdit.friendPrice : ''}
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
                  defaultValue={currentUserEdit ? currentUserEdit.cardPrice : ''}
                  size='sm'
                  endContent={
                    <div className='pointer-events-none flex items-center'>
                      <span className='text-default-400 text-small'>$</span>
                    </div>
                  }
                />
              </div>

              <Checkbox defaultSelected name='envasedproduct' onChange={handleChange}>
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
                defaultValue={currentUserEdit ? currentUserEdit.quantityPerPackage : ''}
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
                defaultValue={currentUserEdit ? currentUserEdit.description : ''}
                labelPlacement='outside'
                placeholder='Enter your description'
              ></Textarea>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color='danger'
              variant='light'
              onPress={() => {
                handleResetCurrentIdEdit()
                onClose()
              }}
            >
              Cerrar
            </Button>
            <Button color='primary' onPress={() => handleAddNewUser()}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
