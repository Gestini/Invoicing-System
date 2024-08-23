import React from 'react'
import { Input } from '@nextui-org/react'
import { SearchIcon } from '../Icons'
import { useSelector } from 'react-redux'
import { NavbarUserOptions } from './UserOptions'

export const Navbar = () => {
  const [_, setIsVisible] = React.useState(false)
  const unit = useSelector((state: any) => state.currentUnit)

  React.useEffect(() => {
    if (!unit) return

    // Mostrar el mensaje de bienvenida
    setIsVisible(true)

    // Ocultar el mensaje después de 3 segundos
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 1000)

    // Limpiar el temporizador si el componente se desmonta
    return () => clearTimeout(timer)
  }, [unit])

  return (
    <nav className='w-full bg-c-bg-color flex items-center pt-6'>
      <div className='w-full h-full px-[18px] pl-[245px]'>
        <div className='relative flex items-center justify-between w-full h-full'>
          <div className='w-[384px]'>
            <Input
              isClearable
              className='w-full text-c-gray'
              placeholder='Buscar'
              startContent={<SearchIcon />}
            />
          </div>
          <div className='inset-y-0 right-0 flex items-center'>
            <div className='h-[50px] flex justify-center items-center'>
              <NavbarUserOptions />
            </div>
          </div>
        </div>
        {/* <div
          className={`fixed inset-0 flex items-center justify-center bg-gradient-to-b from-black  to-c-bg-color-2 transition-opacity duration-700 ease-in pointer-events-none ${isVisible ? 'opacity-85 pointer-events-auto' : 'opacity-0'} z-50`}
        >
          <h5 className='text-white font-semibold text-[30px]'>
            Bienvenido a<span className='text-c-primary-variant-1'> {unit?.name}</span>
          </h5>
        </div> */}
      </div>
    </nav>
  )
}
