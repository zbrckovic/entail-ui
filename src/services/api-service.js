import Axios from 'axios-observable'
import { environment } from 'environment'
import { toaster } from 'toaster'
import { Intent } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { createError } from 'error'

export const ApiService = ({ t }) => {
  const result = ({
    register (credentials) {
      return axios.post('register', credentials)
    },
    login (credentials) {
      return axios.post('login', credentials)
    },
    logout () {
      return axios.post('logout')
    },
    getUserAndApiToken () {
      return axios.get('user-and-api-token')
    },
    getApiToken () {
      return axios.get('api-token')
    },
    requestPasswordChange (email) {
      return axios.post('request-password-change', { email })
    },
    changePasswordWithToken ({ password, token }) {
      return axios.post('change-password-with-token', { password, token })
    }
  })

  const axios = Axios.create({
    baseURL: environment.apiUrl,
    timeout: environment.apiClientTimeoutMs,
    crossDomain: true,
    withCredentials: true
  })

  axios.interceptors.response.use(
    response => response.data,
    async error => {
      if (!error.isAxiosError) throw error

      if (error.response === undefined) {
        toaster.show({
          message: t('apiService.connectionErrorMsg'),
          intent: Intent.DANGER,
          icon: IconNames.ERROR
        })
        throw error
      }

      if (error.response.status >= 500) {
        toaster.show({
          message: t('apiService.serverErrorMsg'),
          intent: Intent.DANGER,
          icon: IconNames.ERROR
        })
      }

      const { name, message, extra } = error.response.data

      throw createError(name, message, extra)
    }
  )

  return result
}
