import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { setMyUser } from '@renderer/features/userSlice'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { reqAuthLoadProfileByToken } from '@renderer/api/requests'

const ProtectedRouteAuth = () => {
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

  if (user !== null) return <Outlet />
}

export default ProtectedRouteAuth
