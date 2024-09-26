import { Button } from '@nextui-org/react'

export const AuthSubmit = ({ label, disabled = false, waitTime = 0 }) => {
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <Button
      type='submit'
      className='buttonsubmitsesion mt-[10px] mb-[24px] bg-c-default text-white font-bold'
      isDisabled={disabled}
    >
      {disabled && waitTime > 0 ? `${formatTime(waitTime / 1000)}` : label}
    </Button>
  )
}
