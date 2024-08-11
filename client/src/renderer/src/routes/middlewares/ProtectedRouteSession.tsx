import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from '@renderer/components/Navbar'
import { Navigate } from 'react-router-dom'
import { setMyUser } from '@renderer/features/userSlice'
import { useLocation } from 'react-router-dom'
import { themeColors } from '@renderer/components/Theme/Themes'
import { setCurrentTheme } from '@renderer/features/currentTheme'
import { useDispatch, useSelector } from 'react-redux'
import { reqAuthLoadProfileByToken } from '@renderer/api/requests'

export const ProtectedRouteSession = () => {
  const location = useLocation()
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()

  if (!token) return <Navigate to='/login' />
  const user = useSelector((state: any) => state.user)

  React.useEffect(() => {
    const loadProfile = async () => {
      try {
        if (token) {
          const response = await reqAuthLoadProfileByToken(token)
          dispatch(setMyUser(response.data))
        }
      } catch (error) {
        localStorage.removeItem('token')
        window.location.reload()
      }
    }
    loadProfile()
  }, [token, location])

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

  if (user !== null)
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    )
}
