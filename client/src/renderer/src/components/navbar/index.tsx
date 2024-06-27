import { AvatarHelp } from '../Avatar'
import { BiBell, BiCog, BiMenu } from 'react-icons/bi'

export const Navbar = () => {
  const pathList = ['Home', 'Workspaces', 'API Network']

  return (
    <nav className='h-[50px] bg-white border-b flex items-center '>
      <div className='w-full h-full px-[18px]'>
        <div className='relative flex items-center justify-between w-full h-full  '>
          <div className=' inset-y-0 left-0 flex items-center w-[50px] justify-center text-gray-600 hover:bg-[#eaddff] cursor-pointer'>
            <BiMenu className=' text-gray-600  text-[20px] w-[25px]  h-[50px]  ' />
          </div>
          <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
            <div className='hidden sm:block sm:ml-6'>
              <div className='flex space-x-4'>
                {pathList.map((item, index) => (
                  <a
                    key={index}
                    href='#'
                    className='text-gray-600 hover:bg-[#eaddff] hover:text-white px-3 py-2 rounded-md text-sm font-medium'
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className='absolute inset-y-0 right-0 flex items-center '>
            <div className='settings w-[50px] flex justify-center h-[50px] hover:bg-[#eaddff] cursor-pointer '>
              <BiCog className=' h-full  text-[20px] text-gray-600  ' />
            </div>
            <div className='settings w-[50px] flex justify-center h-[50px] hover:bg-[#eaddff] cursor-pointer '>
              <BiBell className=' h-full  text-[20px] text-gray-600  ' />
            </div>
            <div className='  h-[50px] w-[50px] flex justify-center items-center '>
              <AvatarHelp />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
