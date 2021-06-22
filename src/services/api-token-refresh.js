import moment from 'moment'
import { environment } from 'environment'

// Sets up a timer to periodically refresh api token. Calls `onError` the first time refresh fails.
// When error happens the clock will be stopped stop. Returns a function which can be used to stop
// the timer.
export const startRefreshingToken = (authenticationService, onError) => {
  const refreshPeriodMilliseconds = moment.duration(
    environment.apiTokenRefreshPeriodMinutes,
    'minutes'
  ).asMilliseconds()

  let intervalId

  setInterval(() => {
    authenticationService.getApiToken().catch(() => {
      clearInterval(intervalId)
      onError()
    })
  }, refreshPeriodMilliseconds)

  return () => { clearInterval(intervalId) }
}
