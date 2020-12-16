export const SessionStorageService = () => {
  const storage = window.sessionStorage

  const getToken = () => storage.getItem('token')
  const setToken = token => { storage.setItem('token', token) }
  const clear = () => storage.clear()

  return { getToken, setToken, clear }
}
