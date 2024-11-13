import React from 'react'
import {
  Input,
  Modal,
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
import { ModalProps } from '../Interfaces/ModalProps'
import { setCurrentItemId } from '@renderer/features/tableSlice'
import { useModal, modalTypes } from '@renderer/utils/useModal'
import { useDispatch, useSelector } from 'react-redux'

export const EditItemModal = ({ modal }: { modal: ModalProps }) => {
  const dispatch = useDispatch()
  const [data, setData] = React.useState({})
  const [isOpen, toggleModal] = useModal(modalTypes.editItemTableModal)

  const table = useSelector((state: RootState) => state.unit.table)
  const currentItemEdit = table.data.find((item) => item.id == table.currentItemIdEdit)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let name = e.target.name
    let value = e.target.value
    let intValues = ['age']

    setData({
      ...data,
      [name]: intValues.includes(name) ? parseInt(value) : value,
    })
  }

  const handleResetCurrentIdEdit = () => dispatch(setCurrentItemId(-1))

  const onSubmit = async () => {
    modal.action(data, currentItemEdit)
    handleResetCurrentIdEdit()
    toggleModal()
  }

  return (
    <div className='flex flex-col gap-2'>
      <Modal
        isOpen={isOpen}
        onClose={handleResetCurrentIdEdit}
        backdrop='blur'
        onOpenChange={toggleModal}
        scrollBehavior={'inside'}
        placement='center'
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            <h3 className='default-text-color'>{modal?.title}</h3>
          </ModalHeader>
          <ModalBody>
            {modal?.inputs && (
              <div className='flex w-full flex-col flex-wrap md:flex-nowrap gap-4'>
                {modal.inputs.map((input, index: number) => (
                  <Input
                    key={index}
                    size='sm'
                    name={input.name}
                    type={input.type}
                    label={input.label}
                    variant='bordered'
                    required={true}
                    onChange={(e) => handleChange(e)}
                    defaultValue={currentItemEdit && currentItemEdit[input.name]}
                    labelPlacement='outside'
                    placeholder={input.placeholder}
                  />
                ))}
              </div>
            )}
            {modal?.selectInputs && (
              <div className='flex flex-col w-full flex-wrap md:flex-nowrap gap-4'>
                {modal.selectInputs.map((item, index: number) => (
                  <Select
                    size='sm'
                    key={index}
                    name={item.name}
                    label={item.label}
                    variant='bordered'
                    onChange={handleChange}
                    className='max-w-x default-text-color'
                    labelPlacement='outside'
                    placeholder={item.placeholder}
                    defaultSelectedKeys={[currentItemEdit && currentItemEdit[item.name]]}
                  >
                    {item.options.map((state) => (
                      <SelectItem
                        key={state.value}
                        value={state.value}
                        className='default-text-color'
                      >
                        {state.label}
                      </SelectItem>
                    ))}
                  </Select>
                ))}
              </div>
            )}
            {modal?.textArea?.map((item, index: number) => (
              <Textarea
                key={index}
                name={item.name}
                label={item.label}
                variant='bordered'
                onChange={handleChange}
                labelPlacement='outside'
                placeholder={item.placeholder}
              />
            ))}
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
            <Button color='primary' onPress={() => onSubmit()} className='bg-c-primary' radius='sm'>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
