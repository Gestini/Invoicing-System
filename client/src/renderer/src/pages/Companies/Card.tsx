import React from 'react'
import { SlOptions } from 'react-icons/sl'
import Logo from '@renderer/assets/image/google.svg'

const Card = () => {
    return (
        <div className='w-full h-[230px] rounded-lg bg-white shadow-sm p-3'>
            <div className='flex justify-between'>
                <div className='w-6'>
                    <img src={Logo} className='w-full' alt='' />
                </div>
                <div>
                    <SlOptions className='text-gray-300 w-4 h-4 cursor-pointer' />
                </div>
            </div>
        </div>
    )
}

export default Card