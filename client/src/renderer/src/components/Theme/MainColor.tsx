import React from 'react'
import { Tooltip } from '@nextui-org/react'
import { FaCheck } from 'react-icons/fa'
import { setCurrentTheme } from '@renderer/features/currentTheme'
import { useColorManagement } from './Themes'
import { useDispatch, useSelector } from 'react-redux'

const MainColor: React.FC = () => {
  const dispatch = useDispatch()
  const { colors } = useColorManagement()
  const currentTheme = useSelector((state: RootState) => state.user.currentTheme)

  const handleChangeColor = (index: number) => {
    const selectedColor = colors[index]
    dispatch(setCurrentTheme(selectedColor))
    document.body.id = selectedColor.variant
    localStorage.setItem('mainColor', selectedColor.variant)
  }

  return (
    <>
      <span className='font-medium text-c-title'>Colores</span>
      <div className='flex flex-wrap gap-2 mt-2'>
        {colors.map((item, index) => (
          <Tooltip key={index} content={item.name} className='text-c-title'>
            <div
              className={`cursor-pointer w-8 h-8 rounded-full flex justify-center items-center`}
              style={{ backgroundColor: item.color }}
              onClick={() => handleChangeColor(index)}
            >
              {currentTheme?.variant === item?.variant && (
                <FaCheck className='text-white h-3 w-3' />
              )}
            </div>
          </Tooltip>
        ))}
      </div>
    </>
  )
}

export default MainColor
