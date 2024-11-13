import React from 'react'
import { PlusIcon } from '@renderer/components/Icons/PlusIcon'
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
import { ModalProps } from '../Interfaces/ModalProps'
import { modalTypes, useModal } from '@renderer/utils/useModal'

export const AddItemModal = ({ modal }: { modal: ModalProps }) => {
  const [data, setData] = React.useState<any>({})
  const [isOpen, toggleModal] = useModal(modalTypes.addItemToTableModal)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const addNewItem = () => {
    modal.action(data)
    toggleModal()
  }

  return (
    <div className='flex flex-col gap-2'>
      <Button
        onPress={toggleModal}
        className='bg-c-primary'
        color='secondary'
        endContent={<PlusIcon />}
        radius='sm'
      >
        {modal?.buttonTitle}
      </Button>
      <Modal
        isOpen={isOpen}
        backdrop='blur'
        placement='center'
        onOpenChange={toggleModal}
        scrollBehavior='inside'
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            <h3 className='default-text-color'>{modal?.title}</h3>
          </ModalHeader>
          <ModalBody>
            {modal?.inputs && (
              <div className='flex w-full flex-col flex-wrap md:flex-nowrap gap-4'>
                {modal.inputs?.map((input: any, index: number) => (
                  <Input
                    key={index}
                    size='sm'
                    name={input.name}
                    type={input.type}
                    label={input.label}
                    variant='bordered'
                    onChange={handleChange}
                    placeholder={input.placeholder}
                    labelPlacement='outside'
                  />
                ))}
              </div>
            )}
            {modal?.selectInputs && (
              <div className='flex flex-col w-full flex-wrap md:flex-nowrap gap-4'>
                {modal.selectInputs.map((item, index: number) => (
                  <Select
                    key={index}
                    size='sm'
                    name={item.name}
                    label={item.label}
                    variant='bordered'
                    onChange={(e) => handleChange(e)}
                    labelPlacement='outside'
                    placeholder={item.placeholder}
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
            <Button color='danger' variant='light' onPress={toggleModal} radius='sm'>
              Cerrar
            </Button>
            <Button
              className='bg-c-primary'
              color='secondary'
              radius='sm'
              onPress={() => addNewItem()}
            >
              Agregar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
