import Aas from '../../assets/image/loginform.png'

export const AuthBody = ({ children }) => {
  return (
    <div className='h-[100vh] flex'>
      <div className='formlogin w-[55%] h-[100vh] bg-white flex justify-center'>
        <div className=' flex flex-col w-[420px] justify-center'>{children}</div>
      </div>
      <div className='rightlogin w-[45%] h-[100vh] bg-white '>
        <img src={Aas} alt='' className='w-full h-full object-cover rounded-bl-[250px] ' />
      </div>
    </div>
  )
}
