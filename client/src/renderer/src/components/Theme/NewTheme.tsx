import {
  Input,
  Modal,
  Button,
  Tooltip,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
} from '@nextui-org/react'
import { FaPlus } from 'react-icons/fa'
import { useColorManagement } from './Themes'

export const NewTheme = () => {
  const { setColor, color, isOpen, onCloseAndClear, handleOpen, errorMessage } =
    useColorManagement()

  return (
    <>
      <Tooltip content='crear'>
        <div
          className={`cursor-pointer w-8 h-8 rounded-full flex justify-center items-center bg-gray-300`}
          onClick={handleOpen}
        >
          <FaPlus className='text-white h-3 w-3' />
        </div>
      </Tooltip>
      <Modal backdrop='blur' isOpen={isOpen} onClose={onCloseAndClear} placement='center'>
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>Modal Title</ModalHeader>
          <ModalBody>
            <p>Choose a theme color</p>
            <Input
              type='text'
              variant='bordered'
              label='Name'
              onChange={(e) => setColor({ ...color, [e.target.name]: e.target.value })}
              value={color.name}
              name='name'
              maxLength={10}
              errorMessage={errorMessage.field === 'name' ? errorMessage.text : ''}
              isInvalid={errorMessage.field === 'name'}
            />
            <div>
              <div className='inline-block w-10 h-10 rounded-full overflow-hidden'>
                <input
                  type='color'
                  className='w-full h-full border-none p-0 rounded-full cursor-pointer'
                  value={color.color}
                  onChange={(e) => setColor({ ...color, [e.target.name]: e.target.value })}
                  name='color'
                />
              </div>
              <span className='text-[#f31260] block text-xs'>
                {errorMessage.field === 'color' && errorMessage.text}
              </span>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' variant='light' onPress={onCloseAndClear}>
              Close
            </Button>
            <Button color='primary' type='submit'>
              Crear
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
