import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NavbarUserOptions } from './NavbarUserOption';
import { BiBell, BiCog } from 'react-icons/bi';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@nextui-org/react';
import { SearchIcon } from '../Icons';

export const Navbar = () => {
  const location = useLocation();

  const pathList: {
    name: string;
    path?: string;
    paths?: string[];
  }[] = [
      {
        name: 'Workspaces',
        path: '/'
      },
      {
        name: 'Dashboard',
        paths: ['/general', '/stock', '/ventas', '/proveedores', '/facturar', '/presupuestos', '/pedidos', '/informes']
      },
      {
        name: 'API Network',
        path: '/nose'
      }
    ];

  // Verificar si pathList[1] y pathList[1].paths están definidos antes de usarlos
  const isDashboardActive = pathList[1] && pathList[1].paths && pathList[1].paths.includes(location.pathname);

  return (
    <nav className=' w-full bg-c-bg-color flex items-center pt-6'>
      <div className='w-full h-full px-[18px] pl-[73px]'>
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
              placeholder='Buscar por nombre...'
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
      </div>
    </nav>
  );
};
