import { S3 } from '@aws-sdk/client-s3'

const endpoint = import.meta.env.VITE_ENDPOINT

export const s3Client = new S3({
  endpoint,
  region: 'us-east-1',
  credentials: {
    accessKeyId: import.meta.env.VITE_DIGITALOCEAN_ACCESSKEY,
    secretAccessKey: import.meta.env.VITE_DIGITALOCEAN_SECRET_KEY,
  },
})
