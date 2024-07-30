import { Checkbox } from '@nextui-org/react'
import { Link } from 'react-router-dom'

export const AuthLoginOptions = () => {
  return (
    <div className='flex items-center justify-between mb-[24px] '>
      <div className=' w-full relative flex items-center '>
        <Checkbox defaultSelected radius='sm'></Checkbox>
        Keep me logged in
      </div>
      <Link to='/recovery-password/email' className=' text-[14px] text-blue-500 w-[150px] '>
        Forgot password?
      </Link>
    </div>
  )
}
