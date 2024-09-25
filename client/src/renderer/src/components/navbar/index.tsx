import React from 'react'
import { Input } from '@nextui-org/react'
import { RootState } from '@renderer/store'
import { SearchIcon } from '../Icons'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { GestiniLogo } from '@renderer/assets/GestiniLogo'
import { NavbarUserOptions } from './UserOptions'

export const Navbar = () => {
  const [_, setIsVisible] = React.useState(false)
  const unit = useSelector((state: RootState) => state.currentUnit)
  const location = useLocation()

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
    <nav className='w-full flex items-center sticky top-0 z-40 p-3 pl-3 bg-c-bg-color'>
      <div className='w-full'>
        <div className='relative flex items-center gap-4 justify-between w-full'>
          <div className='w-[384px]'>
            {location.pathname == '/' ? (
              <div className='flex gap-4 items-center'>
                <GestiniLogo />
                <span className='text-c-logo text-2xl font-bold'>Gestini</span>
              </div>
            ) : (
              <Input
                name='search'
                type='text'
                isClearable
                className='w-full text-c-gray'
                placeholder='Buscar'
                startContent={<SearchIcon />}
              />
            )}
          </div>
          <div className='inset-y-0 right-0 flex items-center'>
            <div className='h-[50px] flex justify-center items-center'>
              <NavbarUserOptions />
            </div>
          </div>
        </div>
        {/*
        <div
          className={`fixed inset-0 flex items-center justify-center bg-gradient-to-b from-black  to-c-bg-color-2 transition-opacity duration-700 ease-in pointer-events-none ${isVisible ? 'opacity-85 pointer-events-auto' : 'opacity-0'} z-50`}
        >
          <h5 className='text-white font-semibold text-[30px]'>
            Bienvenido a<span className='text-c-primary-variant-1'> {unit?.name}</span>
          </h5>
        </div> 
        */}
      </div>
    </nav>
  )
}
