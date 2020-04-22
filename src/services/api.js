import axios from 'axios'

export const baseURL = 'http://192.168.1.109:3333'

const api = axios.create({ baseURL })

export default api
