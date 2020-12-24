import axiosLib from 'axios'
import { environment } from '../environment'

const axios = axiosLib.create({
  baseURL: environment.apiUrl,
  timeout: 1000,
  crossDomain: true,
  withCredentials: true
})

export const apiService = ({
  async register (credentials) {
    return await axios.post('register', credentials)
  },
  async login (credentials) {
    return await axios.post('login', credentials)
  }
})
