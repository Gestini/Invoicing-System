import { Input } from '@nextui-org/react';
import { useLocation } from 'react-router-dom';
import { SearchIcon } from '../Icons';
import { NavbarUserOptions } from './NavbarUserOption';
import { useSelector } from 'react-redux';
import React from 'react'

export const Navbar = () => {
  const location = useLocation()
  const pathList: {
    name: string
    path?: string
    paths?: string[]
  }[] = [
      {
        name: 'Workspaces',
        path: '/',
      },
      {
        name: 'Dashboard',
        paths: [
          '/general',
          '/stock',
          '/ventas',
          '/proveedores',
          '/facturar',
          '/presupuestos',
          '/pedidos',
          '/informes',
        ],
      },
      {
        name: 'API Network',
        path: '/',
      },
    ]

  // Verificar si pathList[1] y pathList[1].paths están definidos antes de usarlos
  const isDashboardActive =
    pathList[1] && pathList[1].paths && pathList[1].paths.includes(location.pathname)

  const [isVisible, setIsVisible] = React.useState(false);
  const unit = useSelector((state: any) => state.currentUnit);

  React.useEffect(() => {
    if (unit) {
      // Mostrar el mensaje de bienvenida
      setIsVisible(true);

      // Ocultar el mensaje después de 3 segundos
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 2000);

      // Limpiar el temporizador si el componente se desmonta
      return () => clearTimeout(timer);
    }
  }, [unit]);
  return (
    <nav className=' w-full bg-c-bg-color flex items-center pt-6'>
      <div className='w-full h-full px-[18px] pl-[245px]'>
        <div className='relative flex items-center justify-between w-full h-full'>
          {/* <div className='flex items-center justify-center text-c-title cursor-pointer w-16'></div> */}
          {/* <div className='flex items-center justify-between'>
            <div className='hidden sm:block'>
            
            </div>
            </div> */}
          <div className='w-[384px]'>
            <Input
              isClearable
              className='w-full text-c-gray'
              placeholder='Buscar'
              startContent={<SearchIcon />}
            // value={filterValue}
            // onClear={() => onClear()}
            // onValueChange={onSearchChange}
            />
          </div>
          <div className='inset-y-0 right-0 flex items-center'>


            {/* <Dropdown className='text-c-title bg-c-card'>
              <DropdownTrigger>
              <div className='settings w-[50px] flex justify-center h-[50px] rounded-full transition-all duration-300 cursor-pointer'>
              <BiBell className='h-full text-[20px] text-gray-600 transition-colors duration-300 hover:text-c-primary-variant-1' />
              </div>
              </DropdownTrigger>
              <DropdownMenu aria-label='Profile Actions' variant='flat'>
              <DropdownItem key='profile' className=' gap-2 text-c-title'>
              <p className='font-semibold'>Mis notificaciones</p>
              </DropdownItem>
              </DropdownMenu>
              </Dropdown> */}

            <div className='h-[50px] flex justify-center items-center'>
              <NavbarUserOptions />
            </div>
          </div>
        </div>
        <div
          className={`fixed inset-0 flex items-center justify-center bg-gradient-to-b from-black  to-c-bg-color-2 transition-opacity duration-700 ease-in-out pointer-events-none ${isVisible ? 'opacity-85 pointer-events-auto' : 'opacity-0'} z-50`}
        >
          <h5 className='text-white font-semibold text-[30px]'>
            Bienvenido a
            <span className='text-c-primary-variant-1'> {unit?.name}</span>
          </h5>
        </div>
      </div>
    </nav >
  )
}
