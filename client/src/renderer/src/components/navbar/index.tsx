import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NavbarUserOptions } from './NavbarUserOption';
import { BiBell, BiCog } from 'react-icons/bi';

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
    <nav className='h-[45px] w-full bg-c-bg-color pl-[50px] flex items-center'>
      <div className='w-full h-full px-[18px]'>
        <div className='relative flex items-center justify-between w-full h-full'>
          <div className='flex items-center justify-center text-c-title cursor-pointer'>
            My Space
          </div>
          <div className='flex items-center justify-between'>
            <div className='hidden sm:block'>
              <div className='flex space-x-4'>
                {pathList.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.paths ? (item.paths[0] as string) : (item.path as string)}
                    className={({ isActive }) => `text-gray-600 hover:bg-c-primary-route-hover hover:text-white transition-all duration-300 px-3 py-2 rounded-md text-sm font-medium ${(isActive || (item.name === 'Dashboard' && isDashboardActive)) ? 'bg-c-primary-route-active hover:bg-c-primary-route-active text-white' : ''
                      }`}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className='inset-y-0 right-0 flex items-center'>
            <div className='settings w-[50px] flex justify-center h-[50px] hover:bg-[#eaddff] cursor-pointer'>
              <BiCog className='h-full text-[20px] text-gray-600' />
            </div>
            <div className='settings w-[50px] flex justify-center h-[50px] hover:bg-[#eaddff] cursor-pointer'>
              <BiBell className='h-full text-[20px] text-gray-600' />
            </div>
            <div className='h-[50px] w-[50px] flex justify-center items-center'>
              <NavbarUserOptions />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
