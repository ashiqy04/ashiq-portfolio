import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from './firebase.js'

const MAX_SIZE_BYTES = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml']

// Uploads a cover image to Storage and returns its public download URL.
export async function uploadCoverImage(file) {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Only PNG, JPEG, WebP, GIF, or SVG images are allowed')
  }
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error('Image must be under 5MB')
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
  const path = `covers/${Date.now()}-${safeName}`
  const storageRef = ref(storage, path)

  await uploadBytes(storageRef, file)
  return getDownloadURL(storageRef)
}
