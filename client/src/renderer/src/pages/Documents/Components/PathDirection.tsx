import { RootState } from '@renderer/store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { reqGetFileByPath } from '@renderer/api/requests'
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'

export const PathDirection = () => {
  const documents = useSelector((state: RootState) => state.documents)
  const navigate = useNavigate()
  const company = useSelector((state: RootState) => state.currentCompany)
  const unit = useSelector((state: RootState) => state.currentUnit)
  const fileNavigate = (file: any) => navigate(`/documents/${company.id}/${unit.id}/${file.id}`)

  if (!documents.currentPath?.path) {
    return (
      <Breadcrumbs>
        <BreadcrumbItem>Mis archivos</BreadcrumbItem>
      </Breadcrumbs>
    )
  }

  const pathSegments = [
    'Mis archivos',
    ...(documents.currentPath.path.split('/').filter(Boolean).slice(2) || null),
  ]

  const getPathUntilFolder = async (targetFolder: string) => {
    if (!documents.currentPath?.path) return

    // Se divide el path en partes
    const pathParts = documents.currentPath.path.split('/').filter(Boolean)

    // Se busca el índice de la carpeta
    const targetIndex = pathParts.findIndex((part) => part === targetFolder)
    if (targetIndex === -1) return navigate(`/documents/${company.id}/${unit.id}`)

    // Se crea un nuevo path con la carpeta encontrada
    const newPath = '/' + pathParts.slice(0, targetIndex + 1).join('/')

    const file = await reqGetFileByPath(newPath)
    fileNavigate(file.data)
  }

  return (
    <Breadcrumbs maxItems={10} size='lg'>
      {pathSegments.map((folder: string, index: number) => (
        <BreadcrumbItem key={index} onPress={() => getPathUntilFolder(folder)}>
          {folder}
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  )
}
