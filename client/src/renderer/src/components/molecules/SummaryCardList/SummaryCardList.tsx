import { ChildrenSlider } from '@renderer/components/ChildrenSlider'

const SummaryCardList = () => {
  const sections = [
    { title: 'Vendedor', empleados: 20, sesiones: 20 },
    { title: 'Facturador', empleados: 15, sesiones: 10 },
    { title: 'Almacen / Logistica', empleados: 5, sesiones: 25 },
    { title: 'Recursos Humanos', empleados: 20, sesiones: 20 },
    { title: 'Finanzas', empleados: 15, sesiones: 10 },
    { title: 'Gestor de documentos', empleados: 5, sesiones: 25 },
  ]

  return (
    <div className='px-1'>
      <ChildrenSlider spaceBetween={60}>
        {sections.map((section, index) => (
          <div className='flex flex-col gap-2' key={index}>
            <h3 className='text-c-title  font-[400] text-[16px]'>{section.title}</h3>
            <main className='flex gap-3'>
              <div className='flex gap-1 text-[14px]'>
                <span className='text-c-title'>{section.empleados}</span>
                <h4 className='text-c-title-opacity '>Empleados</h4>
              </div>
              <div className='flex gap-1 text-[14px]'>
                <span className='text-c-title'>{section.sesiones}</span>
                <h4 className='text-c-title-opacity'>Sesiones</h4>
              </div>
            </main>
          </div>
        ))}
      </ChildrenSlider>
    </div>
  )
}

export default SummaryCardList
