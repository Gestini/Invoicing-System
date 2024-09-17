'useclient'
import React, { useState } from 'react'
import { Switch } from '@nextui-org/switch'
import Afip from '../../assets/Icons/thumbnail.webp'

const cardData = [
  {
    nombre: 'Afip',
    activador: 'Activar 1',
    desactivador: 'Desactivar 1',
    descripcion: 'Descripción breve del Card 1. Aquí puedes agregar más detalles si es necesario.',
    footer: 'Footer del Card 1',
    imagen: Afip,
    isEnabled: true, // Añade este campo para definir si el Switch está habilitado
  },
  {
    nombre: 'Otro',
    activador: 'Activar 2',
    desactivador: 'Desactivar 2',
    descripcion: 'Descripción breve del Card 2. Aquí puedes agregar más detalles si es necesario.',
    footer: 'Footer del Card 2',
    imagen: Afip,
    isEnabled: false, // El Switch está desactivado en esta carta
  },
  {
    nombre: 'Otro',
    activador: 'Activar 2',
    desactivador: 'Desactivar 2',
    descripcion: 'Descripción breve del Card 2. Aquí puedes agregar más detalles si es necesario.',
    footer: 'Footer del Card 2',
    imagen: Afip,
    isEnabled: false, // El Switch está desactivado en esta carta
  },
  {
    nombre: 'Otro',
    activador: 'Activar 2',
    desactivador: 'Desactivar 2',
    descripcion: 'Descripción breve del Card 2. Aquí puedes agregar más detalles si es necesario.',
    footer: 'Footer del Card 2',
    imagen: Afip,
    isEnabled: false, // El Switch está desactivado en esta carta
  },
  {
    nombre: 'Otro',
    activador: 'Activar 2',
    desactivador: 'Desactivar 2',
    descripcion: 'Descripción breve del Card 2. Aquí puedes agregar más detalles si es necesario.',
    footer: 'Footer del Card 2',
    imagen: Afip,
    isEnabled: false, // El Switch está desactivado en esta carta
  },
]

const Integration = () => {
  const [switchStates, setSwitchStates] = useState(
    cardData.reduce((acc, card, index) => {
      acc[index] = card.isEnabled
      return acc
    }, {}),
  )

  const handleSwitchChange = (index) => {
    setSwitchStates((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index],
    }))
  }
  return (
    <div className='w-full h-full'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {cardData.map((card, index) => (
          <div key={index} className='bg-white p-3 shadow-md rounded-md flex flex-col gap-4'>
            <div className='topsectioncard-integration flex w-full justify-between'>
              <div className='infocardtop-integration flex gap-2 font-[600] items-center'>
                <div
                  className='w-[50px] h-[50px] rounded-xl'
                  style={{
                    backgroundImage: `url(${card.imagen})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                ></div>
                <span>{card.nombre}</span>
              </div>
              <div className='infocardtoggle flex items-start'>
                <Switch
                  size='sm'
                  color='primary'
                  isSelected={switchStates[index]} // Usa el estado local para definir el estado del Switch
                  onValueChange={() => handleSwitchChange(index)} // Maneja el cambio de estado
                />
              </div>
            </div>
            <p className='text-[12px] w-full'>Integraciones con Afip</p>
            <div className='border border-divider w-full'></div>
            <div className='fottercard-integration w-full flex justify-end text-[14px] font-[600] text-c-primary cursor-pointer'>
              Ver Integración
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Integration
