import { AsyncStorage } from 'react-native'

export const USER_ID = 'EP@userid'
export const USER_ACCESS_CODE = 'EP@useraccesscode'
export const USER_NAME = 'EP@username'
export const USER_REGISTER = 'EP@userregister'
export const USER_AUTHORIZATED = 'EP@userauthorizated'

export async function saveUser({ id, codigo_acesso, name, registro, autorizacao }) {
  if (id) await AsyncStorage.setItem(USER_ID, String(id))
  
  if (codigo_acesso) await AsyncStorage.setItem(USER_ACCESS_CODE, String(codigo_acesso))
  
  if (name) await AsyncStorage.setItem(USER_NAME, String(name))
  
  if (registro) await AsyncStorage.setItem(USER_REGISTER, String(registro))
  
  await AsyncStorage.setItem(USER_AUTHORIZATED, autorizacao ? 'y' : 'n')
}

export async function getUserData() {
  const id = await AsyncStorage.getItem(USER_ID)
  const codigo_acesso = await AsyncStorage.getItem(USER_ACCESS_CODE)
  const name = await AsyncStorage.getItem(USER_NAME)
  const registro = await AsyncStorage.getItem(USER_REGISTER)
  const autorizacao = await AsyncStorage.getItem(USER_AUTHORIZATED)

  return {
    id,
    codigo_acesso,
    name,
    registro,
    autorizacao: autorizacao === 'y',
  }
}

export async function clear() {
  return AsyncStorage.clear()
}
