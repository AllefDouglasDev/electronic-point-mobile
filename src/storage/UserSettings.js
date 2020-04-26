import { AsyncStorage } from 'react-native'

export const USER = 'EP@user'
export const ADMIN_NAME = 'EP@adminname'
export const JUSITIFICATION = 'EP@justification'

export function saveUser(user) {
  if (!user) return
  return AsyncStorage.setItem(USER, JSON.stringify(user))
}

export async function getUserData() {
  const user = await AsyncStorage.getItem(USER)

  return JSON.parse(user)
}

export function setAdminName(adminName) {
  if (!adminName) return
  return AsyncStorage.setItem(ADMIN_NAME, adminName)
}

export function getAdminName() {
  return AsyncStorage.getItem(ADMIN_NAME)
}

export function setJustification(justification) {
  if (!justification) return
  return AsyncStorage.setItem(JUSITIFICATION, justification)
}

export function getJustification() {
  return AsyncStorage.getItem(JUSITIFICATION)
}

export async function clear() {
  return AsyncStorage.clear()
}
