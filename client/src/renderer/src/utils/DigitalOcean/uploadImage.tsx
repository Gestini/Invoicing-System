import { s3Client } from './index'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { ObjectCannedACL } from '@aws-sdk/client-s3' // Importa el tipo necesario

export const uploadImage = async (file: any) => {
  if (!file) {
    console.error('No hay archivo seleccionado')
    return null // Retorna null si no hay archivo
  }

  try {
    const bucketParams = {
      Bucket: 'gestini',
      Key: `imagenes/${file.name}`,
      Body: file,
      ACL: ObjectCannedACL.public_read, // Usa el valor correcto del enumerado
    }

    await s3Client.send(new PutObjectCommand(bucketParams))
    const imageUrl = `${import.meta.env.VITE_ENDPOINT}/${bucketParams.Bucket}/${bucketParams.Key}`
    console.log(imageUrl)
    return imageUrl // Retorna la URL de la imagen
  } catch (error) {
    console.error('Error al subir la imagen:', error)
    return null // Retorna null en caso de error
  }
}
