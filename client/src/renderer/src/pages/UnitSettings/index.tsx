import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '@renderer/components/SettingsUnit/Navbar'

const Index = () => {
  return (
    <div className='w-full h-screen flex justify-center'>
      <div className='contenedorsettings gap-5 flex w-[90%] flex-col pt-[50px]'>
        <h2 className='text-[35px] font-[600] leading-none'>Settings</h2>
        <Navbar />

        {/* Este div renderizará el contenido según la ruta */}
        <div className='informacinosetting overflow-auto flex-grow'>
          <Outlet /> {/* Este componente es donde se renderizan las rutas anidadas */}
        </div>
      </div>
    </div>
  )
}

export default Index
