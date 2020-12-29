export const AuthenticationService = ({ apiService }) => ({
  register (credentials) {
    return apiService.register(credentials)
  },
  login (credentials) {
    return apiService.login(credentials)
  },
  logout () {
    return apiService.logout()
  },
  getUserAndApiToken () {
    return apiService.getUserAndApiToken()
  },
  getApiToken () {
    return apiService.getApiToken()
  },
  requestPasswordChange (email) {
    return apiService.requestPasswordChange(email)
  },
  changePasswordWithToken ({ password, token }) {
    return apiService.changePasswordWithToken({ password, token })
  }
})
