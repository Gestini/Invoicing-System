import React from 'react'
import { Input } from '@nextui-org/react'
import { BsEye, BsEyeSlash } from 'react-icons/bs'

const AuthFormItem = ({ item, handleChange, error }) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <div className='h-[90px]'>
      <label className='flex text-left text-sm font-medium leading-normal transition-opacity duration-300 opacity-100 mr-3 mb-2 ml-1 text-navy-700'>
        {item.label}
      </label>
      <Input
        type={item.type == 'password' ? (isVisible ? 'text' : 'password') : ''}
        name={item.name}
        placeholder={item.placeholder}
        className=' inputsesion mb-[5px]'
        variant='bordered'
        onChange={(e) => handleChange(e)}
        isInvalid={!!error}
        errorMessage={error}
        endContent={
          item.type == 'password' && (
            <span className='focus:outline-none cursor-pointer' onClick={toggleVisibility}>
              {isVisible ? (
                <BsEye className='text-2xl text-default-400 pointer-events-none' />
              ) : (
                <BsEyeSlash className='text-2xl text-default-400 pointer-events-none' />
              )}
            </span>
          )
        }
      />
    </div>
  )
}

export const AuthForm = ({ inputs, handleChange, errors }) => {
  return (
    <div className='w-full inputsesion'>
      {inputs.map((item: any, index: any) => (
        <AuthFormItem
          item={item}
          key={index}
          handleChange={handleChange}
          error={errors[item.name]}
        />
      ))}
    </div>
  )
}
