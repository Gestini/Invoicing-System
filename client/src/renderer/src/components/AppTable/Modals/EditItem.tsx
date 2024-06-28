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
} from '@nextui-org/react'
import React from 'react'
import { setCurrentItemId } from '@renderer/features/tableSlice'
import { useDispatch, useSelector } from 'react-redux'

export const EditItemModal = ({ modal }) => {
  const dispatch = useDispatch()
  const [data, setData] = React.useState({})
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
  }

  const handleResetCurrentIdEdit = () => dispatch(setCurrentItemId(-1))

  const handleAddNewUser = async () => {
    modal.action(data, currentUserEdit)
    handleResetCurrentIdEdit()
    onClose()
  }

  return (
    <div className='flex flex-col gap-2'>
      <Modal
        isOpen={isOpen}
        onClose={handleResetCurrentIdEdit}
        backdrop='blur'
        onOpenChange={onOpenChange}
        scrollBehavior={'inside'}
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            <h3 className='default-text-color'>{modal?.title}</h3>
          </ModalHeader>
          <ModalBody>
            {modal?.inputs && (
              <div className='flex w-full flex-col flex-wrap md:flex-nowrap gap-4'>
                {modal.inputs.map((input: any, index: number) => (
                  <Input
                    key={index}
                    name={input.name}
                    type={input.type}
                    label={input.label}
                    required={true}
                    onChange={(e) => handleChange(e)}
                    defaultValue={currentUserEdit && currentUserEdit[input.name]}
                  />
                ))}
              </div>
            )}
            {modal?.selectInputs && (
              <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
                {modal.selectInputs.map((item: any, index: number) => (
                  <Select
                    key={index}
                    name={item.name}
                    label={item.label}
                    onChange={(e) => handleChange(e)}
                    className='max-w-x default-text-color'
                    defaultSelectedKeys={[currentUserEdit && currentUserEdit[item.name]]}
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
