import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Modal, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Invite = () => {
  const tokenLocal = localStorage.getItem('token')
  const query = useQuery()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const token = query.get('token')
  const navigate = useNavigate()

  React.useEffect(() => {
    const handleInvitation = async () => {
      console.log(token)
      console.log(tokenLocal)
    }

    handleInvitation()
    onOpen()
  }, [token, navigate])

  return (
    <Modal size={'md'} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>Modal Title</ModalHeader>
      </ModalContent>
    </Modal>
  )
}

export default Invite
