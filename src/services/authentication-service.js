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
  async getUserAndApiToken () {
    return await apiService.getUserAndApiToken()
  },
  async getApiToken () {
    return await apiService.getApiToken()
  },
  async requestPasswordChange (email) {
    return await apiService.requestPasswordChange(email)
  },
  async changePasswordWithToken ({ password, token }) {
    return await apiService.changePasswordWithToken({ password, token })
  }
})
