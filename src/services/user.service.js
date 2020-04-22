import api, { baseURL } from './api'

export function getUser(accessCode) {
  return api.post('/user', { codigo_acesso: accessCode })
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
  // return api({
  //   url: `${baseURL}/image/${userId}`,
  //   method: 'POST',
  //   data: formData,
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'multipart/form-data',
  //   },
  // })
}
