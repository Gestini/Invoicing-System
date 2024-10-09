import React from 'react'
import { setData } from '@renderer/features/fileSlice'
import { useParams } from 'react-router-dom'
import { setCurrentPath } from '@renderer/features/fileSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
  reqGetFileById,
  reqGetFileByPath,
  reqGetFilesByParentId,
  reqGetFilesByParentPath,
} from '@renderer/api/requests'
import { RootState } from '@renderer/store'
import { viewTypes } from '@renderer/features/fileSlice'
import { changeView, ViewType } from '@renderer/features/fileSlice'

export const LoadCurrentFilesMiddleware = ({ children }) => {
  const params = useParams()
  const dispatch = useDispatch()
  const currentUnit = useSelector((state: RootState) => state.currentUnit)
  const currentCompany = useSelector((state: RootState) => state.currentCompany)

  React.useEffect(() => {
    const viewType = localStorage.getItem('viewType')
    if (!viewType) return

    if (viewType && Object.values(viewTypes).includes(viewType as ViewType)) {
      dispatch(changeView(viewType))
    }
  }, [])

  React.useEffect(() => {
    const loadCurrentPath = async () => {
      const initalPath = `/${currentCompany.id}/${currentUnit.id}`
      try {
        if (params.fileId) {
          const currentPathRes = await reqGetFileById(params.fileId)
          setCurrentPath(currentPathRes.data)
          dispatch(setCurrentPath(currentPathRes.data))

          const childrenFiles = await reqGetFilesByParentId(params.fileId)
          dispatch(setData(childrenFiles.data))
        } else {
          const currentPathRes = await reqGetFileByPath(initalPath)
          dispatch(setCurrentPath(currentPathRes.data))

          const childrenFiles = await reqGetFilesByParentPath(initalPath)
          dispatch(setData(childrenFiles.data))
        }
      } catch (error) {
        console.log(error)
      }
    }
    loadCurrentPath()
  }, [params.fileId])

  return children
}
