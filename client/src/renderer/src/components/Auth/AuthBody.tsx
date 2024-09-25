import Aas from '../../assets/image/loginform.png'

export const AuthBody = ({ children, onClick }) => {
  return (
    <div className='h-[100vh] flex'>
      <div className='formlogin w-[55%] h-[100vh] bg-white flex justify-center'>
        <form onSubmit={(e) => onClick(e)} className='flex flex-col w-[420px] justify-center'>
          {children}
        </form>
      </div>
      <div className='rightlogin w-[45%] h-[100vh] bg-white '>
        <img src={Aas} alt='' className='w-full h-full object-cover rounded-bl-[250px] ' />
      </div>
    </div>
  )
}
