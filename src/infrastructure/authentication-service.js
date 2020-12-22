import { apiService } from './api-service'

export const authenticationService = ({
  register (email, password) {
    return apiService.register(email, password)
  },
  login (email, password) {
    return apiService.login(email, password)
  }
})
