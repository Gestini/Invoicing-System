import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { reqUserHasPermissions } from '@renderer/api/requests'

export const SectionPermissionMiddleware = ({ permission, children }) => {
  const [hasPermissions, setHasPermissions] = React.useState(false)
  const unit = useSelector((state: any) => state.currentUnit)
  const navigate = useNavigate()

  React.useEffect(() => {
    const validatePermissions = async () => {
      try {
        const response = await reqUserHasPermissions({
          unitId: unit.id,
          permissionName: permission,
        })

        if (!response.data) navigate('/')
        setHasPermissions(response.data)
      } catch (error) {
        navigate('/')
      }
    }
    validatePermissions()
  })

  if (!hasPermissions) return <></>

  return children
}
