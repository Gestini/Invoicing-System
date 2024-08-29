import React from 'react'
import { Link } from 'react-router-dom'
import Confetti from 'react-confetti'
import { Button } from '@nextui-org/react'
import { motion } from 'framer-motion'

export const PaymentConfirmed = () => {
  const [recycleConfetti, setRecycleConfetti] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setRecycleConfetti(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <Confetti recycle={recycleConfetti} />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className='bg-white p-8 rounded-lg shadow-lg text-center flex flex-col items-center gap-5'
      >
        <motion.div
          className='bg-green-500 text-white rounded-full p-4 inline-block'
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='w-8 h-8'
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <path d='M5 13l4 4L19 7' />
          </motion.svg>
        </motion.div>
        <h2 className='text-2xl font-bold'>¡Compra realizada correctamente!</h2>
        <Link to={'/'}>
          <Button color='primary'>Volver al inicio</Button>
        </Link>
      </motion.div>
    </div>
  )
}
