import moment from 'moment'
import { environment } from 'environment'
import { authenticationService } from './authentication-service'

// Runs a clock internally and keeps refreshing api token according to the specified period.
// `onSuccess` will be called each time api token has been successfully refreshed.
// `onError` will be called the first time refresh fails. When error happens the clock
// will stop until service is started again.
export const ApiTokenRefreshService = (onSuccess, onError) => {
  const apiTokenRefreshPeriodMilliseconds = moment.duration(
    environment.apiTokenRefreshPeriodMinutes,
    'minutes'
  ).asMilliseconds()

  let intervalId

  const refreshApiToken = () => {
    authenticationService.refreshApiToken().then(
      () => { onSuccess() },
      () => {
        stop()
        onError()
      }
    )
  }

  // Starts periodically refreshing api token. First refresh is performed immediately.
  const start = () => {
    if (intervalId !== undefined) throw new Error('Service has already been started')
    refreshApiToken()
    setInterval(refreshApiToken, apiTokenRefreshPeriodMilliseconds)
  }

  const stop = () => {
    clearInterval(intervalId)
    intervalId = undefined
  }

  return { start, stop }
}
