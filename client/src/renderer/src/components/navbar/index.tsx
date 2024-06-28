import { NavbarUserOptions } from './NavbarUserOption'
import { BiBell, BiCog, BiMenu } from 'react-icons/bi'


export const Navbar = () => {
  const pathList = ['Workspaces', 'Dashboard', 'API Network']

  return (
    <nav className='h-[45px] w-full bg-white pl-[50px] flex items-center'>
      <div className='w-full h-full px-[18px]'>
        <div className='relative flex items-center justify-between w-full h-full '>
          <div className='flex items-center justify-center text-gray-600  cursor-pointer'>
            My Space
          </div>
          <div className='flex items-center justify-between'>
            <div className='hidden sm:block '>
              <div className='flex space-x-4'>
                {pathList.map((item, index) => (
                  <a
                    key={index}
                    href='#'
                    className='text-gray-600 hover:bg-c-primary hover:text-white transition-all duration-300 px-3 py-2 rounded-md text-sm font-medium'
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className='inset-y-0 right-0 flex items-center '>
            <div className='settings w-[50px] flex justify-center h-[50px] hover:bg-[#eaddff] cursor-pointer '>
              <BiCog className=' h-full  text-[20px] text-gray-600  ' />
            </div>
            <div className='settings w-[50px] flex justify-center h-[50px] hover:bg-[#eaddff] cursor-pointer '>
              <BiBell className=' h-full  text-[20px] text-gray-600  ' />
            </div>
            <div className=' h-[50px] w-[50px] flex justify-center items-center '>
              <NavbarUserOptions />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
