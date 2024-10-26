import React from 'react'
import { api } from '@renderer/api/axios'
import { Navigate } from 'react-router-dom'
import { setMyUser } from '@renderer/features/userSlice'
import { RootState } from '@renderer/store'
import { useLocation } from 'react-router-dom'
import { Outlet, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reqAuthLoadProfileByToken } from '@renderer/api/requests'

export const ProtectedRouteSession = () => {
  const location = useLocation()
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()

  if (!token) return <Navigate to='/login' />
  const user = useSelector((state: RootState) => state.user.user)

  const params = useParams()

  React.useEffect(() => {
    const loadProfile = async () => {
      try {
        if (!token) return

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

        api.interceptors.request.use(
          (config) => {
            if (params.unitId) {
              config.headers['X-UnitId'] = params.unitId
            }

            return config
          },
          (error) => {
            return Promise.reject(error)
          },
        )

        const partseSessions = JSON.parse(currentSessions)
        const AuxSessions = [...partseSessions]
        const userFound = partseSessions.find((item: any) => item.userId == response.data.id)

        if (!userFound) {
          AuxSessions.push({
            userId: response.data?.id,
            token,
          })
          return localStorage.setItem('sessions', JSON.stringify(AuxSessions))
        }

        if (token !== userFound.token) {
          AuxSessions[AuxSessions.indexOf(userFound)].token = token
          return localStorage.setItem('sessions', JSON.stringify(AuxSessions))
        }
      } catch (error) {
        localStorage.removeItem('token')
        window.location.reload()
      }
    }
    loadProfile()
  }, [token, location])

  if (user === null) return <></>

  return <Outlet />
}
