import React from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, useLocation, useNavigate, Outlet } from 'react-router-dom'
import RouterCol from '../RouterCol'

const ProtectedRouteAuth = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  // if (!token) return <Navigate to='/login' />

  // React.useEffect(() => {
  //     const loadProfile = async () => {
  //         try {
  //             if (token) {
  //                 const response = await authLoadProfileByToken(token)
  //                 dispatch(setMyUser(response.data))
  //             }
  //         } catch (error) {
  //             localStorage.removeItem('token')
  //             console.log(error)
  //         }
  //     }
  //     loadProfile()
  // }, [token])

  // React.useEffect(() => {
  //     const loadHospitalStats = async () => {
  //         try {
  //             const response = await reqGetHospitalStats()
  //             dispatch(setHospitalStats(response.data))
  //         } catch (error) {
  //             localStorage.removeItem('token')
  //         }
  //     }
  //     loadHospitalStats()
  // })

  const handleNavigate = (path: string) => navigate(path)

  return (
    <div className='flex'>
      <RouterCol />
      <Outlet />
    </div>
  )
}

export default ProtectedRouteAuth