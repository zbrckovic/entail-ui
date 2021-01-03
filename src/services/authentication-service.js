import { userMapper } from 'mappers'
import { map } from 'rxjs/operators'

export const AuthenticationService = ({ apiService }) => ({
  register (credentials) {
    return apiService
      .register(credentials)
      .pipe(map(userRaw => userMapper.fromApi(userRaw)))
  },
  login (credentials) {
    return apiService
      .login(credentials)
      .pipe(map(userRaw => userMapper.fromApi(userRaw)))
  },
  logout () {
    return apiService.logout()
  },
  getUserAndApiToken () {
    return apiService
      .getUserAndApiToken()
      .pipe(map(userRaw => userMapper.fromApi(userRaw)))
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
