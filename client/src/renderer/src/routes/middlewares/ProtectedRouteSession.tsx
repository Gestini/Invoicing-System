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
          if (!response.data) return

          dispatch(setMyUser(response.data))

          const currentSessions = localStorage.getItem('sessions')
          if (!currentSessions) {
            return localStorage.setItem(
              'sessions',
              JSON.stringify([
                {
                  userId: response.data?.id,
                  token,
                },
              ]),
            )
          }

          const partseSessions = JSON.parse(currentSessions)
          const userFound = partseSessions.find((item: any) => item.userId == response.data.id)
          if (!userFound) return

          const AuxSessions = [...partseSessions]

          if (token !== userFound.token) {
            AuxSessions[AuxSessions.indexOf(userFound)].token = token
            localStorage.setItem('sessions', JSON.stringify(AuxSessions))
          }
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

  if (user === null) return <></>

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
