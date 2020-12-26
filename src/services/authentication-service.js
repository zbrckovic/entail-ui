import { apiService } from './api-service'

export const authenticationService = ({
  async register (credentials) {
    return await apiService.register(credentials)
  },
  async login (credentials) {
    return await apiService.login(credentials)
  },
  async logout () {
    return await apiService.logout()
  },
  async refreshApiToken () {
    return await apiService.getApiToken()
  },
  async requestPasswordChange () {
    return await apiService.requestPasswordChange()
  }
})
