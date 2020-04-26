import api from './api'

export function getUser(accessCode) {
  return api.post('/user', { codigo_acesso: accessCode })
}

export function authorization(accessCode) {
  return api.post('/check', { codigo_acesso: accessCode })
}

export function uploadImage(imageData, userId) {
  const { uri, name, type } = imageData

  const formData = new FormData()
  formData.append('image', { uri, name, type })

  return api.post(`/image/${userId}`, formData, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}
