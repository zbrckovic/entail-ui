import axiosLib from 'axios'
import { environment } from 'environment'
import { toaster } from 'toaster'
import { Intent } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { createError } from 'error'

export const ApiService = ({ t }) => {
  const result = ({
    async register (credentials) {
      return await axios.post('register', credentials)
    },
    async login (credentials) {
      return await axios.post('login', credentials)
    },
    async logout () {
      return await axios.post('logout')
    },
    async getApiToken () {
      return await axios.get('api-token')
    },
    async requestPasswordChange (email) {
      return await axios.post('request-password-change', { email })
    },
    async changePasswordWithToken ({ password, token }) {
      return await axios.post('change-password-with-token', { password, token })
    }
  })

  const axios = axiosLib.create({
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
