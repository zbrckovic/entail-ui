import axiosLib from 'axios'
import { defer } from 'rxjs'

export const ApiService = ({ apiUrl }) => {
  const axios = axiosLib.create({
    baseURL: apiUrl,
    timeout: 1000,
    withCredentials: true
  })

  const login = (username, password) => defer(() => (
    axios.post('login', { username, password })
  ))

  return { login }
}
