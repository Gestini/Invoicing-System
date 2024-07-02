import React from 'react'
import { SlOptions } from 'react-icons/sl'
import Logo from '@renderer/assets/image/google.svg'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown, DropdownTrigger, Button, DropdownMenu, DropdownItem } from '@nextui-org/react'
import { reqDeleteUnitById } from '@renderer/api/requests'
import { deleteUnit } from '@renderer/features/unitsSlice'
import { useDispatch } from 'react-redux'

interface BusinessUnit {
  description: string
  link: string
  id: number
  name: string // Asegúrate de tener otros campos de tu modelo de unidad de negocio
  // Agrega otros campos necesarios de tu modelo
}
interface CardProps {
  unit: BusinessUnit // Define una interfaz para las props de Card
}

const Card: React.FC<CardProps> = ({ unit }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleNavigate = () => {
    navigate('/general')
  }

  const handleDeleteUnit = async () => {
    try {
      const response = await reqDeleteUnitById(unit.id)
      dispatch(deleteUnit(unit.id))
    } catch (error) {
      console.error('Error al eliminar la unidad:', error)
    }
  }

  return (
    <div
      onDoubleClick={handleNavigate}
      className='cursor-pointer w-full h-[200px] rounded-lg bg-c-card shadow-md p-3'
    >
      <div className='flex justify-between items-center mb-3'>
        <div className='w-10 bg-[#f7f7f7] p-1 rounded-lg flex'>
          <img src={Logo} className='w-full' alt='' />
        </div>
        <Dropdown placement='bottom-start' className='bg-c-card text-c-title'>
          <DropdownTrigger>
            <div>
              <SlOptions className='text-c-title w-4 h-4 cursor-pointer' />
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label='Static Actions' className='text-c-title bg-c-bg-color'>
            <DropdownItem key='Edit' onClick={handleNavigate}>
              <b>Abrir</b>
            </DropdownItem>
            <DropdownItem key='Edit'>Editar unidad</DropdownItem>
            <DropdownItem
              key='delete'
              className='text-danger'
              color='danger'
              onClick={handleDeleteUnit}
            >
              Eliminar unidad
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className='text-[16px] text-c-title font-semibold mb-[1px]'>{unit.name}</div>
      <div className='text-[12px] text-gray-400 flex items-center gap-1 mb-2'>
        <FaExternalLinkAlt />
        {unit.link}
      </div>
      <div className='text-[14px] text-gray-500 line-clamp-3'>{unit.description}</div>
    </div>
  )
}

export default Card
