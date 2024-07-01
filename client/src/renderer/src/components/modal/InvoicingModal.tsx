import React from 'react'
import { PlusIcon } from '@renderer/components/Icons/PlusIcon'
import {
  Modal,
  Input,
  Button,
  Select,
  ModalBody,
  SelectItem,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure,
  DateInput,
} from '@nextui-org/react'
import { CalendarDate, parseDate, now } from '@internationalized/date'
import { BiCalendar } from 'react-icons/bi'
import './invoicing.scss'

export const InvoicingModal = ({ modal }) => {
  const [data, setData] = React.useState<any>({})
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const currentDate = new Date()
  // Crear la fecha actual
  const currentCalendarDate = new CalendarDate(
    currentDate.getFullYear(),
    currentDate.getDate(),
    currentDate.getMonth() + 1, // El mes está basado en 1 (enero es 1)
  )

  // Crear la fecha un mes adelantado
  const futureCalendarDate = new CalendarDate(
    currentDate.getFullYear(),
    currentDate.getDate(),
    currentDate.getMonth() + 2, // Avanzar el mes en uno
  )

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const handleAddNewUser = () => {
    modal.action(data)
    onClose()
  }

  return (
    <div className='flex flex-col gap-2'>
      <Button onPress={onOpen} className='bg-c-primary' color='secondary' endContent={<PlusIcon />}>
        {modal?.buttonTitle}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size='full'
        scrollBehavior={'inside'}
        backdrop='blur'
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            <h3 className='default-text-color'>{modal?.title}</h3>
          </ModalHeader>
          <ModalBody>
            <div className='inputshead w-full flex gap-2 '>
              <div className='inputizqmodalinvoicing w-full flex flex-col gap-3 '>
                <div className='rowvoicing flex gap-3'>
                  <div className='sucursalandnumber flex w-full gap-3'>
                    {' '}
                    <Select
                      label='Sucursal'
                      placeholder='Select an animal'
                      className='inputselectsucursal max-w-full'
                      size='sm'
                    >
                      <SelectItem key={1}>El electricista</SelectItem>
                    </Select>
                    <div className='compuestinputinvoicing flex w-full max-w-xs gap-3'>
                      <Select
                        label='Numero'
                        placeholder='Selecciona una condicion'
                        size='sm'
                        className=' w-[20%] '
                      >
                        <SelectItem key={1}>1</SelectItem>
                      </Select>
                      <Input
                        label='Factura A'
                        placeholder='factura'
                        size='sm'
                        className=' w-[80%] '
                      ></Input>
                    </div>
                  </div>

                  <div className='dateinputsdiv flex w-full gap-3'>
                    <DateInput
                      label={'Fecha'}
                      defaultValue={currentCalendarDate}
                      placeholderValue={currentCalendarDate}
                      size='sm'
                      className='dateinputinvoicing max-w-full '
                      startContent={
                        <BiCalendar className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                      }
                    />

                    <DateInput
                      label={'Fecha venc.'}
                      defaultValue={futureCalendarDate}
                      placeholderValue={futureCalendarDate}
                      size='sm'
                      className='dateinputinvoicing max-w-full '
                      endContent={
                        <BiCalendar className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
                      }
                    />
                  </div>
                </div>
                <div className='rowvoicing flex gap-3'>
                  <div className='sucursalandnumber flex w-full gap-3'>
                    {' '}
                    <Input
                      label='DNI/CUIL'
                      disabled
                      placeholder='No está registrado'
                      className='inputselectsucursal max-w-full'
                      size='sm'
                    />
                    <div className='compuestinputinvoicing flex w-full max-w-xs gap-3'>
                      <Select
                        label='Cliente'
                        placeholder='Selecciona una condicion'
                        size='sm'
                        className=' w-[20%] '
                      >
                        <SelectItem key={1}>1</SelectItem>
                      </Select>
                      <Input
                        label='Cliente'
                        placeholder='factura'
                        size='sm'
                        disabled
                        className=' w-[80%] '
                      ></Input>
                    </div>
                  </div>

                  <div className='dateinputsdiv flex w-full gap-3'>
                    <Select
                      label='Condicion de venta'
                      placeholder='Selecciona una condicion'
                      size='sm'
                      className='dateinputinvoicing '
                    >
                      <SelectItem key={1}>1</SelectItem>
                    </Select>
                    <Select
                      label='Vendedor'
                      placeholder='Selecciona un vendedor'
                      size='sm'
                      className='dateinputinvoicing'
                    >
                      <SelectItem key={1}>1</SelectItem>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' variant='light' onPress={onClose}>
              Cerrar
            </Button>
            <Button color='primary' onPress={() => handleAddNewUser()}>
              Agregar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
