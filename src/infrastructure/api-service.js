import axiosLib from 'axios'
import { defer } from 'rxjs'
import { environment } from '../environment'

const axios = axiosLib.create({
  baseURL: environment.apiUrl,
  timeout: 1000,
  crossDomain: true,
  withCredentials: true
})

export const apiService = ({
  register (email, password) {
    return defer(() => axios.post('register', { email, password }))
  },
  login (email, password) {
    return defer(() => axios.post('login', { email, password }))
  }
})
