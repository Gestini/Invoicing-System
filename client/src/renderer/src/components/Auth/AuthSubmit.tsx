import { Button } from '@nextui-org/react'

export const AuthSubmit = ({ onClick, label }) => {
  return (
    <Button
      color='secondary'
      onClick={() => onClick()}
      className='bg-[#422afb] mt-[10px]  mb-[24px]'
    >
      {label}
    </Button>
  )
}
