// Extracts data from all required environment variables and exports it as `environment` object.
// Rest of the application will access this data only through exported `environment`, never directly
// through `process.env`.

const parseBoolean = (value, defaultValue) => {
  return value === undefined ? defaultValue : JSON.parse(value)
}

const parseNumber = (value, defaultValue) => {
  return value === undefined ? defaultValue : JSON.parse(value)
}

const apiUrl = process.env.API_URL
const version = process.env.VERSION
const commitHash = process.env.COMMIT_HASH
const branch = process.env.BRANCH
const development = parseBoolean(process.env.DEVELOPMENT, true)
const apiTokenRefreshPeriodMinutes = parseNumber(process.env.API_TOKEN_REFRESH_PERIOD_MINUTES, 5)

export const environment = {
  apiUrl,
  version,
  commitHash,
  branch,
  development,
  apiTokenRefreshPeriodMinutes
}

if (development) {
  console.log('ENVIRONMENT')
  console.log(JSON.stringify(environment, undefined, 4))
}
