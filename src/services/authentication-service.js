export const AuthenticationService = ({ apiService }) => {
  const login = (username, password) => apiService.login(username, password)

  return { login }
}
