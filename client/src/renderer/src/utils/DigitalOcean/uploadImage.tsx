import { s3Client } from './index'
import { PutObjectCommand } from '@aws-sdk/client-s3'

export const uploadImage = async (event: React.FormEvent<HTMLFormElement>, file) => {
    event.preventDefault();

    if (file) {
        try {
            const bucketParams = {
                Bucket: 'gestini',
                Key: `imagenes/${file?.name}`,
                Body: file,  // Cambiado a file directamente
                ACL: 'public-read'
            };

            const result = await s3Client.send(new PutObjectCommand(bucketParams));
            console.log(`${(import.meta.env.VITE_ENDPOINT)}/${bucketParams.Bucket}/${bucketParams.Key}`);
            return `${(import.meta.env.VITE_ENDPOINT)}/${bucketParams.Bucket}/${bucketParams.Key}`
        } catch (error) {
            console.error('Error al subir la imagen:', error);
        }
    } else {
        console.error('No hay archivo seleccionado');
    }
};