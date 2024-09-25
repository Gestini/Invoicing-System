import { GestiniLogo } from '@renderer/assets/GestiniLogo'
import Aas from '../../assets/image/loginform.png'

export const AuthBody = ({ children, onClick }) => {
  return (
    <div className='h-[100vh] flex'>
      <div className='formlogin w-[55%] h-[100vh] bg-white flex justify-center'>
        <form onSubmit={(e) => onClick(e)} className='flex flex-col w-[420px] justify-center'>
          {children}
        </form>
      </div>
      <div className='relative w-[45%] h-[100vh] flex flex-col items-center gap-6 justify-center overflow-hidden bg-white'>
        <div className='absolute inset-0 bg-gradient-to-br from-[#66d169] to-[#51ad57] rounded-bl-[250px] z-0'></div>

        {/* Aseguramos que el contenido esté por encima del fondo */}
        <div className='relative z-10 flex flex-col items-center gap-6'>
          <GestiniLogo height='200' width='200' color='#fff' />
          <span className='font-bold text-white text-6xl'>Gestini</span>
          <div className='text-center'>
            <p className='text-white text-sm font-semibold'>
              Gestiona eficiente.
              <br />
              Gestiona sencillo.
            </p>
          </div>
        </div>
      </div>


    </div>
  )
}
