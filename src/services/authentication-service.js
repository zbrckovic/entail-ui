export const AuthenticationService = ({ apiService }) => ({
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
  async requestPasswordChange (email) {
    return await apiService.requestPasswordChange(email)
  }
})
