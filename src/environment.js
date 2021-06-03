// Extracts data from all required environment variables and exports it as `environment` object.
// Rest of the application will access this data only through exported `environment`, never directly
// through `process.env`.

const parseBoolean = (value, defaultValue) => value === undefined ? defaultValue : JSON.parse(value)
const parseNumber = (value, defaultValue) => value === undefined ? defaultValue : JSON.parse(value)

const development = parseBoolean(process.env.DEVELOPMENT)
const apiUrl = process.env.API_URL
const apiDelay = parseInt(process.env.API_DELAY, 10)
const apiClientTimeoutMs = parseNumber(process.env.API_CLIENT_TIMEOUT_MS)
const locale = process.env.LOCALE
const version = process.env.VERSION
const commitHash = process.env.COMMIT_HASH
const branch = process.env.BRANCH
const apiTokenRefreshPeriodMinutes = parseNumber(process.env.API_TOKEN_REFRESH_PERIOD_MINUTES)

export const environment = {
  development,
  apiUrl,
  apiDelay,
  apiClientTimeoutMs,
  locale,
  version,
  commitHash,
  branch,
  apiTokenRefreshPeriodMinutes
}

if (development) {
  console.log('ENVIRONMENT')
  console.log(JSON.stringify(environment, undefined, 4))
}
