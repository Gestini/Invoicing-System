import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Modal, useDisclosure, ModalContent, ModalHeader } from '@nextui-org/react'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Invite = () => {
  const tokenLocal = localStorage.getItem('token')
  const query = useQuery()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const token = query.get('token')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    const handleInvitation = async () => {
      console.log(token)
      console.log(tokenLocal)
    }

    handleInvitation()
    onOpen() // Abre el modal cuando se monta el componente
  }, [token, navigate])

  return (
    <div>
      <Modal size={'md'} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>Modal Title</ModalHeader>
        </ModalContent>
      </Modal>
      asdasd
    </div>
  )
}

export default Invite
