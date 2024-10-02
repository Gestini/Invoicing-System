import React from 'react'
import './SummaryCardList.scss'

const sections = [
  { title: 'Vendedor', empleados: 20, sesiones: 20 },
  { title: 'Comprador', empleados: 15, sesiones: 10 },
  { title: 'Gerente', empleados: 5, sesiones: 25 },
  { title: 'Vendedor', empleados: 20, sesiones: 20 },
  { title: 'Comprador', empleados: 15, sesiones: 10 },
  { title: 'Gerente', empleados: 5, sesiones: 25 },
  { title: 'Gerente', empleados: 5, sesiones: 25 },
  { title: 'Gerente', empleados: 5, sesiones: 25 },
  { title: 'Gerente', empleados: 5, sesiones: 25 },
  { title: 'Gerente', empleados: 5, sesiones: 25 },
  { title: 'Gerente', empleados: 5, sesiones: 25 },


  // Agrega más secciones según sea necesario
]

const SummaryCardList = () => {
  return (
    <div className='SummaryCardList flex gap-8 overflow-x-auto'>
      {sections.map((section, index) => (
        <div key={index} className='slidercardssummary overflow-x-auto flex-shrink-0'>
          <div className='cardsummaryas flex flex-col w-[189px] px-0 py-0'>
            <h3 className='font-[700] text-[16px]'>{section.title}</h3>
            <div className='flex justify-between'>
              <p className='text-[14px]'>
                <span className='font-[700]'>{section.empleados}</span> Empleados
              </p>
              <p className='text-[14px]'>
                <span className='font-[700]'>{section.sesiones}</span> Sesiones
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SummaryCardList
