import { Button } from '@nextui-org/react'

export const AuthSubmit = ({ label }) => {
  return (
    <Button
      color='secondary'
      type='submit'
      className='buttonsubmitsesion bg-[#422afb] mt-[10px]  mb-[24px]'
    >
      {label}
    </Button>
  )
}
