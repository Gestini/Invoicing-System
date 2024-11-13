import { PlantIcon } from '@renderer/components/Icons/PlantIcon'

export const EmptyTableContent = () => {
  return (
    <div className='w-full flex justify-center flex-col items-center'>
      <PlantIcon />
      <p className='text-c-title'>Upss!, No tienes registros</p>
      <span>Agrega algunos datos para empezar.</span>
    </div>
  )
}
