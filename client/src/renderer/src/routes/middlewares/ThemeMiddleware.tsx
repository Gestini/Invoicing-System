import React from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { themeColors } from '@renderer/components/Theme/Themes'
import { setCurrentTheme } from '@renderer/features/currentTheme'

export const ThemeMiddleware = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    const savedColorKey = localStorage.getItem('mainColor')
    if (!savedColorKey) return

    const savedColorIndex = themeColors.findIndex((c) => c.variant === savedColorKey)
    if (savedColorIndex == -1) document.body.id = 'variantOne'

    const savedColor = themeColors[savedColorIndex]
    dispatch(setCurrentTheme(savedColor))
    document.body.id = savedColorKey
  }, [])

  React.useEffect(() => {
    const temaGuardado = localStorage.getItem('theme')
    if (temaGuardado) {
      document.body.classList.add(temaGuardado)
    } else {
      document.body.classList.add('light')
    }
  }, [])

  return <Outlet />
}
