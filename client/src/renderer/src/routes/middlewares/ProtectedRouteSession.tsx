import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { setMyUser } from '@renderer/features/userSlice'
import { useDispatch } from 'react-redux'
import { reqAuthLoadProfileByToken } from '@renderer/api/requests'

const ProtectedRouteAuth = () => {
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  if (!token) return <Navigate to='/login' />

  React.useEffect(() => {
    const loadProfile = async () => {
      try {
        if (token) {
          const response = await reqAuthLoadProfileByToken(token)
          dispatch(setMyUser(response.data))
        }
      } catch (error) {
        localStorage.removeItem('token')
      }
    }
    loadProfile()
  }, [token])

  return <Outlet />
}

export default ProtectedRouteAuth
